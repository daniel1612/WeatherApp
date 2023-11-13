import { Observable } from 'rxjs';
import { DarkModeService } from './../../Services/dark-mode.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  darkMode$!: Observable<boolean>;

  constructor(private router: Router, private darkModeService: DarkModeService) { }

  ngOnInit() {
    this.darkMode$ = this.darkModeService.darkMode$;
  }

  NavigateHome() {
    console.log("daa");
    this.router.navigate(['/HomePage']);
  }

  NavigateFavorits() {
    this.router.navigate(['/Favorits']);
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
