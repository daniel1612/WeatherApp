import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './Componnets/home-page/home-page.component';
import { FavoritsComponent } from './Componnets/favorits/favorits.component';
import { NavBarComponent } from './UI/nav-bar/nav-bar.component';
import { SearchComponent } from './UI/search/search.component';
import { RouterModule,Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataWeatherComponent } from './Componnets/data-weather/data-weather.component';
import {HttpClientModule} from "@angular/common/http";
import { CardWeatherComponent } from './Componnets/card-weather/card-weather.component';
import { StoreModule } from '@ngrx/store';
import {FavoriteReducer} from "./Redux/FavoriteReducer";
import { DateFormatPipe } from './Pipe/date-format-pipe.pipe';

const appRoute : Routes = [
  {path:"",component: HomePageComponent, children: [
    {path:"HomePage",component: HomePageComponent}
  ]},
  {path:"Favorits",component: FavoritsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    SearchComponent,
    FavoritsComponent,
    DataWeatherComponent,
    CardWeatherComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({favoriteReducer:FavoriteReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
