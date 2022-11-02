import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostasMultiplasComponent } from './apostas-multiplas.component';

describe('ApostasMultiplasComponent', () => {
  let component: ApostasMultiplasComponent;
  let fixture: ComponentFixture<ApostasMultiplasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApostasMultiplasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApostasMultiplasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
