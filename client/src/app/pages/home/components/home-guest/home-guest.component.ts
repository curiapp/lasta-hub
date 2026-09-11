import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_BOOTSTRAP } from '../../../../graphql/graphql.queries';
import { WorkflowDashboard } from '../../../../types/programme-workflow';

type HeroMetric = {
  label: string;
  value: string;
  icon: string;
  accent: 'blue' | 'gold' | 'green' | 'rose';
};

@Component({
  selector: 'home-guest',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.css'],
})
export class HomeGuestComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') private networkCanvas?: ElementRef<HTMLCanvasElement>;

  private readonly apollo = inject(Apollo);
  private renderer?: import('three').WebGLRenderer;
  private scene?: import('three').Scene;
  private camera?: import('three').PerspectiveCamera;
  private points?: import('three').Points;
  private lines?: import('three').LineSegments;
  private animationFrame?: number;
  private pointer = { x: 0, y: 0 };
  private readonly isBrowser: boolean;

  dashboard = signal<WorkflowDashboard>({
    programmeCount: 0,
    activeTaskCount: 0,
    completedTaskCount: 0,
    processCounts: {},
    stageCount: 0,
    taskDefinitionCount: 0,
  });

  tiltStyle = signal<Record<string, string>>({
    transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)',
  });

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.apollo.query<{ bootstrap: { dashboard: WorkflowDashboard } }>({
      query: GET_BOOTSTRAP,
      fetchPolicy: 'cache-first',
    }).subscribe({
      next: ({ data }) => {
        if (data?.bootstrap?.dashboard) this.dashboard.set(data.bootstrap.dashboard);
      },
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    void this.initNetwork();
  }

  ngOnDestroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.renderer?.dispose();
    this.points?.geometry.dispose();
    const pointMaterial = this.points?.material;
    if (Array.isArray(pointMaterial)) pointMaterial.forEach((material) => material.dispose());
    else pointMaterial?.dispose();
    this.lines?.geometry.dispose();
    const lineMaterial = this.lines?.material;
    if (Array.isArray(lineMaterial)) lineMaterial.forEach((material) => material.dispose());
    else lineMaterial?.dispose();
    window.removeEventListener('resize', this.resizeNetwork);
    window.removeEventListener('pointermove', this.trackPointer);
  }

  metrics(): HeroMetric[] {
    const dashboard = this.dashboard();
    return [
      {
        label: 'All Programmes',
        value: String(dashboard.programmeCount || 0),
        icon: 'school',
        accent: 'blue',
      },
      {
        label: 'Active Programmes',
        value: String(dashboard.processCounts?.['running'] || dashboard.activeTaskCount || 0),
        icon: 'pending_actions',
        accent: 'gold',
      },
      {
        label: 'Completed Tasks',
        value: String(dashboard.completedTaskCount || dashboard.processCounts?.['completed'] || 0),
        icon: 'task_alt',
        accent: 'green',
      },
      {
        label: 'Tracked Stages',
        value: String(dashboard.stageCount || 0),
        icon: 'timeline',
        accent: 'rose',
      },
    ];
  }

  updateTilt(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    this.tiltStyle.set({
      transform: `perspective(1100px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg) translateY(-4px)`,
    });
  }

  resetTilt() {
    this.tiltStyle.set({
      transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)',
    });
  }

  private async initNetwork() {
    const canvas = this.networkCanvas?.nativeElement;
    if (!canvas) return;
    const THREE = await import('three');

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    this.camera.position.z = 18;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const nodeCount = 90;
    const positions = new Float32Array(nodeCount * 3);
    const linePositions = new Float32Array((nodeCount - 1) * 6);

    for (let index = 0; index < nodeCount; index += 1) {
      const positionIndex = index * 3;
      positions[positionIndex] = (Math.random() - 0.5) * 34;
      positions[positionIndex + 1] = (Math.random() - 0.5) * 18;
      positions[positionIndex + 2] = (Math.random() - 0.5) * 10;

      if (index < nodeCount - 1) {
        const lineIndex = index * 6;
        linePositions[lineIndex] = positions[positionIndex];
        linePositions[lineIndex + 1] = positions[positionIndex + 1];
        linePositions[lineIndex + 2] = positions[positionIndex + 2];
        linePositions[lineIndex + 3] = positions[positionIndex + 3] ?? positions[0];
        linePositions[lineIndex + 4] = positions[positionIndex + 4] ?? positions[1];
        linePositions[lineIndex + 5] = positions[positionIndex + 5] ?? positions[2];
      }
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMaterial = new THREE.PointsMaterial({
      color: 0xfcaf17,
      size: 0.16,
      transparent: true,
      opacity: 1,
    });
    this.points = new THREE.Points(pointGeometry, pointMaterial);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xfcaf17,
      transparent: true,
      opacity: 0.34,
    });
    this.lines = new THREE.LineSegments(lineGeometry, lineMaterial);

    this.scene.add(this.points);
    this.scene.add(this.lines);
    window.addEventListener('resize', this.resizeNetwork);
    window.addEventListener('pointermove', this.trackPointer);
    this.resizeNetwork();
    this.animateNetwork();
  }

  private readonly resizeNetwork = () => {
    const canvas = this.networkCanvas?.nativeElement;
    if (!canvas || !this.renderer || !this.camera) return;
    const rect = canvas.getBoundingClientRect();
    this.camera.aspect = Math.max(rect.width, 1) / Math.max(rect.height, 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height, false);
  };

  private readonly trackPointer = (event: PointerEvent) => {
    this.pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    this.pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
  };

  private animateNetwork = () => {
    if (!this.renderer || !this.scene || !this.camera) return;
    const time = performance.now() * 0.00025;

    if (this.points && this.lines) {
      this.points.rotation.y = time + this.pointer.x * 0.16;
      this.points.rotation.x = this.pointer.y * 0.12;
      this.lines.rotation.copy(this.points.rotation);
    }

    this.renderer.render(this.scene, this.camera);
    this.animationFrame = requestAnimationFrame(this.animateNetwork);
  };
}
