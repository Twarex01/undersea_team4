import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRoundComponent } from './choose-round.component';

describe('ChooseRoundComponent', () => {
  let component: ChooseRoundComponent;
  let fixture: ComponentFixture<ChooseRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
