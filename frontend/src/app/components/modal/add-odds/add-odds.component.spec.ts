import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOddsComponent } from './add-odds.component';

describe('AddOddsComponent', () => {
  let component: AddOddsComponent;
  let fixture: ComponentFixture<AddOddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOddsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
