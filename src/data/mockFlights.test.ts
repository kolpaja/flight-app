import { generateFlights } from './mockFlights';

const criteria = { origin: 'TIA', destination: 'FCO', departDate: '2026-10-12', returnDate: '2026-10-15' };

describe('generateFlights', () => {
	it('is same flights for the same search', () => {
		expect(generateFlights(criteria)).toEqual(generateFlights(criteria));
	});

	it('returns flights for the requested route and date, sorted by departure', () => {
		const flights = generateFlights(criteria);
		expect(flights.length).toBeGreaterThanOrEqual(4);
		for (const flight of flights) {
			expect(flight.origin).toBe('TIA');
			expect(flight.destination).toBe('FCO');
			expect(flight.departureTime.startsWith('2026-10-12')).toBe(true);
			expect(flight.arrivalTime > flight.departureTime).toBe(true);
		}
		const times = flights.map((f) => f.departureTime);
		expect(times).toEqual([...times].sort());
	});
});
