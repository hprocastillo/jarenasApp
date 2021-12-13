import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListChecklistCurrentComponent} from './list-checklist-current.component';

describe('ListChecklistCurrentComponent', () => {
  let component: ListChecklistCurrentComponent;
  let fixture: ComponentFixture<ListChecklistCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListChecklistCurrentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChecklistCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
