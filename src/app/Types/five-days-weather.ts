export class FiveDaysWeather {
    public Date: string = "";
    public TemperaturMin: number = 0;
    public TemperaturMax: number = 0;
 
    constructor(Date: string, TemperaturMin: number, TemperaturMax: number) {
      this.Date = Date;
      this.TemperaturMin = TemperaturMin;
      this.TemperaturMax = TemperaturMax;
    }
}


