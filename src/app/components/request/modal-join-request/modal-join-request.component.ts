import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Request} from "../../../core/interfaces/request";
import {RequestService} from "../../../core/services/request.service";

@Component({
  selector: 'app-modal-join-request',
  templateUrl: './modal-join-request.component.html',
  styleUrls: ['./modal-join-request.component.scss']
})
export class ModalJoinRequestComponent implements OnInit {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS
  @Input() userId: string | any;
  @Input() userName: string | any;
  @Input() userEmail: string | any;
  @Input() userPhotoUrl: string | any;

  //VARIABLES
  today = new Date();

  constructor(public activeModal: NgbActiveModal, private requestSvc: RequestService) {
  }

  ngOnInit(): void {
  }

  saveRequest(userId: string, userName: string, userEmail: string, userPhotoUrl: string) {
    const request = {} as Request;
    const requestId = request?.id || null;
    request.message = "Por favor, registrarme como empleado.";
    request.active = true;
    request.status = "WAITING";
    request.requestType = "JOIN";

    request.userId = userId;
    request.userName = userName;
    request.userEmail = userEmail;
    request.userPhotoUrl = userPhotoUrl;

    request.createdBy = userId;
    // @ts-ignore
    request.createdAt = this.today;
    this.requestSvc.saveRequest(request, requestId).then();
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
