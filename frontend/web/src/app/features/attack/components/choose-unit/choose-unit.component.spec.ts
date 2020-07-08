import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUnitComponent } from './choose-unit.component';

describe('ChooseUnitComponent', () => {
  let component: ChooseUnitComponent;
  let fixture: ComponentFixture<ChooseUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
