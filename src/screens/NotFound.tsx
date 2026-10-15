import { Button, Text } from '@react-navigation/elements';
import { Screen } from '../components/Screen';
import { useAppSelector } from '../app/hooks';

export function NotFound() {
	const isSignedIn = useAppSelector((state) => state.auth.user !== null);
	return (
		<Screen isCentered>
			<Text>404</Text>
			<Button screen={isSignedIn ? 'Main' : 'Login'}>{isSignedIn ? 'Go to Home' : 'Go to Login'}</Button>
		</Screen>
	);
}
