import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Brand, Vehicle} from "../interfaces/vehicle";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  //COLLECTIONS
  vehiclesCollection: AngularFirestoreCollection<Vehicle>;
  brandsCollection: AngularFirestoreCollection<Brand>;

  constructor(private readonly afs: AngularFirestore) {
    this.vehiclesCollection = afs.collection<Vehicle>('vehicles', ref => ref
      .orderBy('createdAt', 'desc'));
    this.brandsCollection = afs.collection<Brand>('brands', ref => ref
      .orderBy('createdAt', 'desc'));
  }

  //VEHICLES SERVICE
  getVehicles() {
    return this.afs.collection<Vehicle>('vehicles', ref => ref
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getVehicleById(id: string) {
    return this.afs.collection<Vehicle>('vehicles').doc(id).valueChanges();
  }

  getVehiclesByEmployee(employeeId: string) {
    return this.afs.collection<Vehicle>('vehicles', ref => ref
      .where('employeeId', '==', employeeId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  deleteVehicle(vehicleId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.vehiclesCollection.doc(vehicleId).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  //BRANDS SERVICE
  getBrands(companyId: string) {
    return this.afs.collection<Brand>('brands', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Brand;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getBrandById(id: string) {
    return this.afs.collection<Brand>('brands').doc(id).valueChanges();
  }

  updateBrand(brand: Brand, brandId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = brandId;
        const data = {id, ...brand};
        const result = await this.brandsCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  deleteBrand(brandId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.brandsCollection.doc(brandId).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }
}
