import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Employee {
  id?: string | any;
  name: string;
  dni: string;
  email: string;
  photoUrl: string;
  phone?: string;
  address?: string;

  employeeTypeId: string; //from employeesTypes collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface EmployeeTypes {
  id?: string;
  description: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
