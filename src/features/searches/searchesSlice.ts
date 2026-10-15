import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecentSearch, RecordId, RequestStatus, SearchCriteria } from '../../types';
import { getErrorMessage } from '../../utils/errors';
import { searchApi } from '../../api/endpoints';
import { logout } from '../auth/authSlice';

interface SearchState {
	items: RecentSearch[];
	status: RequestStatus;
	error: string | null;
}

const initialState: SearchState = { items: [], status: 'idle', error: null };

export const saveSearch = createAsyncThunk<
	RecentSearch[],
	{
		userId: RecordId;
		criteria: SearchCriteria;
	},
	{
		rejectValue: string;
	}
>('searches/save', async ({ userId, criteria }, { rejectWithValue }) => {
	try {
		return await searchApi.save(userId, criteria);
	} catch (error) {
		return rejectWithValue(getErrorMessage(error));
	}
});

export const fetchRecentSearches = createAsyncThunk<
	RecentSearch[],
	RecordId,
	{
		rejectValue: string;
	}
>('searches/fetch', async (userId, { rejectWithValue }) => {
	try {
		return await searchApi.list(userId);
	} catch (error) {
		return rejectWithValue(getErrorMessage(error));
	}
});

const searchSlice = createSlice({
	name: 'recent-search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecentSearches.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchRecentSearches.fulfilled, (state, { payload }) => {
				state.status = 'succeeded';
				state.items = payload;
				state.error = null;
			})
			.addCase(fetchRecentSearches.rejected, (state, { payload }) => {
				state.status = 'failed';
				state.error = payload ?? 'Could not load recent searches';
			})
			.addCase(saveSearch.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(saveSearch.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload ?? 'Saving search failed';
			})
			.addCase(logout, () => initialState);
	},
});

export default searchSlice.reducer;
