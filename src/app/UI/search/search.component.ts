import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from 'src/app/Redux/WeatherReducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private store: Store<{weatherData: WeatherState}>){}


  
  sendQuery(queryString: string):void {
    this.store.dispatch({type: 'GetCityName', payload: queryString})
  }

}
