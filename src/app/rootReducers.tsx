import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const reducers = {
	auth: authReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
