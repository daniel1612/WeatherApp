import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CurrentWeather } from 'src/app/Types/current-weather';
import { FavoriteState } from 'src/app/Redux/FavoriteReducer';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorits.component.html',
  styleUrls: ['./favorits.component.css']
})
export class FavoritsComponent {
  favorites!: Observable<CurrentWeather[]>;

  constructor(private store: Store<{favoriteReducer: FavoriteState}>) {}


  cityCard(favorite: any){
    console.log("its Work");
    
  }

  ngOnInit(): void {
    this.store.select(data => console.log(data));
    this.favorites = this.store.select(data => data.favoriteReducer.favorits);
  }
}
