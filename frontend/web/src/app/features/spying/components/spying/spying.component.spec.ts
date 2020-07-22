import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyingComponent } from './spying.component';

describe('SpyingComponent', () => {
  let component: SpyingComponent;
  let fixture: ComponentFixture<SpyingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpyingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
