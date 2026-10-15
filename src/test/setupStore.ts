import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from '../app/rootReducers';

export const setupStore = (preloadedState?: Partial<RootState>) =>
	configureStore({
		reducer: rootReducer,
		preloadedState,
	});

export type TestStore = ReturnType<typeof setupStore>;
