import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Answer} from "../../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../../core/services/checklist.service";

@Component({
  selector: 'app-export-answer',
  templateUrl: './export-answer.component.html',
  styleUrls: ['./export-answer.component.scss']
})
export class ExportAnswerComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() employeeId: string | any;
  @Input() categoryId: string | any;
  @Input() checklistId: string | any;
  @Input() questionId: string | any;
  @Input() column: string | any;
  //RESULTS
  answer: Answer[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.questionId) {
      this.checklistSvc.getAnswers(this.checklistId, this.categoryId, this.questionId, this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Answer[]) => {
          this.answer = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
