import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { User } from '../../../types';
import { AuthenticationService } from '../../../services/authentication.service';
import { WorkflowDefinitionService } from '../../../services/workflow-definition.service';

@Component({
  selector: 'profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  auth = inject(AuthenticationService);
  private readonly workflowDefinitionService = inject(WorkflowDefinitionService);
  roleLabel = signal('Institution staff');

  ngOnInit() {
    this.roleLabel.set(this.fallbackRoleLabel(this.user?.role));
    this.workflowDefinitionService.get().subscribe({
      next: (definition) => {
        const roleId = String(this.user?.role ?? '').trim().toLowerCase();
        const mappedRole = definition.roles?.find((role) => role.id.trim().toLowerCase() === roleId);
        if (mappedRole?.name) this.roleLabel.set(mappedRole.name);
      },
    });
  }

  private fallbackRoleLabel(role?: string) {
    const labels: Record<string, string> = {
      admin: 'System Administrator',
      pdqa: 'PDQA Administrator',
      lecturer: 'Academic Staff',
      initiator: 'Programme Coordinator',
      cdc: 'Curriculum Development Coordinator',
      pac: 'Programme Advisory Committee / PEC',
      bos: 'Board of Studies',
      apc: 'Academic Planning Committee',
      senate: 'Senate',
      hod: 'Head of Department',
      adstlt: 'Teaching and Learning',
      ceu: 'Cooperative Education',
      nqa: 'NQA Liaison',
    };
    return labels[String(role ?? '').trim().toLowerCase()] ?? 'Institution staff';
  }
}
