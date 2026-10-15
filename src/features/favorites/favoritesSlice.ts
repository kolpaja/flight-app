import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { FavoriteFlight, Flight, RecordId, RequestStatus } from '../../types';
import { getErrorMessage } from '../../utils/errors';
import { favoritesApi } from '../../api/endpoints';
import { logout } from '../auth/authSlice';

interface FavoriteState {
	items: FavoriteFlight[];
	status: RequestStatus;
	error: string | null;
}

const initialState: FavoriteState = { items: [], status: 'idle', error: null };

export const fetchFavorites = createAsyncThunk<FavoriteFlight[], RecordId, { rejectValue: string }>('favorites/fetch', async (userId, { rejectWithValue }) => {
	try {
		return await favoritesApi.list(userId);
	} catch (error) {
		return rejectWithValue(getErrorMessage(error));
	}
});

export const addFavorite = createAsyncThunk<FavoriteFlight, { userId: RecordId; flight: Flight }, { rejectValue: string }>(
	'favorites/add',
	async ({ userId, flight }, { rejectWithValue }) => {
		try {
			return await favoritesApi.add(userId, flight);
		} catch (error) {
			return rejectWithValue(getErrorMessage(error));
		}
	},
);

export const removeFavorite = createAsyncThunk<RecordId, RecordId, { rejectValue: string }>('favorites/remove', async (recordId, { rejectWithValue }) => {
	try {
		return await favoritesApi.remove(recordId);
	} catch (error) {
		return rejectWithValue(getErrorMessage(error));
	}
});

export const clearFavorites = createAsyncThunk<RecordId[], RecordId, { rejectValue: string }>('favorites/remove-all', async (userId, { rejectWithValue }) => {
	try {
		return await favoritesApi.removeAll(userId);
	} catch (error) {
		return rejectWithValue(getErrorMessage(error));
	}
});

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavorites.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchFavorites.fulfilled, (state, { payload }) => {
				state.items = payload;
				state.status = 'succeeded';
				state.error = null;
			})
			.addCase(fetchFavorites.rejected, (state, { payload }) => {
				state.status = 'failed';
				state.error = payload ?? 'Failed fetching favorite flights';
			})
			.addCase(addFavorite.fulfilled, (state, { payload }) => {
				const alreadyFavorite = state.items.some((item) => item.flight.id === payload.flight.id);

				if (!alreadyFavorite) state.items.push(payload);
			})
			.addCase(addFavorite.rejected, (state, { payload }) => {
				state.error = payload ?? 'Could not save favorite';
			})
			.addCase(removeFavorite.fulfilled, (state, { payload }) => {
				state.items = state.items.filter((item) => item.id !== payload);
			})
			.addCase(removeFavorite.rejected, (state, { payload }) => {
				state.error = payload ?? 'Could not remove favorite';
			})
			.addCase(clearFavorites.fulfilled, (state, action) => {
				state.items = state.items.filter((item) => !action.payload.includes(item.id));
			})
			.addCase(clearFavorites.rejected, (state, { payload }) => {
				state.error = payload ?? 'Could not clear the favorite flights';
			})
			.addCase(logout, () => initialState);
	},
});

type WithFavorites = { favorites: FavoriteState };

export const selectFavoriteRecords = (state: WithFavorites) => state.favorites.items;
export const selectFavoriteStatus = (state: WithFavorites) => state.favorites.status;
export const selectFavoriteFlights = createSelector([selectFavoriteRecords], (records) => records.map((record) => record.flight));
export const selectFavoriteRecordByFlightId = (state: WithFavorites, flightId: string) => state.favorites.items.find((record) => record.flight.id === flightId);

export default favoritesSlice.reducer;
