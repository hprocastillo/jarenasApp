import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Employee, EmployeeTypes} from "../interfaces/employee";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //COLLECTIONS
  employeesCollection: AngularFirestoreCollection<Employee>;
  employeesTypesCollection: AngularFirestoreCollection<EmployeeTypes>;

  constructor(private readonly afs: AngularFirestore) {
    this.employeesCollection = afs.collection<Employee>('employees', ref => ref
      .orderBy('createdAt', 'desc'));
    this.employeesTypesCollection = afs.collection<EmployeeTypes>('employeesTypes', ref => ref
      .orderBy('createdAt', 'desc'));
  }

  getEmployeeTypeById(id: string) {
    return this.afs.collection<EmployeeTypes>('employeesTypes').doc(id).valueChanges();
  }

  getEmployeeById(id: string) {
    return this.afs.collection<Employee>('employees').doc(id).valueChanges();
  }

  getEmployeeByEmail(email: string) {
    return this.afs.collection<Employee>('employees', ref => ref
      .where('email', '==', email))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Employee;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }
}
