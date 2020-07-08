import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsPageComponent } from './rankings.page.component';

describe('RankingsPageComponent', () => {
  let component: RankingsPageComponent;
  let fixture: ComponentFixture<RankingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
