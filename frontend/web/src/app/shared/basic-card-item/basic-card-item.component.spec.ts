import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCardItemComponent } from './basic-card-item.component';

describe('BasicCardItemComponent', () => {
  let component: BasicCardItemComponent;
  let fixture: ComponentFixture<BasicCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
