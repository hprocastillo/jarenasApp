import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistByIdComponent } from './checklist-by-id.component';

describe('ChecklistByIdComponent', () => {
  let component: ChecklistByIdComponent;
  let fixture: ComponentFixture<ChecklistByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
