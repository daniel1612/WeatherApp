import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DegreeModeService } from 'src/app/Services/degree-mode.service';

@Component({
  selector: 'app-button-degree',
  templateUrl: './button-degree.component.html',
  styleUrls: ['./button-degree.component.css']
})
export class ButtonDegreeComponent {

  constructor(private degereeModeService: DegreeModeService) { }

  toggleDegreeMode() : void {
    this.degereeModeService.toggleDegreeMode()
  }


}
