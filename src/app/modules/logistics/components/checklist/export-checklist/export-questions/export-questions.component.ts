import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Question} from "../../../../interfaces/checklist";
import {AuthService} from "../../../../../auth/services/auth.service";
import {ChecklistService} from "../../../../services/checklist.service";

@Component({
  selector: 'app-export-questions',
  templateUrl: './export-questions.component.html',
  styleUrls: ['./export-questions.component.scss']
})
export class ExportQuestionsComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() employeeId: string | any;
  @Input() checklistId: string | any;
  @Input() categoryId: string | any;
  //RESULTS
  listQuestions: Question[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    public authSvc: AuthService,
    private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.categoryId) {
      this.checklistSvc.getQuestionsByCategory(this.checklistId, this.categoryId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Question[]) => {
          this.listQuestions = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
