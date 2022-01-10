import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {VehicleService} from "../../../../../core/services/vehicle.service";
import {Subject, takeUntil} from "rxjs";
import {Brand} from "../../../../../core/interfaces/vehicle";

@Component({
  selector: 'app-brand-by-id',
  templateUrl: './brand-by-id.component.html',
  styleUrls: ['./brand-by-id.component.scss']
})
export class BrandByIdComponent implements OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  @Input() brandId: string | any;
  //RESULTS
  brand = {} as Brand;
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.brandId) {
      this.vehicleSvc.getBrandById(this.brandId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.brand = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
