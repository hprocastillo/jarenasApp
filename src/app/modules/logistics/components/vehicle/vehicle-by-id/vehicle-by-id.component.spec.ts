import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleByIdComponent } from './vehicle-by-id.component';

describe('VehicleByIdComponent', () => {
  let component: VehicleByIdComponent;
  let fixture: ComponentFixture<VehicleByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
