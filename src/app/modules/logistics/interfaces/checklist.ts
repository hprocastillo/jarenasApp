import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Checklist {
  id?: string;
  description: string;
  active: boolean;
  publish: boolean;
  publishAt: Timestamp;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Verification {
  id?: string;
  active: boolean;
  finished: boolean;
  photoUrl: string;
  observations: string;

  employeeId: string; // from employee collection
  checklistId: string; //from checklist collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Category {
  id?: string;
  name: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Question {
  id?: string;
  description: string;

  checklistId: string; //from checklist collection
  categoryId: string; //from categories collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Answer {
  id?: string;
  value: string;
  active: boolean;
  observations: string;

  employeeId: string; //from employees collection
  checklistId: string; //from checklist collection
  categoryId: string; //from categories collection
  questionId: string; //from questions collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
