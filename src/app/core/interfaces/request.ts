import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Request {
  id?: string;
  message: string;
  active: boolean;
  status: string; //WAITING, ACCEPTED, REJECTED
  requestType: string; //JOIN: join to company,  ADD: add a friend

  //DATA USER REQUESTER
  userId: string | any;
  userName: string | any;
  userEmail: string | any;
  userPhotoUrl: string | any;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
