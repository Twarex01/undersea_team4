import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradesPageComponent } from './upgrades.page.component';

describe('UpgradesPageComponent', () => {
  let component: UpgradesPageComponent;
  let fixture: ComponentFixture<UpgradesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
