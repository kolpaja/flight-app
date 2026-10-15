import { AppText } from '../components/AppText';
import UserDetails from '../components/UserDetails';
import { Screen } from '../components/Screen';
import AppView from '../components/AppView';
import { spacing } from '../theme/colors';
import { useAppDispatch } from '../app/hooks';
import { Button } from '../components/Button';
import { logout } from '../features/auth/authSlice';
import { ThemeSelector } from '../components/ThemeSelector';

export function ProfileScreen() {
	const dispatch = useAppDispatch();

	return (
		<Screen>
			<AppText style={{ textAlign: 'center' }}>ProfileScreen</AppText>

			<AppView style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', gap: spacing.lg, marginVertical: spacing.md }}>
				<UserDetails />
				<ThemeSelector />
				<Button variant='primary' onPress={() => dispatch(logout())} title='Log out' testID='logout-btn' />
			</AppView>
		</Screen>
	);
}
