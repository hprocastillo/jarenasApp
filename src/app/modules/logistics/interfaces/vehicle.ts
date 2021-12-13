import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Vehicle {
  id?: string;
  description: string;
  badge: string;
  birthDay: string;
  photoUrl?: string;

  brandId: string; //from brands collection
  employeeId: string; //from employee collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Brand {
  id?: string;
  brand: string;
  photoUrl?: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
