import { Component,Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteState } from 'src/app/Redux/FavoriteReducer';
import { WeatherState } from 'src/app/Redux/WeatherReducer';
import { CurrentWeather } from 'src/app/Types/current-weather';

@Component({
  selector: 'app-button-favorite',
  templateUrl: './button-favorite.component.html',
  styleUrls: ['./button-favorite.component.css']
})
export class ButtonFavoriteComponent {
  
  constructor(private store: Store<{ favoriteReducer: FavoriteState, weatherData: WeatherState}>) { }
  
  
  isFavorite: boolean = false;
  isFavoriteCities!: Observable<any>;
  @Input() city: string = "";
  @Input() WeatherCurrent: CurrentWeather | null = null;
  @Input() isFavoriteComp: boolean = false;


  checkCityFavorite() {
    this.isFavoriteCities = this.store.select(data => data.favoriteReducer.isFavoriteCities)
    this.isFavoriteCities.subscribe((data: any) => {
      console.log("checkCityFavorite:",data);
      this.isFavorite = data[this.city] === true;
    })
  }


  toggleFavorite() {
    this.checkCityFavorite();
    if (!this.isFavorite) {
      this.isFavorite = true;
      this.store.dispatch({
        type: 'addFavorite',
        payload: this.WeatherCurrent
      });
    } else {
      this.isFavorite = false;
      this.store.dispatch({ type: 'removeFavorite', payload: { name: this.city } });
    }
  }
  


  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['city'] && !changes['city'].firstChange) {      
    if (changes['city']) {      
      this.checkCityFavorite();
    }
  }

  ngOnInit(): void {
    console.log("button Favorite",this.city);
    // this.checkCityFavorite();

    
  }

}
