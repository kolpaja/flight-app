import Rand from 'rand-seed';
import type { Flight, SearchCriteria } from '../types';
import { FLIGHT_STATUS, FlightStatus } from '../types/flightStatuses';
import { addMinutes, pad } from '../utils/date';

const AIRLINES = [
	{ name: 'Lufthansa', code: 'LH' },
	{ name: 'ITA Airways', code: 'AZ' },
	{ name: 'Air Albania', code: 'ZB' },
	{ name: 'Wizz Air', code: 'W6' },
	{ name: 'Turkish Airlines', code: 'TK' },
	{ name: 'Ryanair', code: 'FR' },
	{ name: 'Swiss', code: 'LX' },
];
const AIRCRAFT = ['Airbus A320neo', 'Airbus A321', 'Boeing 737-800', 'Embraer E195', 'Airbus A220-300'];

const STATUS_WEIGHTS = [
	[FLIGHT_STATUS.OnTime, 5],
	[FLIGHT_STATUS.Scheduled, 2],
	[FLIGHT_STATUS.Delayed, 2],
	[FLIGHT_STATUS.Boarding, 1],
	[FLIGHT_STATUS.Cancelled, 1],
] as const satisfies readonly (readonly [FlightStatus, number])[];

function pickWeighted<T>(entries: readonly (readonly [T, number])[], random: () => number): T {
	const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
	let threshold = random() * total;
	for (const [value, weight] of entries) {
		threshold -= weight;
		if (threshold < 0) return value;
	}
	return entries[entries.length - 1][0];
}

/**
 * mock API for the flights for like 4-6 departing flights
 */
export function generateFlights(criteria: SearchCriteria): Flight[] {
	const { origin, destination, departDate, returnDate } = criteria;
	const rand = new Rand(`${origin}-${destination}-${departDate}-${returnDate}`);
	const random = () => rand.next();

	const count = 4 + Math.floor(random() * 3);
	const baseDuration = 70 + Math.floor(new Rand(`${origin}${destination}`).next() * 170);
	const flights: Flight[] = [];

	for (let i = 0; i < count; i++) {
		const airline = AIRLINES[Math.floor(random() * AIRLINES.length)];
		const number = 100 + Math.floor(random() * 8900);
		const hour = 6 + Math.floor((i * 15) / count) + Math.floor(random() * 2);
		const minute = Math.floor(random() * 12) * 5;
		const durationMinutes = baseDuration + Math.floor(random() * 4) * 5;
		const departureTime = `${departDate}T${pad(hour)}:${pad(minute)}`;
		const flightNumber = `${airline.code}${number}`;

		flights.push({
			id: `${flightNumber}-${departDate}`,
			flightNumber,
			airline: airline.name,
			origin,
			destination,
			departureTime,
			arrivalTime: addMinutes(departureTime, durationMinutes),
			durationMinutes,
			aircraft: AIRCRAFT[Math.floor(random() * AIRCRAFT.length)],
			terminal: String(1 + Math.floor(random() * 3)),
			gate: `${'ABCD'[Math.floor(random() * 4)]}${1 + Math.floor(random() * 28)}`,
			status: pickWeighted(STATUS_WEIGHTS, random),
		});
	}
	return flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}
