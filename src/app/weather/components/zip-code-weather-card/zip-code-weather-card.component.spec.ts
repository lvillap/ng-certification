import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodeWeatherCardComponent } from './zip-code-weather-card.component';

describe('ZipCodeWeatherCardComponent', () => {
  let component: ZipCodeWeatherCardComponent;
  let fixture: ComponentFixture<ZipCodeWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipCodeWeatherCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodeWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
