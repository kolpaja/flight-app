import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './rootReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import devtoolsEnhancer from 'redux-devtools-expo-dev-plugin';

const persistedReducers = {
	...reducers,
	auth: persistReducer(
		{
			key: 'auth',
			storage: AsyncStorage,
			whitelist: ['user'],
		},
		reducers.auth,
	),
};

export const store = configureStore({
	reducer: persistedReducers,
	devTools: false,
	enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devtoolsEnhancer()),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
