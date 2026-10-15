import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Flight, RequestStatus, SearchCriteria } from '../../types';
import { getErrorMessage } from '../../utils/errors';
import { flightApi } from '../../api/endpoints';
import { logout } from '../auth/authSlice';

interface FlightState {
	flights: Flight[];
	status: RequestStatus;
	error: string | null;
	requestId: string | null;
}

const initialState: FlightState = { flights: [], status: 'idle', error: null, requestId: null };

export const searchFlights = createAsyncThunk<Flight[], SearchCriteria, { rejectValue: string }>(
	'flights/search',
	async (criteria: SearchCriteria, { rejectWithValue }) => {
		try {
			return await flightApi.list(criteria);
		} catch (error) {
			return rejectWithValue(getErrorMessage(error));
		}
	},
);

const flightsSlice = createSlice({
	name: 'flights',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(searchFlights.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
				state.requestId = action.meta.requestId;
			})
			.addCase(searchFlights.fulfilled, (state, action) => {
				if (state.requestId !== action.meta.requestId) return;
				state.status = 'succeeded';
				state.error = null;
				state.flights = action.payload;
			})
			.addCase(searchFlights.rejected, (state, action) => {
				if (state.requestId !== action.meta.requestId) return;
				state.error = action.payload ?? 'Failed to search flights';
				state.status = 'failed';
			})
			.addCase(logout, () => initialState);
	},
});

export default flightsSlice.reducer;
