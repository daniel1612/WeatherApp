import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CurrentWeather } from 'src/app/Types/current-weather';
import { FavoriteState } from 'src/app/Redux/FavoriteReducer';
import { Router } from '@angular/router';
import { WeatherState } from 'src/app/Redux/WeatherReducer';
import { DegreeModeService } from 'src/app/Services/degree-mode.service';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorits.component.html',
  styleUrls: ['./favorits.component.css']
})
export class FavoritsComponent {
  favorites!: Observable<CurrentWeather[]>;
  degreeMode$!: Observable<any>;
  constructor(private router: Router,private store: Store<{ favoriteReducer: FavoriteState, weatherData: WeatherState }>,private degereeModeService: DegreeModeService) { }

  cityCard(favorite: any){
    console.log("its Work favorite", favorite);
    this.store.dispatch({type: "GetDataWeather", payload: favorite})
    this.router.navigate(['/HomePage'])
    
  }

  ngOnInit(): void {
    this.favorites = this.store.select(data => data.favoriteReducer.favorits);
    this.degreeMode$ = this.degereeModeService.degreeMode$;
  }

}
