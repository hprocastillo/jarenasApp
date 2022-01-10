import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import {Checklist} from "../../../../../core/interfaces/checklist";

@Component({
  selector: 'app-checklist-by-id',
  templateUrl: './checklist-by-id.component.html',
  styleUrls: ['./checklist-by-id.component.scss']
})
export class ChecklistByIdComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() checklistId: string | any;
  //RESULTS
  checklist = {} as Checklist;
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

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
