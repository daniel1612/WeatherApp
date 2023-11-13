// app.component.ts
import { Component, OnInit } from '@angular/core';
import { DarkModeService } from './Services/dark-mode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  darkMode$!: Observable<boolean>;

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit() {
    this.darkMode$ = this.darkModeService.darkMode$;
  }
}
