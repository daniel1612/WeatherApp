import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output()
  query: EventEmitter<string> = new EventEmitter<string>;
  
  sendQuery(queryString: string):void {
    this.query.emit(queryString);    
  }

}
