import { CurrentWeather } from "../Types/current-weather"

export interface WeatherState {
    WeatherData: CurrentWeather;
    name: string;
}

const initialState: WeatherState = {
    WeatherData: new CurrentWeather("", "", {}, {}),
    name: "Tel Aviv"
}

export const WeatherReducer = (state: WeatherState = initialState, action: any) => {
    switch (action.type) {
        case 'GetDataWeather':
            return { WeatherData: action.payload, name: action.payload.name };

        case 'GetCityName':
            console.log("GetCityName", { ...state, name: action.payload });

            return { ...state, name: action.payload };
        default:
            return state;
    }
}
