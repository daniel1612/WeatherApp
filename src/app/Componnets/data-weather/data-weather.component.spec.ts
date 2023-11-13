import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWeatherComponent } from './data-weather.component';

describe('DataWeatherComponent', () => {
  let component: DataWeatherComponent;
  let fixture: ComponentFixture<DataWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataWeatherComponent]
    });
    fixture = TestBed.createComponent(DataWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
