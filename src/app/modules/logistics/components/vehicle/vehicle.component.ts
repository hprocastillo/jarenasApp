import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {Subject, takeUntil} from "rxjs";
import {Employee} from "../../interfaces/employee";
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../../interfaces/vehicle";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  userId: string | any;
  userEmail: string | any;

  //RESULTS
  listVehicles: Vehicle[] = [];

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private vehicleSvc: VehicleService,
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
          if (res.length) {

            //GET LIST VEHICLES
            this.vehicleSvc.getVehiclesByEmployee(res[0].id).pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe(
              (res: Vehicle[]) => {
                this.listVehicles = res;
              }
            );
          }
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
