import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingCardItemComponent } from './building-card-item.component';

describe('BuildingCardItemComponent', () => {
  let component: BuildingCardItemComponent;
  let fixture: ComponentFixture<BuildingCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
