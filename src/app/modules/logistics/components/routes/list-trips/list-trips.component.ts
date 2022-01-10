import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Location} from "@angular/common";
import {Employee} from "../../../../../core/interfaces/employee";
import firebase from "firebase";
import {Subject, takeUntil} from "rxjs";
import {Trip} from "../../../../../core/interfaces/route";
import {RouteService} from "../../../../../core/services/route.service";
import {Router} from "@angular/router";
import User = firebase.User;

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss']
})
export class ListTripsComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() employee = {} as Employee;
  @Input() user = {} as User;
  //RESULTS
  listTrips: Trip[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private location: Location,
    private routesSvc: RouteService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    //GET LIST TRIPS BY EMPLOYEE
    if (this.employee) {
      this.routesSvc.getTripsByEmployeeId(this.employee.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Trip[]) => {
          this.listTrips = res;
        }
      );
    }
  }

  getBack(event: any) {
    if (event === true) {
      this.location.back();
    }
  }

  getNew(event: any, user: User, employee: Employee) {
    if (event === true) {
      this.router.navigate(['logistics/trip/new', user.uid, user.email, employee.id]).then();
    }
  }

  getEdit(tripId: any, user: User, employee: Employee) {
    this.router.navigate(['logistics/trip/edit', tripId, user.uid, user.email, employee.id]).then();
  }

  getView(tripId: any, user: User, employee: Employee) {
    this.router.navigate(['logistics/trip/view', tripId, user.uid, user.email, employee.id]).then();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
