import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSpecialistComponent } from './games-specialist.component';

describe('GamesSpecialistComponent', () => {
  let component: GamesSpecialistComponent;
  let fixture: ComponentFixture<GamesSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesSpecialistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
