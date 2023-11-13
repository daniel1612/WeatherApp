export class CurrentWeather {
    public name: string = "";
    public WeatherText: string = "";
    public TemperatureC: any = {};
    public TemperatureF: any = {};
  
    constructor(name: string, WeatherText: string, TemperatureC: any, TemperatureF: any) {
      this.name = name;
      this.WeatherText = WeatherText;
      this.TemperatureC = TemperatureC;
      this.TemperatureF = TemperatureF;
    }
  }
  