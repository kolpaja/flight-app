import { Screen } from '../components/Screen';
import { EmptyView } from '../components/EmptyView';

const PlaceholderScreen = () => {
	return (
		<Screen isCentered>
			<EmptyView icon='airplane' title='Placeholder Screen' />
		</Screen>
	);
};

export default PlaceholderScreen;
