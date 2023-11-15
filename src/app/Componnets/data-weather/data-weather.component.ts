import { Component, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { FavoriteState } from 'src/app/Redux/FavoriteReducer';
import { WeatherService } from 'src/app/Services/weather.service';
import { CurrentWeather } from 'src/app/Types/current-weather';



@Component({
  selector: 'app-data-weather',
  templateUrl: './data-weather.component.html',
  styleUrls: ['./data-weather.component.css']
})
export class DataWeatherComponent {

  constructor(private service: WeatherService, private store: Store<FavoriteState>) { }

 

  isFavoriteCities: { [city: string]: boolean } = {};
  isFavorite: boolean = false;


  keyCity: string = ""
  WeatherCurrent: CurrentWeather = new CurrentWeather("", "", {}, {});
  days: any[] = [];
  mockTransformedData = [
    {
      Date: '2023-11-09T07:00:00+02:00',
      TemperaturMin: 15,
      TemperaturMax: 25
    },
    {
      Date: '2023-11-10T07:00:00+02:00',
      TemperaturMin: 14,
      TemperaturMax: 22
    },
    {
      Date: '2023-11-11T07:00:00+02:00',
      TemperaturMin: 16,
      TemperaturMax: 27
    },
    {
      Date: '2023-11-12T07:00:00+02:00',
      TemperaturMin: 13,
      TemperaturMax: 20
    },
    {
      Date: '2023-11-13T07:00:00+02:00',
      TemperaturMin: 17,
      TemperaturMax: 26
    },
  ];


  @Input()
  city: string = "";

  mockWeatherData: CurrentWeather = new CurrentWeather(
    "Tel Aviv", // Provide the city name
    'Some clouds',
    { Value: 24.5, Unit: 'C', UnitType: 17 },
    { Value: 76, Unit: 'F', UnitType: 18 }
  );


  checkCity() {
    this.isFavoriteCities = JSON.parse(localStorage.getItem('cityDict') || '{}');
  
    if (this.city in this.isFavoriteCities) {
      console.log("check1");
      
      this.isFavorite = this.isFavoriteCities[this.city];
    } else {
      console.log("check2");
      this.isFavorite = false;
      this.isFavoriteCities[this.city] = false;
      localStorage.setItem('cityDict', JSON.stringify(this.isFavoriteCities));

    }
  }

  toggleFavorite() {
    // this.checkCity();
  
    if (!this.isFavorite) {
      this.isFavorite = true;
      // this.isFavoriteCities[this.city] = true;
      this.store.dispatch({
        type: 'addFavorite',
        payload: this.mockWeatherData
      });
    } else {
      this.isFavorite = false;
      // this.isFavoriteCities[this.city] = false;
      this.store.dispatch({ type: 'removeFavorite', payload: { name: this.city } });
    }
  
    // localStorage.setItem('cityDict', JSON.stringify(this.isFavoriteCities));
  }



  getFiveDays(): void {
    this.service.getFiveWeather(this.keyCity).subscribe({
      next: (data: any) => {
        if (data && data.DailyForecasts && Array.isArray(data.DailyForecasts)) {
          this.days = data.DailyForecasts.map((item: any) => ({
            Date: item.Date,
            TemperaturMin: item.Temperature.Minimum.Value,
            TemperaturMax: item.Temperature.Maximum.Value
          }));
          console.log("Transformed Data", this.days);
        } else {
          console.error("Error fetching five-day weather data:");
          alert('Error fetching five-day weather data');
        }
      },
    });
  }





  getCurrentData(): void {
    this.service.getDataCity(this.keyCity).subscribe((weatherData: any) => {
      this.WeatherCurrent = new CurrentWeather(this.city, weatherData[0]?.WeatherText, weatherData[0]?.Temperature.Metric, weatherData[0]?.Temperature.Imperial);
    });

  }


  getCityData(): void {
    this.service.getKeyOfCity(this.city).subscribe((data: any) => {
      console.log("getCityData",data);
      
      const firstItem = data[0];
      if (firstItem) {
        this.keyCity = firstItem.Key;

        this.getCurrentData();
        this.getFiveDays()
      } else {
        this.WeatherCurrent = new CurrentWeather(this.city, "No Data Availibale", {}, {});
      }
    });

  }





  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && !changes['city'].firstChange) {
      // Check if 'city' has changed and it's not the initial change
      // this.getCityData();
      
    }
    // this.checkCity()
  }
  
  
  
  ngOnInit(): void {
    // this.checkCity();
    // this.getCityData();
    
  }

}