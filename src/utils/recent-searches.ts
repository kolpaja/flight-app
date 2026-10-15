import { RecentSearch, SearchCriteria } from '../types';
import { formatShortDate } from './date';
export const MAX_SEARCHED_ITEMS = 10;

const KEYS = ['origin', 'destination', 'departDate', 'returnDate'] as const;

export const isSameSearch = (a: SearchCriteria, b: SearchCriteria) => KEYS.every((key) => a[key] === b[key]);

export const formatSearch = (s: SearchCriteria) => `${s.origin} → ${s.destination} · ${formatShortDate(s.departDate)} – ${formatShortDate(s.returnDate)}`;

export const applySameSearchRule = (existing: RecentSearch[], created: RecentSearch): { keep: RecentSearch[]; remove: RecentSearch[] } => {
	const sortedItems = existing.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	const duplicates = sortedItems.filter((item) => isSameSearch(item, created));
	const otherItems = sortedItems.filter((item) => !isSameSearch(item, created));
	const mergedItems = [created, ...otherItems];

	return {
		keep: mergedItems.slice(0, MAX_SEARCHED_ITEMS),
		remove: [...duplicates, ...mergedItems.slice(MAX_SEARCHED_ITEMS)],
	};
};
