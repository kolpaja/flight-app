import { StaticParamList, useNavigation } from '@react-navigation/native';
import { Screen } from '../components/Screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FavoritesStack } from '../navigation';
import { useAppSelector } from '../app/hooks';
import { selectFavoriteFlights } from '../features/favorites/favoritesSlice';
import { EmptyView, ErrorView, LoadingView, Separator } from '../components/StatusView';
import { FlatList } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import { spacing } from '../theme/colors';
import { useCallback } from 'react';
import { Flight } from '../types';
import { FlightCard } from '../components/FlightCard';

type FavoriteParamList = StaticParamList<typeof FavoritesStack>;

const FavoriteScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<FavoriteParamList>>();
	const { colors } = useAppTheme();

	const heartedFlights = useAppSelector(selectFavoriteFlights);
	const { status, error } = useAppSelector((state) => state.favorites);

	const openDetailsScreenWithFlight = useCallback(
		(flight: Flight) => {
			navigation.navigate('FlightDetails', { flight });
		},
		[navigation],
	);

	if (status === 'loading' || status === 'idle') {
		return (
			<Screen isCentered>
				<LoadingView />
			</Screen>
		);
	}
	if (status === 'failed') {
		return (
			<Screen isCentered>
				<ErrorView message={error ?? 'Failed to load favorite flights'} />
			</Screen>
		);
	}

	return (
		<FlatList
			style={{ backgroundColor: colors.background }}
			contentContainerStyle={[{ padding: spacing.lg }, heartedFlights.length === 0 && { flexGrow: 1 }]}
			data={heartedFlights}
			keyExtractor={(flight) => flight.id}
			renderItem={({ item, index }) => <FlightCard flight={item} index={index} onPress={openDetailsScreenWithFlight} />}
			ItemSeparatorComponent={Separator}
			ListEmptyComponent={
				<EmptyView icon='heart-outline' title='No favorites yet' message='Tap the heart on a flight to save it here. Tap it again to remove it.' />
			}
		/>
	);
};

export default FavoriteScreen;
