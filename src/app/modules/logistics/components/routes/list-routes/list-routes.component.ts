import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Employee} from "../../../../../core/interfaces/employee";
import firebase from "firebase";
import {Location} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {RouteService} from "../../../../../core/services/route.service";
import {Route} from "../../../../../core/interfaces/route";
import User = firebase.User;


@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.scss']
})
export class ListRoutesComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() employee = {} as Employee;
  @Input() user = {} as User;
  //RESULTS
  listRoutes: Route[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private location: Location,
    private routesSvc: RouteService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employee) {
      this.routesSvc.getRoutes().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Route[]) => {
          this.listRoutes = res;
        }
      );
    }
  }

  getBack(event: any) {
    if (event === true) {
      this.location.back();
    }
  }

  getPrint(event: any) {
    if (event === true) {
      window.print();
    }
  }

  getView(routeId: any, user: User, employee: Employee) {
    this.router.navigate(['logistics/route/view', routeId, user.uid, user.email, employee.id]).then();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
