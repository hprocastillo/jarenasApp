import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../../interfaces/employee";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-list-checklist-historical',
  templateUrl: './list-checklist-historical.component.html',
  styleUrls: ['./list-checklist-historical.component.scss']
})
export class ListChecklistHistoricalComponent implements OnInit {
  @Input() employee = {} as Employee;
  @Input() user = {} as User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
