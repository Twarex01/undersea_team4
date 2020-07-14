import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitCardItemComponent } from './unit-card-item.component';

describe('UnitCardItemComponent', () => {
  let component: UnitCardItemComponent;
  let fixture: ComponentFixture<UnitCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
