import { animate, style, transition, trigger } from '@angular/animations';
import { DegreeModeService } from './../../Services/degree-mode.service';
import { Component, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherState } from 'src/app/Redux/WeatherReducer';
import { WeatherService } from 'src/app/Services/weather.service';
import { CurrentWeather } from 'src/app/Types/current-weather';
import { FiveDaysWeather } from 'src/app/Types/five-days-weather';



@Component({
  selector: 'app-data-weather',
  templateUrl: './data-weather.component.html',
  styleUrls: ['./data-weather.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(200px)' }),
        animate(2500)
      ]),
      transition(':leave', [
        animate(2500, style({ transform: 'translateX(-50px)' }))
      ])
    ])
  ]
})
export class DataWeatherComponent {

  constructor(private service: WeatherService, private store: Store<{ weatherData: WeatherState }>, private degereeModeService: DegreeModeService) { }
  isFavoriteCities!: Observable<any>;
  isFavorite: boolean = false;
  degreeMode$!: Observable<any>;
  keyCity: string = ""

  WeatherCurrent!: Observable<CurrentWeather>;
  days: FiveDaysWeather[] = [new FiveDaysWeather("", 0, 0)];
  cityName!: Observable<any>;
  city: string = "";





  getFiveDays(): void {
    this.service.getFiveWeather(this.keyCity).subscribe({
      next: (data: any) => {
        if (data && data.DailyForecasts && Array.isArray(data.DailyForecasts)) {
          this.days = data.DailyForecasts.map((item: any) => ({
            Date: item.Date,
            TemperaturMin: item.Temperature.Minimum.Value,
            TemperaturMax: item.Temperature.Maximum.Value
          }));
        } else {
          console.error("Error fetching five-day weather data:");
          alert('Error fetching five-day weather data');
        }
      },
    });
  }





  getCurrentData(): void {
    this.service.getDataCity(this.keyCity).subscribe((weatherData: any) => {
      this.store.dispatch({ type: 'GetDataWeather', payload: new CurrentWeather(this.city, weatherData[0]?.WeatherText, weatherData[0]?.Temperature.Metric, weatherData[0]?.Temperature.Imperial) })
    });

    this.WeatherCurrent = this.store.select(data => data.weatherData.WeatherData);
  }


  getCityData(): void {
    this.service.getKeyOfCity(this.city).subscribe((data: any) => {
      const firstItem = data[0];
      if (firstItem) {
        this.keyCity = firstItem.Key;

        this.getCurrentData();
        this.getFiveDays()
      } else {
        this.store.dispatch({ type: 'GetDataWeather', payload: new CurrentWeather(this.city, "No Data Availibale", {}, {}) })
        this.days = [];
        alert('Error fetching data');
      }
    });
  }



  initialData(): void {
    console.log("this is the DataWeather");
    this.WeatherCurrent = this.store.select(data => data.weatherData.WeatherData);
    this.degreeMode$ = this.degereeModeService.degreeMode$;
    this.cityName = this.store.select(data => data.weatherData.name)
    this.cityName.subscribe(data => {
      this.city = data;
      this.getCityData();
    })

  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city']) {
      this.getCityData();
    }
  }



  ngOnInit(): void {
    this.initialData();
  }


}