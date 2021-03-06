import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Location} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {Trip} from "../../../../../core/interfaces/route";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RouteService} from "../../../../../core/services/route.service";

@Component({
  selector: 'app-view-trip',
  templateUrl: './view-trip.component.html',
  styleUrls: ['./view-trip.component.scss']
})
export class ViewTripComponent implements OnInit, OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  tripId: string | any;
  userId: string | any;
  userEmail: string | any;
  employeeId: string | any;
  //RESULTS
  trip = {} as Trip;
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    //GET FROM URL
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.tripId = params['id'];
        this.userId = params['userId'];
        this.userEmail = params['userEmail'];
        this.employeeId = params['employeeId'];
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    //GET TRIP
    if (this.tripId) {
      this.routeSvc.getTripById(this.tripId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.trip = res;
        }
      );
    }
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
