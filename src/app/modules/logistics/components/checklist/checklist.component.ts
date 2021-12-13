import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Employee} from "../../interfaces/employee";
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, OnDestroy {
  //INPUTS AND OUTPUTS
  userId: string | any;
  userEmail: string | any;
  //INITIAL TAB
  active = 1;
  //RESULTS
  listEmployees: Employee[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    //GET FROM URL
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params['userId'];
        this.userEmail = params['userEmail'];
      }
    );
    //GET DATA EMPLOYEE
    if (this.userEmail) {
      this.employeeSvc.getEmployeeByEmail(this.userEmail).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Employee[]) => {
          this.listEmployees = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
