import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensesComponent } from './defenses.component';

describe('DefensesComponent', () => {
  let component: DefensesComponent;
  let fixture: ComponentFixture<DefensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
