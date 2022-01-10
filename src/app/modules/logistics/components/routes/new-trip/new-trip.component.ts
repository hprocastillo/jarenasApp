import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Route, Trip} from "../../../../../core/interfaces/route";
import {Vehicle} from "../../../../../core/interfaces/vehicle";
import {Checklist} from "../../../../../core/interfaces/checklist";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RouteService} from "../../../../../core/services/route.service";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import {VehicleService} from "../../../../../core/services/vehicle.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit, OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  userId: string | any;
  userEmail: string | any;
  employeeId: string | any;
  //VARIABLES
  today = new Date();
  startDate = new Date();
  endDate = new Date();
  newForm: FormGroup;
  //RESULTS
  listRoutes: Route[] = [];
  listVehicles: Vehicle[] = [];
  listChecklist: Checklist[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeSvc: RouteService,
    private checklistSvc: ChecklistService,
    private vehicleSvc: VehicleService) {

    this.newForm = this.fb.group({
      checklistId: ['', [Validators.required]],
      routeId: ['', [Validators.required]],
      vehicleId: ['', [Validators.required]],
      timeOnRoute: [''],
      initialMileage: [''],
      finalMileage: [''],
      observations: [''],
    });
  }

  ngOnInit(): void {
    //GET FROM URL
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params['userId'];
        this.userEmail = params['userEmail'];
        this.employeeId = params['employeeId'];
      }
    );
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
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    this.startDate = new Date(year + '-' + month + '-' + day + 'T00:00:00');
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
    this.endDate = new Date(year + '-' + month + '-' + day + 'T00:00:00');
  }

  getSave(userId: string, userEmail: string, employeeId: string) {
    if (this.newForm.valid) {
      const trip = this.newForm.value;
      const tripId = trip?.id || null;
      trip.startDate = this.startDate;
      trip.endDate = this.endDate;
      trip.status = true;
      trip.traveledMileage = trip.finalMileage - trip.initialMileage;
      trip.employeeId = employeeId;
      trip.createdBy = userId;
      trip.createdAt = this.today;

      this.routeSvc.getTripsByChecklistByEmployeeIdByStatus(trip.checklistId, trip.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Trip[]) => {
          if (res.length > 0) {
            alert("Ya cuenta con un viaje activo.");
          } else {
            this.routeSvc.saveTrip(trip, tripId).then();
            this.newForm.reset();
            this.router.navigate(['logistics/routes', userId, userEmail]).then();
          }
        }
      );


    }
  }

  //TOOLBAR BUTTONS
  getBtnSave(event: any, userId: string, userEmail: string, employeeId: string) {
    if (event === true) {
      this.getSave(userId, userEmail, employeeId);
    }
  }

  getCancel(event: any, userId: string, userEmail: string) {
    if (event === true) {
      this.router.navigate(['logistics/routes', userId, userEmail]).then();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
