import { DegreeModeService } from './../../Services/degree-mode.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherState } from 'src/app/Redux/WeatherReducer';
import { WeatherService } from 'src/app/Services/weather.service';
import { CurrentWeather } from 'src/app/Types/current-weather';



@Component({
  selector: 'app-data-weather',
  templateUrl: './data-weather.component.html',
  styleUrls: ['./data-weather.component.css']
})
export class DataWeatherComponent {

  isFavoriteCities!: Observable<any>;
  degreeMode$!: Observable<any>;
  constructor(private service: WeatherService, private store: Store<{ weatherData: WeatherState }>, private degereeModeService: DegreeModeService) { }
  isFavorite: boolean = false;


  keyCity: string = ""
  // WeatherCurrent: CurrentWeather = new CurrentWeather("", "", {}, {});

  WeatherCurrent!: Observable<CurrentWeather>;
  days: any[] = [];
  mockTransformedData = [
    {
      Date: '2023-11-09T07:00:00+02:00',
      TemperaturMin: 65,
      TemperaturMax: 73
    },
    {
      Date: '2023-11-10T07:00:00+02:00',
      TemperaturMin: 66,
      TemperaturMax: 83
    },
    {
      Date: '2023-11-11T07:00:00+02:00',
      TemperaturMin: 38,
      TemperaturMax: 40
    },
    {
      Date: '2023-11-12T07:00:00+02:00',
      TemperaturMin: 40,
      TemperaturMax: 50
    },
    {
      Date: '2023-11-13T07:00:00+02:00',
      TemperaturMin: 60,
      TemperaturMax: 70
    },
  ];

  cityName!: Observable<any>;
  city:string ="";

  // @Input()
  // city: string = "";

  mockWeatherData: CurrentWeather = new CurrentWeather(
    "Tel Aviv", // Provide the city name
    'Some clouds',
    { Value: 24.5, Unit: 'C', UnitType: 17 },
    { Value: 76, Unit: 'F', UnitType: 18 }
  );


  // checkCity() {
  //   this.isFavoriteCities = JSON.parse(localStorage.getItem('cityDict') || '{}');

  //   if (this.city in this.isFavoriteCities) {
  //     console.log("check1");

  //     // this.isFavorite = this.isFavoriteCities[this.city];
  //   } else {
  //     console.log("check2");
  //     this.isFavorite = false;
  //     // this.isFavoriteCities[this.city] = false;
  //     localStorage.setItem('cityDict', JSON.stringify(this.isFavoriteCities));

  //   }
  // }


  // checkCity() {
  //   this.isFavoriteCities = this.store.select(data => data.favoriteReducer.isFavoriteCities)

  //   this.isFavoriteCities.subscribe((data: any) => {
  //     console.log(data);
  //     this.isFavorite = data[this.city] === true;

  //     console.log("isFav1:", this.isFavorite);
  //   })


  //   console.log("isFav2:", this.isFavorite);
  // }




  // toggleFavorite() {
  //   this.checkCity();
  //   if (!this.isFavorite) {
  //     this.isFavorite = true;
  //     this.store.dispatch({
  //       type: 'addFavorite',
  //       payload: this.WeatherCurrent
  //     });
  //   } else {
  //     this.isFavorite = false;
  //     console.log("remove favorite");
  //     this.store.dispatch({ type: 'removeFavorite', payload: { name: this.city } });
  //   }
  // }



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
      // this.WeatherCurrent = new CurrentWeather(this.city, weatherData[0]?.WeatherText, weatherData[0]?.Temperature.Metric, weatherData[0]?.Temperature.Imperial);
    });

    this.WeatherCurrent = this.store.select(data => data.weatherData.WeatherData)

  }


  getCityData(): void {
    this.service.getKeyOfCity(this.city).subscribe((data: any) => {
      console.log('this is the city : ', this.city);
      
      console.log("getCityData", data);

      const firstItem = data[0];
      if (firstItem) {
        this.keyCity = firstItem.Key;

        this.getCurrentData();
        this.getFiveDays()
      } else {
        // this.WeatherCurrent = new CurrentWeather(this.city, "No Data Availibale", {}, {});
      }
    });

  }





  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city']) {
      this.getCityData();
    }
  }



  ngOnInit(): void {
    console.log("this is the DataWeather");
    this.WeatherCurrent = this.store.select(data => data.weatherData.WeatherData);
    this.degreeMode$ = this.degereeModeService.degreeMode$;
    this.cityName = this.store.select(data =>  data.weatherData.name)
    this.cityName.subscribe(data => {
      console.log("this is the Name City:",data);
      this.city = data;
      this.getCityData();
  })

  // this.getCityData();

    
  }

}