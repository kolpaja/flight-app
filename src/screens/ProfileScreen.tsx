import { AppText } from '../components/AppText';
import UserDetails from '../components/UserDetails';
import { Screen } from '../components/Screen';

export function ProfileScreen() {
	return (
		<Screen>
			<AppText style={{ textAlign: 'center' }}>ProfileScreen</AppText>

			<UserDetails />
		</Screen>
	);
}
