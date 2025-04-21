import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { ToastService } from '../../../services/toast.service';
import { Programme } from '../../../types';
import { NQFLevel } from '../../../static';

@Component({
  selector: 'need-analysis-edit-program',
  imports: [FormsModule],
  templateUrl: './need-analysis-edit-programme.component.html',
  styleUrl: './need-analysis-edit-programme.component.scss'
})
export class NeedAnalysisEditProgramComponent {
  public _loading = inject(LoadingService);
  needAnalysisService = inject(StartNeedAnalysisService);
  toastService = inject(ToastService);
  levels = NQFLevel;
  @Input() programme: Programme;

  changed(event) {
    this.programme.level = event;
  }
  updateProgramme(form: NgForm) {
    console.log("Form ", form.value);

    if (form.valid) {
      this.needAnalysisService.updateNeedAnalysis(form.value).subscribe({
        next: (response) => {
          this.toastService.success("Programme updated successfully!");
        },
        error: (error) => {
          this.toastService.error("Error updating programme: " + error?.message);
        }
      }
      );

    }
  }
}
