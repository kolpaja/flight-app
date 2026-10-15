import { screen } from '@testing-library/react-native';
import { renderWithProviders } from '../../test/renderWithProviders';
import UserDetails from '../UserDetails';

const user = { id: 1, name: 'Demo User', email: 'demo@flightapp.dev' };

describe('UserDetails', () => {
	it('shows the sign-in user', async () => {
		await renderWithProviders(<UserDetails />, {
			preloadedState: { auth: { user, status: 'succeeded', error: null } },
		});

		expect(screen.getByText(user.name)).toBeTruthy();
		expect(screen.getByText(user.email)).toBeTruthy();
	});

	it('renders user not found when signed out', async () => {
		await renderWithProviders(<UserDetails />);
		expect(screen.getByTestId('no-user')).toBeVisible();
	});
});
