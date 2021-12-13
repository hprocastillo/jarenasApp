import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExportAnswerComponent} from './export-answer.component';

describe('ExportAnswerComponent', () => {
  let component: ExportAnswerComponent;
  let fixture: ComponentFixture<ExportAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportAnswerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
