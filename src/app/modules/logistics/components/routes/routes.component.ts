import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {Employee} from "../../../../core/interfaces/employee";
import {EmployeeService} from "../../../../core/services/employee.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnChanges, OnDestroy {
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
  }

  ngOnChanges(changes: SimpleChanges): void {
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
