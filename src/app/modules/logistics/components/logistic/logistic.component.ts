import {Component} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-logistic',
  templateUrl: './logistic.component.html',
  styleUrls: ['./logistic.component.scss']
})
export class LogisticComponent {
  constructor(public authSvc: AuthService) {
  }
}
