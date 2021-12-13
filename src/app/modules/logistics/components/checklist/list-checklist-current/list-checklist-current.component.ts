import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Employee} from "../../../interfaces/employee";
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {Checklist} from "../../../interfaces/checklist";
import {ChecklistService} from "../../../services/checklist.service";
import {Location} from "@angular/common";
import User = firebase.User;

@Component({
  selector: 'app-list-checklist-current',
  templateUrl: './list-checklist-current.component.html',
  styleUrls: ['./list-checklist-current.component.scss']
})
export class ListChecklistCurrentComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() employee = {} as Employee;
  @Input() user = {} as User;
  //RESULTS
  listChecklist: Checklist[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private checklistSvc: ChecklistService,
    private location: Location) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checklistSvc.getChecklistsActiveAndPublish().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Checklist[]) => {
        this.listChecklist = res;
      }
    );
  }

  getBack(event: any) {
    if (event === true) {
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
