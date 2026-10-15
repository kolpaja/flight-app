import { AIRPORTS } from '../data/airports';
import type { SearchCriteria } from '../types';
import { todayISO } from './date';

const AIRPORT_CODES = new Set(AIRPORTS.map((airport) => airport.code));

export type SearchErrors = Partial<Record<keyof SearchCriteria, string>>;

export function validateSearch(criteria: SearchCriteria, today: string = todayISO()): SearchErrors {
	const errors: SearchErrors = {};
	const origin = criteria.origin.trim().toUpperCase();
	const destination = criteria.destination.trim().toUpperCase();

	if (!AIRPORT_CODES.has(origin)) errors.origin = 'Enter an airport code, for example TIA';
	if (!AIRPORT_CODES.has(destination)) errors.destination = 'Enter an airport code, for example MXP';
	else if (origin === destination) errors.destination = 'Destination must different from origin';
	if (criteria.departDate < today) errors.departDate = 'Departure cannot be in the past date';
	if (criteria.returnDate < criteria.departDate) errors.returnDate = 'Return must be on or after departure date';

	return errors;
}
