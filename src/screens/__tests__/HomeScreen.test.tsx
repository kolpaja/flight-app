import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { searchApi } from '../../api/endpoints';
import { makeSearch, signedIn } from '../../test/constants';
import { renderWithProviders } from '../../test/renderWithProviders';
import { formatSearch } from '../../utils/recent-searches';
import HomeScreen from '../HomeScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => ({ navigate: mockNavigate }),
}));
jest.mock('../../api/endpoints', () => ({ searchApi: { save: jest.fn(), list: jest.fn() } }));

const search = makeSearch(1);
const withSearches = (items = [search]) => ({ auth: signedIn, searches: { items, status: 'succeeded' as const, error: null } });

describe('HomeScreen', () => {
	beforeEach(() => {
		mockNavigate.mockReset();
		jest.mocked(searchApi.save).mockReset();
	});

	it('shows an empty state when there are no recent searches', async () => {
		await renderWithProviders(<HomeScreen />, { preloadedState: { auth: signedIn } });

		expect(screen.getByText('No recent searches')).toBeTruthy();
		expect(screen.getByText('Your last 10 searches will show up here.')).toBeTruthy();
	});

	it('lists the recent searches with the route and dates', async () => {
		await renderWithProviders(<HomeScreen />, { preloadedState: withSearches() });
		expect(screen.getByText('TIA → FCO · 12 Oct – 15 Oct')).toBeTruthy();
	});
});
