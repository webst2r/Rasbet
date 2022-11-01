import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComponent } from './raise.component';

describe('RaiseComponent', () => {
  let component: RaiseComponent;
  let fixture: ComponentFixture<RaiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
