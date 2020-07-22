import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyinfoPageComponent } from './spyinfo.page.component';

describe('Spyinfo.PageComponent', () => {
  let component: SpyinfoPageComponent;
  let fixture: ComponentFixture<SpyinfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpyinfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpyinfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
