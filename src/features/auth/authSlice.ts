import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, User } from '../../types';
import { authApi } from '../../api/endpoints';
import { getErrorMessage } from '../../utils/errors';

interface AuthState {
	user: User | null;
	status: RequestStatus;
	error: string | null;
}

const initialState: AuthState = { user: null, status: 'idle', error: null };

export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			return await authApi.login(email, password);
		} catch (error) {
			return rejectWithValue(getErrorMessage(error));
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.status = 'idle';
			state.error = null;
		},
		clearAuthError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.user = null;
				state.status = 'loading';
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload ?? 'Login Failed';
			});
	},
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
