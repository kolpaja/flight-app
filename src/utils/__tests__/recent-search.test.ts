import { RecentSearch } from '../../types';
import { applySameSearchRule } from './../recent-searches';

const make = (id: number, over: Partial<RecentSearch> = {}): RecentSearch => ({
	id,
	userId: 1,
	origin: 'TIA',
	destination: 'MXP',
	departDate: '2026-10-16',
	returnDate: '2026-10-18',
	createdAt: `2026-10-01T10:${String(id).padStart(2, '0')}:00.000Z`,
	...over,
});

describe('applySameSearchRule', () => {
	it('puts the new search first, then the others', () => {
		const a = make(1, { destination: 'MXP' });
		const b = make(2, { destination: 'FRA' });

		const created = make(3, { destination: 'IST' });

		const { keep, remove } = applySameSearchRule([a, b], created);

		expect(keep.map((item) => item.id)).toEqual([3, 2, 1]);
		expect(remove).toEqual([]);
	});

	it('replaces the same earlier search', () => {
		const old = make(1);
		const created = make(2);
		const { keep, remove } = applySameSearchRule([old], created);

		expect(keep).toEqual([created]);
		expect(remove).toEqual([old]);
	});
});
