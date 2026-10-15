import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addFavorite, removeFavorite, selectFavoriteRecordByFlightId } from '../features/favorites/favoritesSlice';
import { Flight } from '../types';

export function useFavorite(flight: Flight) {
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state) => state.auth.user?.id);
	const record = useAppSelector((state) => selectFavoriteRecordByFlightId(state, flight.id));

	const toggle = useCallback(() => {
		if (userId === undefined) return;
		if (record) dispatch(removeFavorite(record.id));
		else dispatch(addFavorite({ userId, flight }));
	}, [dispatch, userId, record, flight]);

	return { isFavorite: record !== undefined, toggle };
}
