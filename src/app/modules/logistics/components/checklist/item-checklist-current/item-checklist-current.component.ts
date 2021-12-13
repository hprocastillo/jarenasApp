import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Checklist, Verification} from "../../../interfaces/checklist";
import {Subject, takeUntil} from "rxjs";
import {ChecklistService} from "../../../services/checklist.service";
import {Router} from "@angular/router";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-item-checklist-current',
  templateUrl: './item-checklist-current.component.html',
  styleUrls: ['./item-checklist-current.component.scss']
})
export class ItemChecklistCurrentComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() user = {} as User;
  @Input() checklist = {} as Checklist;
  @Input() employeeId: string | any;
  //RESULTS
  listVerification: Verification[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Verified if user verification checklist exists
    if (this.checklist.id && this.employeeId) {
      this.checklistSvc.getVerificationsByChecklistByEmployee(this.checklist.id, this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Verification[]) => {
          this.listVerification = res;
        }
      );
    }
  }

  getView(checklistId: any, user: User, employeeId: string) {
    this.router.navigate(['logistics/checklist/view', checklistId, user.uid, user.email, employeeId]).then();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
