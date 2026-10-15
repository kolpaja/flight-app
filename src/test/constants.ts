import type { Flight, RecentSearch, User } from '../types';

export const demoUser: User = { id: 1, name: 'Demo User', email: 'demo@flightapp.dev' };

export const signedIn = { user: demoUser, status: 'succeeded' as const, error: null };

export const makeFlight = (id: string, over: Partial<Flight> = {}): Flight => ({
	id,
	flightNumber: `LH${id}`,
	airline: 'Lufthansa',
	origin: 'TIA',
	destination: 'FCO',
	departureTime: '2026-10-20T09:15',
	arrivalTime: '2026-10-20T11:00',
	durationMinutes: 105,
	aircraft: 'A320',
	terminal: '1',
	gate: 'B4',
	status: 'On Time',
	...over,
});

export const makeSearch = (id: number, over: Partial<RecentSearch> = {}): RecentSearch => ({
	id,
	userId: 1,
	origin: 'TIA',
	destination: 'FCO',
	departDate: '2026-10-12',
	returnDate: '2026-10-15',
	createdAt: `2026-10-01T10:${String(id).padStart(2, '0')}:00.000Z`,
	...over,
});
