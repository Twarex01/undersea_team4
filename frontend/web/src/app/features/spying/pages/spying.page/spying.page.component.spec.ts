import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyingPageComponent } from './spying.page.component';

describe('SpyingPageComponent', () => {
  let component: SpyingPageComponent;
  let fixture: ComponentFixture<SpyingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpyingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpyingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
