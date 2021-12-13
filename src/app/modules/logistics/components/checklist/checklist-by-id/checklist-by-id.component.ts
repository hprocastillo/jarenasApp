import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ChecklistService} from "../../../services/checklist.service";
import {Checklist} from "../../../interfaces/checklist";

@Component({
  selector: 'app-checklist-by-id',
  templateUrl: './checklist-by-id.component.html',
  styleUrls: ['./checklist-by-id.component.scss']
})
export class ChecklistByIdComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() checklistId: string | any;

  //RESULTS
  checklist = {} as Checklist;

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checklistId) {
      this.checklistSvc.getChecklistById(this.checklistId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.checklist = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
