import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DegreeModeService {

  constructor() { }

  private degreeModeSubject = new BehaviorSubject<boolean>(false);
  degreeMode$ = this.degreeModeSubject.asObservable();



  toggleDegreeMode() {
    const currentMode = this.degreeModeSubject.getValue();
    this.degreeModeSubject.next(!currentMode);
  }


}
