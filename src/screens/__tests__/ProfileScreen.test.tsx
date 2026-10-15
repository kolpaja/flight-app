import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithProviders } from '../../test/renderWithProviders';
import { ProfileScreen } from '../ProfileScreen';

const user = { id: 1, name: 'Demo User', email: 'demo@flightapp.dev' };

describe('ProfileScreen', () => {
	it('logs out when the btn is pressed', async () => {
		const { store } = await renderWithProviders(<ProfileScreen />, {
			preloadedState: { auth: { user, status: 'succeeded', error: null } },
		});

		await fireEvent.press(screen.getByTestId('logout-btn'));
		expect(store.getState().auth.user).toBe(null);
	});
});
