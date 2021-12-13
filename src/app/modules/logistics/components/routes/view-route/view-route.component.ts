import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Route} from "../../../interfaces/route";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RouteService} from "../../../services/route.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.scss']
})
export class ViewRouteComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  routeId: string | any;
  userId: string | any;
  userEmail: string | any;
  employeeId: string | any;

  //RESULTS
  route = {} as Route;

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
        this.routeId = params['id'];
        this.userId = params['userId'];
        this.userEmail = params['userEmail'];
        this.employeeId = params['employeeId'];

        //GET ROUTE BY ID
        if (this.routeId) {
          this.routeSvc.getRouteById(this.routeId).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (res: any) => {
              this.route = res;
            }
          );
        }
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
