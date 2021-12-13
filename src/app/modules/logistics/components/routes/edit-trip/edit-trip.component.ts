import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {Route, Trip} from "../../../interfaces/route";
import {RouteService} from "../../../services/route.service";
import {Vehicle} from "../../../interfaces/vehicle";
import {Checklist} from "../../../interfaces/checklist";
import {ChecklistService} from "../../../services/checklist.service";
import {VehicleService} from "../../../services/vehicle.service";

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  tripId: string | any;
  userId: string | any;
  userEmail: string | any;
  employeeId: string | any;

  //VARIABLES
  today = new Date();

  //RESULTS
  trip = {} as Trip;
  listRoutes: Route[] = [];
  listVehicles: Vehicle[] = [];
  listChecklist: Checklist[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeSvc: RouteService,
    private checklistSvc: ChecklistService,
    private vehicleSvc: VehicleService) {
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
    //GET LIST ROUTES
    this.routeSvc.getRoutes().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Route[]) => {
        this.listRoutes = res;
      }
    );
    //GET LIST CHECKLIST
    this.checklistSvc.getChecklistsActiveAndPublish().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Checklist[]) => {
        this.listChecklist = res;
      }
    );
    //GET LIST VEHICLES
    if (this.employeeId) {
      this.vehicleSvc.getVehiclesByEmployee(this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Vehicle[]) => {
          this.listVehicles = res;
        }
      );
    }
  }

  getInitialDate(event: any) {
    let year: string;
    let month: string;
    let day: string;
    if (event.month < 10) {
      month = '0' + event.month.toString();
    } else {
      month = event.month.toString();
    }
    if (event.day < 10) {
      day = '0' + event.day.toString();
    } else {
      day = event.day.toString();
    }
    year = event.year.toString();
    // @ts-ignore
    this.trip.startDate = new Date(year + '-' + month + '-' + day + 'T00:00:00');
  }

  getFinalDate(event: any) {
    let year: string;
    let month: string;
    let day: string;
    if (event.month < 10) {
      month = '0' + event.month.toString();
    } else {
      month = event.month.toString();
    }
    if (event.day < 10) {
      day = '0' + event.day.toString();
    } else {
      day = event.day.toString();
    }
    year = event.year.toString();
    // @ts-ignore
    this.trip.endDate = new Date(year + '-' + month + '-' + day + 'T00:00:00');
  }

  getEdit(userId: string, userEmail: string) {
    this.trip.traveledMileage = this.trip.finalMileage - this.trip.initialMileage;
    this.trip.updatedBy = userId;
    // @ts-ignore
    this.trip.updatedAt = this.today;
    this.routeSvc.updateTrip(this.trip, this.tripId).then();
    this.router.navigate(['logistics/routes', userId, userEmail]).then();
  }

  //TOOLBAR BUTTONS
  getBtnSave(event: any, userId: string, userEmail: string) {
    if (event === true) {
      this.getEdit(userId, userEmail);
    }
  }

  getCancel(event: any, userId: string, userEmail: string) {
    if (event === true) {
      this.router.navigate(['logistics/routes', userId, userEmail]).then();
    }
  }

  getFinish(event: any, userId: string, userEmail: string) {
    if (event === true) {
      if(confirm("Desea finalizar la ruta?, Si acepta no podra realizar cambios.")){
        this.trip.updatedBy = userId;
        // @ts-ignore
        this.trip.updatedAt = this.today;
        this.trip.status = false;
        this.routeSvc.updateTrip(this.trip, this.tripId).then();
        this.router.navigate(['logistics/routes', userId, userEmail]).then();
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
