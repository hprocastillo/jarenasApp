import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RouteByIdComponent} from './route-by-id.component';

describe('RouteByIdComponent', () => {
  let component: RouteByIdComponent;
  let fixture: ComponentFixture<RouteByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteByIdComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
