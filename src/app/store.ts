import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './rootReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

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
	theme: persistReducer(
		{
			key: 'theme',
			storage: AsyncStorage,
			whitelist: ['mode'],
		},
		reducers.theme,
	),
};

export const store = configureStore({
	reducer: persistedReducers,
	devTools: false,
	enhancers: (getDefaultEnhancers) => {
		const defaults = getDefaultEnhancers();
		if (!__DEV__) return defaults;
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const devtoolsEnhancer = require('redux-devtools-expo-dev-plugin').default;
		return defaults.concat(devtoolsEnhancer());
	},
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
