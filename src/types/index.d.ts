import type { ComponentProps } from 'react';
import type { FlightStatus } from './flightStatuses';
import type { Ionicons } from '@expo/vector-icons';

export type RecordId = string | number;

export type User = {
	id: RecordId;
	name: string;
	email: string;
};

export interface UserRecord extends User {
	password: string;
}

export interface Airport {
	code: string;
	name: string;
	city: string;
	country: string;
}

export interface Flight {
	id: string;
	flightNumber: string;
	airline: string;
	origin: string; // IATA: ex: TIA
	destination: string; // IATA: ex: BGY
	departureTime: string; // local time "YYYY-MM-DDTHH:mm"
	arrivalTime: string; // local time "YYYY-MM-DDTHH:mm"
	durationMinutes: number;
	aircraft: string;
	terminal: string;
	gate: string;
	status: FlightStatus;
}

export type SearchCriteria = {
	origin: string;
	destination: string;
	departDate: string;
	returnDate: string;
};

export interface RecentSearch extends SearchCriteria {
	id: RecordId;
	userId: RecordId;
	createdAt: string;
}

export interface FavoriteFlight {
	id: RecordId;
	userId: RecordId;
	flight: Flight;
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type IconName = ComponentProps<typeof Ionicons>['name'];
