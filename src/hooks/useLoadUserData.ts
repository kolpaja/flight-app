import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchRecentSearches } from '../features/searches/searchesSlice';
import { fetchFavorites } from '../features/favorites/favoritesSlice';

export function useLoadUserData() {
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state) => state.auth.user?.id);

	useEffect(() => {
		if (userId === undefined) return;
		dispatch(fetchRecentSearches(userId));
		dispatch(fetchFavorites(userId));
	}, [dispatch, userId]);
}
