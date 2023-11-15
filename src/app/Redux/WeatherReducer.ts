import { CurrentWeather } from "../Types/current-weather"

export interface WeatherState {
    WeatherData: CurrentWeather;
}

const initialState: WeatherState = {
    WeatherData: new CurrentWeather("", "", {}, {})
}

export const WeatherReducer = (state: WeatherState = initialState, action: any) => {
    switch (action.type) {
        case 'GetDataWeather':
            console.log("WeatherReducer:", state);
            
            return { WeatherData: action.payload };
        default:
            return state;
    }
}
