import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { StaticParamList, StaticScreenProps, useNavigation } from '@react-navigation/native';
import type { Flight, SearchCriteria } from '../types';
import { Screen } from '../components/Screen';
import { AppText } from '../components/AppText';
import { formatSearch } from '../utils/recent-searches';
import { HomeStack } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '../theme/useAppTheme';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchFlights } from '../features/flights/flightsSlice';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { spacing } from '../theme/colors';
import { EmptyView, ErrorView, LoadingView, Separator } from '../components/StatusView';
import { FlightCard } from '../components/FlightCard';
import { formatLongDate } from '../utils/date';

type Props = StaticScreenProps<SearchCriteria>;
type HomeParamList = StaticParamList<typeof HomeStack>;

const SearchResultScreen = ({ route }: Props) => {
	const { departDate, destination, origin, returnDate } = route.params;
	const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>();
	const { colors } = useAppTheme();
	const dispatch = useAppDispatch();

	const { flights, error, status } = useAppSelector((state) => state.flights);
	const [refreshing, setRefreshing] = useState(false);

	const load = useCallback(
		() => dispatch(searchFlights({ origin, departDate, destination, returnDate })),
		[dispatch, departDate, destination, origin, returnDate],
	);

	useEffect(() => {
		load();
	}, [load]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await load();
		setRefreshing(false);
	}, [load]);

	const openDetailsScreenWithFlight = useCallback(
		(flight: Flight) => {
			navigation.navigate('FlightDetails', { flight });
		},
		[navigation],
	);

	if (status === 'loading' && !refreshing) {
		return (
			<Centered>
				<LoadingView label='Searching flights...' />
			</Centered>
		);
	}

	if (status === 'failed') {
		return (
			<Centered>
				<ErrorView message={error ?? 'Search failed'} />
			</Centered>
		);
	}

	return (
		<FlatList
			testID='results-list'
			style={{ backgroundColor: colors.background }}
			contentContainerStyle={styles.content}
			data={flights}
			keyExtractor={(flight) => flight.id}
			renderItem={({ item, index }) => <FlightCard flight={item} index={index} onPress={openDetailsScreenWithFlight} />}
			ItemSeparatorComponent={Separator}
			ListHeaderComponent={
				<AppText muted style={styles.header}>
					{flights.length} flights · {formatLongDate(`${departDate}T00:00`)}
				</AppText>
			}
			ListEmptyComponent={<EmptyView title='No flights found' message='Try different dates or airports.' />}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} colors={[colors.primary]} />}
		/>
	);
};

function Centered({ children }: { children: ReactNode }) {
	const { colors } = useAppTheme();
	return <View style={[styles.centered, { backgroundColor: colors.background }]}>{children}</View>;
}

const styles = StyleSheet.create({
	centered: { flex: 1, justifyContent: 'center' },
	content: { padding: spacing.lg, paddingBottom: spacing.xl },
	header: { marginBottom: spacing.md },
});

export default SearchResultScreen;
