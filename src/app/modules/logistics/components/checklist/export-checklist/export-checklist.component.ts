import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChecklistService} from "../../../services/checklist.service";
import {Category, Checklist, Question, Verification} from "../../../interfaces/checklist";
import {EmployeeService} from "../../../services/employee.service";
import {Employee, EmployeeTypes} from "../../../interfaces/employee";
import {Vehicle} from "../../../interfaces/vehicle";
import {VehicleService} from "../../../services/vehicle.service";
import {Trip} from "../../../interfaces/route";
import {RouteService} from "../../../services/route.service";

@Component({
  selector: 'app-export-checklist',
  templateUrl: './export-checklist.component.html',
  styleUrls: ['./export-checklist.component.scss']
})
export class ExportChecklistComponent implements OnInit {
  //INPUTS AND OUTPUTS
  userId: string | any;
  employeeId: string | any;
  verificationId: string | any;
  checklistId: string | any;
  //RESULTS
  checklist = {} as Checklist;
  employee = {} as Employee;
  employeeType = {} as EmployeeTypes;
  listTrip: Trip[] = [];
  listVerification: Verification[] = [];
  listVehicles: Vehicle[] = [];
  listCategories: Category[] = [];
  listQuestions: Question[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeSvc: RouteService,
    private checklistSvc: ChecklistService,
    private employeeSvc: EmployeeService,
    private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    //GET FROM URL
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params['userId'];
        this.employeeId = params['employeeId'];
        this.verificationId = params['verificationId'];
        this.checklistId = params['checklistId'];
      }
    );
    //GET EMPLOYEE DATA
    if (this.employeeId) {
      this.employeeSvc.getEmployeeById(this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employee = res;

          if (this.employee.employeeTypeId) {
            this.employeeSvc.getEmployeeTypeById(this.employee.employeeTypeId).pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe(
              (res: any) => {
                this.employeeType = res;
              }
            );
          }

        }
      );
      //GET VEHICLE BY EMPLOYEE
      this.vehicleSvc.getVehiclesByEmployee(this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Vehicle[]) => {
          this.listVehicles = res;
        }
      );
      //GET VERIFICATION LIST
      this.checklistSvc.getVerificationsByChecklistByEmployee(this.checklistId, this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Verification[]) => {
          this.listVerification = res;
        }
      );
      //GET TRIP LIST
      this.routeSvc.getTripsByChecklistByEmployeeIdByStatus(this.checklistId, this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Trip[]) => {
          this.listTrip = res;
          console.log(this.listTrip)
        }
      );
    }
    //GET CATEGORIES LIST
    this.checklistSvc.getCategories().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Category[]) => {
        this.listCategories = res;
      }
    );
  }

  getBack(event: any) {
    if (event === true) {
      this.location.back();
    }
  }

  getExportPDF(event: any): void {
    if (event === true) {
      let DATA = document.getElementById('toExportPDF');
      if (DATA) {
        html2canvas(DATA).then(canvas => {
          let fileWidth = 208;
          let fileHeight = canvas.height * fileWidth / canvas.width;
          const FILEURI = canvas.toDataURL('image/png')
          let PDF = new jspdf('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
          PDF.save('lista-checklist.pdf');
        });
      }
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
