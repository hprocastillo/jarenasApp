import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import firebase from "firebase";
import {EmployeeService} from "../../core/services/employee.service";
import {Subject, takeUntil} from "rxjs";
import {Employee} from "../../core/interfaces/employee";
import {RequestService} from "../../core/services/request.service";
import {Request} from "../../core/interfaces/request";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalJoinRequestComponent} from "../request/modal-join-request/modal-join-request.component";
import User = firebase.User;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() user = {} as User;

  //VARIABLES
  isEmployee: boolean = false;
  isActive: boolean = false;
  isExistRequest: boolean = false;
  today = new Date();

  constructor(
    private modalService: NgbModal,
    public authSvc: AuthService,
    private requestSvc: RequestService,
    private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    if (this.user.email) {
      //GET EMPLOYEE REGISTERED
      this.employeeSvc.getEmployeeByEmail(this.user.email).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Employee[]) => {
          if (res.length > 0) {
            this.isEmployee = true;
            if (res[0].status) {
              this.isActive = true;
            }
          }
        }
      );
      //GET REQUEST EXIST AND WAITING
      this.requestSvc.getRequestsByEmail(this.user.email).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Request[]) => {
          if (res.length > 0) {
            this.isExistRequest = true;
          }
        }
      );
    }
  }

  getModalRequest(user: User) {
    const modalRef = this.modalService.open(ModalJoinRequestComponent, {centered: true});
    modalRef.componentInstance.userId = user.uid;
    modalRef.componentInstance.userName = user.displayName;
    modalRef.componentInstance.userEmail = user.email;
    modalRef.componentInstance.userPhotoUrl = user.photoURL;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
