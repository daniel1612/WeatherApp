import { CurrentWeather } from '../Types/current-weather';

export interface FavoriteState {
  favorits: CurrentWeather[];
  isFavoriteCities: { [city: string]: boolean };
}

export const FavoriteReducer = (state: FavoriteState = { favorits: [], isFavoriteCities: { "Tel Aviv": false } }, action: any) => {
  console.log("payload:", action.payload);

  switch (action.type) {
    case 'addFavorite':
      let isExist = state.favorits.some(fav => fav.name === action.payload.name);
      console.log("Name", action.payload.name);

      if (isExist) {
        console.log("isExist ");
        return { ...state };
      }
      return { ...state, favorits: [...state.favorits, action.payload], isFavoriteCities: { ...state.isFavoriteCities, [action.payload.name]: true } };
    
    case 'removeFavorite':
      return { ...state, favorits: state.favorits.filter(fav => fav.name !== action.payload.name) };

    default:
      return state;
  }
};
