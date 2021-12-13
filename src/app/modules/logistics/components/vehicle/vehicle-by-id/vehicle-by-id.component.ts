import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Vehicle} from "../../../interfaces/vehicle";
import {VehicleService} from "../../../services/vehicle.service";

@Component({
  selector: 'app-vehicle-by-id',
  templateUrl: './vehicle-by-id.component.html',
  styleUrls: ['./vehicle-by-id.component.scss']
})
export class VehicleByIdComponent implements OnChanges, OnDestroy {
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  //INPUTS AND OUTPUTS
  @Input() vehicleId: string | any;

  //RESULTS
  vehicle = {} as Vehicle;

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.vehicleId) {
      this.vehicleSvc.getVehicleById(this.vehicleId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.vehicle = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
