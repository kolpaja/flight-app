import { generateFlights } from '../data/mockFlights';
import { FavoriteFlight, Flight, RecentSearch, RecordId, SearchCriteria, User, UserRecord } from '../types';
import { wait } from '../utils/general';
import { applySameSearchRule, MAX_SEARCHED_ITEMS } from '../utils/recent-searches';
import { http } from './http';

export const authApi = {
	async login(email: string, password: string): Promise<User> {
		const users = await http.get<UserRecord[]>(`/users?email=${encodeURIComponent(email.trim().toLowerCase())}`);

		const foundUser = users.find((user) => user.password === password);
		if (!foundUser) throw new Error('Invalid email or password');
		const { password: __omit, ...safeUser } = foundUser;
		return safeUser;
	},
};
export const searchApi = {
	list(userId: RecordId) {
		return http.get<RecentSearch[]>(`/resentSearches?userId=${userId}&_sort=createdAt&_order=desc&_limit=${MAX_SEARCHED_ITEMS}`);
	},
	async save(userId: RecordId, criteria: SearchCriteria): Promise<RecentSearch[]> {
		const existing = await http.get<RecentSearch[]>(`/resentSearches?userId=${userId}`);
		const created = await http.post<RecentSearch>(`/resentSearches`, {
			...criteria,
			userId,
			createdAt: new Date().toISOString(),
		});

		const { keep, remove } = applySameSearchRule(existing, created);
		await Promise.all(remove.map((item) => http.delete(`/resentSearches/${item.id}`)));
		return keep;
	},
};

export const flightApi = {
	async list(criteria: SearchCriteria): Promise<Flight[]> {
		await wait(700);
		return generateFlights(criteria);
	},
};

export const favoritesApi = {
	list(userId: RecordId) {
		return http.get<FavoriteFlight[]>(`/favorites?userId=${userId}`);
	},
	add(userId: RecordId, flight: Flight) {
		return http.post<FavoriteFlight>(`/favorites`, { userId, flight });
	},
	async remove(id: RecordId): Promise<RecordId> {
		await http.delete(`/favorites/${id}`);
		return id;
	},
	async removeAll(userId: RecordId): Promise<RecordId[]> {
		const favorites = await favoritesApi.list(userId);
		const ids = favorites.map((favorite) => favorite.id);

		await Promise.all(ids.map((id) => favoritesApi.remove(id)));
		return ids;
	},
};
