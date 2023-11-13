import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../Enviroments/enviroments';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  apiKey: string = environment.apiKey;
  urlLocation: string = environment.urlLoaction;
  urlCurrent: string = environment.urlCurrent;
  urlFive: string = environment.urlFive;
  language: string = environment.language;



  getKeyOfCity(city: string): Observable<any> {
    let split = city.split(' ');
    if (split.length === 1) {
      city = split[0];
    } else {
      console.log(split);
      city = split[0] + '%20' + split[1];
      console.log(city);
    }

    console.log("keyOfCity:",`${this.urlLocation}${this.apiKey}&q=${city}${this.language}`);
    
    return this.http.get(`${this.urlLocation}${this.apiKey}&q=${city}${this.language}`)

  }


  getDataCity(keyCity: string): Observable<any> {
    console.log(keyCity);
    keyCity = keyCity + '?apikey=';
    const url = `${this.urlCurrent}${keyCity}${this.apiKey}${this.language}`;
    console.log(`${this.urlCurrent}${keyCity}${this.apiKey}${this.language}`);

    return this.http.get(url);
  }


  getFiveWeather(keyCity: string): Observable<any> {
    console.log(keyCity);
    keyCity = keyCity + '?apikey=';
    const url = `${this.urlFive}${keyCity}${this.apiKey}${this.language}`;
    console.log(`${this.urlFive}${keyCity}${this.apiKey}${this.language}`);

    return this.http.get(url);

  }

}