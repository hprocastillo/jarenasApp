import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJoinRequestComponent } from './modal-join-request.component';

describe('ModalJoinRequestComponent', () => {
  let component: ModalJoinRequestComponent;
  let fixture: ComponentFixture<ModalJoinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalJoinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJoinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
