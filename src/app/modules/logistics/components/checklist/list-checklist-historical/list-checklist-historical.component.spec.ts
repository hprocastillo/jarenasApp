import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListChecklistHistoricalComponent} from './list-checklist-historical.component';

describe('ListChecklistHistoricalComponent', () => {
  let component: ListChecklistHistoricalComponent;
  let fixture: ComponentFixture<ListChecklistHistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListChecklistHistoricalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChecklistHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
