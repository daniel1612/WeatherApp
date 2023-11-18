import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDegree'
})
export class ConvertDegreePipe implements PipeTransform {

  transform(value: number | undefined | null, toCelsius: boolean = true): string | undefined | null {
    if (value === undefined || value === null) {
      return value;
    }

    if (toCelsius) {
      const val = (((value - 32) * 5) / 9);
      return val.toFixed(1);
    } else {
      return value.toString(); 
    }
  }
}
