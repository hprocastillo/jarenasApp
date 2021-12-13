import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BrandByIdComponent} from './brand-by-id.component';

describe('BrandByIdComponent', () => {
  let component: BrandByIdComponent;
  let fixture: ComponentFixture<BrandByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandByIdComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
