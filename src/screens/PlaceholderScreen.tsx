import { View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { AppText } from '../components/AppText';

const PlaceholderScreen = () => {
	const route = useRoute();

	return (
		<View>
			<AppText>PlaceholderScreen</AppText>
			<AppText>This {route.name} is a Placeholder Screen</AppText>
		</View>
	);
};

export default PlaceholderScreen;
