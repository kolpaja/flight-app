import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import searchReducer from '../features/searches/searchesSlice';
import flightsReducer from '../features/flights/flightsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import themeReducer from '../features/theme/themeSlice';

export const reducers = {
	auth: authReducer,
	searches: searchReducer,
	flights: flightsReducer,
	favorites: favoritesReducer,
	theme: themeReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
