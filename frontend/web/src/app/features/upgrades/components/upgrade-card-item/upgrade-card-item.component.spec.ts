import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeCardItemComponent } from './upgrade-card-item.component';

describe('UpgradeCardItemComponent', () => {
  let component: UpgradeCardItemComponent;
  let fixture: ComponentFixture<UpgradeCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
