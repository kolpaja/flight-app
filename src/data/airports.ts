import type { Airport } from '../types';

export const AIRPORTS: Airport[] = [
	{ code: 'TIA', city: 'Tirana', name: 'Nene Tereza International', country: 'Albania' },
	{ code: 'FCO', city: 'Rome', name: 'Leonardo da Vinci–Fiumicino', country: 'Italy' },
	{ code: 'MXP', city: 'Milan', name: 'Malpensa', country: 'Italy' },
	{ code: 'VCE', city: 'Venice', name: 'Marco Polo', country: 'Italy' },
	{ code: 'NAP', city: 'Naples', name: 'Capodichino', country: 'Italy' },
	{ code: 'BLQ', city: 'Bologna', name: 'Guglielmo Marconi', country: 'Italy' },
	{ code: 'FRA', city: 'Frankfurt', name: 'Frankfurt am Main', country: 'Germany' },
	{ code: 'MUC', city: 'Munich', name: 'Franz Josef Strauss', country: 'Germany' },
	{ code: 'BER', city: 'Berlin', name: 'Brandenburg', country: 'Germany' },
	{ code: 'DUS', city: 'Düsseldorf', name: 'Düsseldorf Airport', country: 'Germany' },
	{ code: 'LHR', city: 'London', name: 'Heathrow', country: 'United Kingdom' },
	{ code: 'LGW', city: 'London', name: 'Gatwick', country: 'United Kingdom' },
	{ code: 'STN', city: 'London', name: 'Stansted', country: 'United Kingdom' },
	{ code: 'MAN', city: 'Manchester', name: 'Manchester Airport', country: 'United Kingdom' },
	{ code: 'CDG', city: 'Paris', name: 'Charles de Gaulle', country: 'France' },
	{ code: 'ORY', city: 'Paris', name: 'Orly', country: 'France' },
	{ code: 'NCE', city: 'Nice', name: 'Côte d’Azur', country: 'France' },
	{ code: 'MAD', city: 'Madrid', name: 'Adolfo Suárez Barajas', country: 'Spain' },
	{ code: 'BCN', city: 'Barcelona', name: 'El Prat', country: 'Spain' },
	{ code: 'LIS', city: 'Lisbon', name: 'Humberto Delgado', country: 'Portugal' },
	{ code: 'AMS', city: 'Amsterdam', name: 'Schiphol', country: 'Netherlands' },
	{ code: 'BRU', city: 'Brussels', name: 'Brussels Airport', country: 'Belgium' },
	{ code: 'ZRH', city: 'Zurich', name: 'Zurich Airport', country: 'Switzerland' },
	{ code: 'GVA', city: 'Geneva', name: 'Geneva Airport', country: 'Switzerland' },
	{ code: 'VIE', city: 'Vienna', name: 'Vienna International', country: 'Austria' },
	{ code: 'PRG', city: 'Prague', name: 'Václav Havel', country: 'Czechia' },
	{ code: 'BUD', city: 'Budapest', name: 'Ferenc Liszt', country: 'Hungary' },
	{ code: 'WAW', city: 'Warsaw', name: 'Chopin', country: 'Poland' },
	{ code: 'ATH', city: 'Athens', name: 'Eleftherios Venizelos', country: 'Greece' },
	{ code: 'SKG', city: 'Thessaloniki', name: 'Makedonia', country: 'Greece' },
	{ code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', country: 'Türkiye' },
	{ code: 'SAW', city: 'Istanbul', name: 'Sabiha Gökçen', country: 'Türkiye' },
	{ code: 'BEG', city: 'Belgrade', name: 'Nikola Tesla', country: 'Serbia' },
	{ code: 'SKP', city: 'Skopje', name: 'Alexander the Great', country: 'North Macedonia' },
	{ code: 'PRN', city: 'Pristina', name: 'Adem Jashari', country: 'Kosovo' },
	{ code: 'DBV', city: 'Dubrovnik', name: 'Dubrovnik Airport', country: 'Croatia' },
	{ code: 'ZAG', city: 'Zagreb', name: 'Franjo Tuđman', country: 'Croatia' },
	{ code: 'DXB', city: 'Dubai', name: 'Dubai International', country: 'United Arab Emirates' },
	{ code: 'DOH', city: 'Doha', name: 'Hamad International', country: 'Qatar' },
	{ code: 'JFK', city: 'New York', name: 'John F. Kennedy', country: 'United States' },
];

export function findAirport(code: string): Airport | undefined {
	return AIRPORTS.find((airport) => airport.code === code.toUpperCase());
}

/** "TIA – Tirana to show better" */
export function airportLabel(code: string): string {
	const airport = findAirport(code);
	return airport ? `${airport.code} – ${airport.city}` : code;
}

/** Autocomplete: IATA prefix the airport code first, then city/name/country substring. Max 5 results as per limit UPDATE the limit to show more. */
export function searchAirports(query: string, limit = 5): Airport[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const byCode = AIRPORTS.filter((a) => a.code.toLowerCase().startsWith(q));
	const byText = AIRPORTS.filter(
		(a) => !byCode.includes(a) && (a.city.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q)),
	);
	return [...byCode, ...byText].slice(0, limit);
}
