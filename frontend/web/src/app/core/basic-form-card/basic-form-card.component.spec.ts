import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFormCardComponent } from './basic-form-card.component';

describe('BasicFormComponent', () => {
  let component: BasicFormCardComponent;
  let fixture: ComponentFixture<BasicFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
