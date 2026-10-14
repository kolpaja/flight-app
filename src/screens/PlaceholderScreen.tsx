import { useRoute } from '@react-navigation/native';
import { AppText } from '../components/AppText';
import { Screen } from '../components/Screen';

const PlaceholderScreen = () => {
	const route = useRoute();

	return (
		<Screen isCentered>
			<AppText>PlaceholderScreen</AppText>
			<AppText>This {route.name} is a Placeholder Screen</AppText>
		</Screen>
	);
};

export default PlaceholderScreen;
