import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  ParentCity: string = "Tel Aviv";

  Search(query: string): void {
    this.ParentCity = query;
  }




}
