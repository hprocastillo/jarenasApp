import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemChecklistCurrentComponent} from './item-checklist-current.component';

describe('ItemChecklistCurrentComponent', () => {
  let component: ItemChecklistCurrentComponent;
  let fixture: ComponentFixture<ItemChecklistCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemChecklistCurrentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChecklistCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
