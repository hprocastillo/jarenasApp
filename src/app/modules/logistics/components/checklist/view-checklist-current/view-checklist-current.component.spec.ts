import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewChecklistCurrentComponent} from './view-checklist-current.component';

describe('ViewChecklistCurrentComponent', () => {
  let component: ViewChecklistCurrentComponent;
  let fixture: ComponentFixture<ViewChecklistCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewChecklistCurrentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChecklistCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
