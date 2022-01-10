import {Component, Input} from '@angular/core';
import {Employee} from "../../../../../core/interfaces/employee";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-list-checklist-historical',
  templateUrl: './list-checklist-historical.component.html',
  styleUrls: ['./list-checklist-historical.component.scss']
})
export class ListChecklistHistoricalComponent {
  //INPUTS AND OUTPUTS
  @Input() employee = {} as Employee;
  @Input() user = {} as User;
}
