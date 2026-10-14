import { Button, Text } from '@react-navigation/elements';
import { Screen } from '../components/Screen';

export function NotFound() {
	return (
		<Screen isCentered>
			<Text>404</Text>
			<Button screen='Main'>Go to Home</Button>
		</Screen>
	);
}
