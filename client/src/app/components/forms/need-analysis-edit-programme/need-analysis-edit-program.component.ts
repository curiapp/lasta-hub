import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { ToastService } from '../../../services/toast.service';
import { Programme } from '../../../types';
import { NQFLevel } from '../../../static';
import { ModalControlService } from '../../../services/modal-control.service';

@Component({
  selector: 'need-analysis-edit-program',
  imports: [FormsModule],
  templateUrl: './need-analysis-edit-programme.component.html',
  styleUrl: './need-analysis-edit-programme.component.css'
})
export class NeedAnalysisEditProgramComponent {
  public _loading = inject(LoadingService);
  needAnalysisService = inject(StartNeedAnalysisService);
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);
  levels = NQFLevel;
  @Input() programme: Programme;

  updateProgramme(form: NgForm) {
    if (form.valid) {
      this.needAnalysisService.updateNeedAnalysis({ ...form.value, id: this.programme.id }).subscribe({
        next: (response: any) => {
          this.toast.success(response?.message);
          this.modalControl.close();
        },
        error: (error) => {
          this.toast.error("Error updating programme: " + error?.message);
          this.modalControl.close();
        }
      }
      );

    }
  }
}
