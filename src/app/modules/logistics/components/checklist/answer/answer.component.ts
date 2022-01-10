import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {Answer} from "../../../../../core/interfaces/checklist";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import User = firebase.User;

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() employeeId: string | any;
  @Input() categoryId: string | any;
  @Input() checklistId: string | any;
  @Input() questionId: string | any;
  //RESULTS
  exist: string = '';
  answer: Answer[] = [];
  //VARIABLES
  today = new Date();
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.questionId) {
      this.checklistSvc.getAnswers(this.checklistId, this.categoryId, this.questionId, this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Answer[]) => {
          if (res.length === 0) {
            this.exist = 'NO';
          } else {
            this.exist = 'YES';
            this.answer = res;
          }
        }
      );
    }
  }

  getSave(event: any, user: User) {
    const answer = {} as Answer;
    const answerId = answer?.id || null;
    answer.value = event.value;
    answer.active = true;
    answer.employeeId = this.employeeId;
    answer.checklistId = this.checklistId;
    answer.categoryId = this.categoryId;
    answer.questionId = this.questionId;
    answer.createdBy = user.uid;
    // @ts-ignore
    answer.createdAt = this.today;
    this.checklistSvc.saveAnswer(answer, answerId).then();
  }

  getEdit(event: any, user: User, answer: Answer) {
    answer.value = event.value;
    answer.updatedBy = user.uid;
    // @ts-ignore
    answer.updatedAt = this.today;
    this.checklistSvc.updateAnswer(answer, answer.id).then();
  }

  getEditObservations(event: any, user: User, answer: Answer) {
    if (event.value) {
      answer.observations = event.value;
      answer.updatedBy = user.uid;
      // @ts-ignore
      answer.updatedAt = this.today;
      this.checklistSvc.updateAnswer(answer, answer.id).then();
    } else {
      answer.observations = '';
      answer.updatedBy = user.uid;
      // @ts-ignore
      answer.updatedAt = this.today;
      this.checklistSvc.updateAnswer(answer, answer.id).then();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
