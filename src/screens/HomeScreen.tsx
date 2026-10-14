import { FlatList, StyleSheet } from 'react-native';
import { AppText } from '../components/AppText';
import { generateFlights } from '../data/mockFlights';
import { formatDuration, formatTime } from '../utils/date';
import { spacing } from '../theme/colors';
import { Screen } from '../components/Screen';
import AppView from '../components/AppView';

const flights = generateFlights({ origin: 'TIA', destination: 'FCO', departDate: '2026-10-20', returnDate: '2026-10-25' });

const HomeScreen = () => {
	return (
		<Screen>
			<AppText style={{ textAlign: 'center' }}>HomeScreen </AppText>
			<AppText variant='caption'> Temp working list of flights search</AppText>
			<FlatList
				data={flights}
				keyExtractor={(flight) => flight.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<AppView style={{ padding: 12, gap: 4 }}>
						<AppText>
							{item.airline} {item.flightNumber}
						</AppText>
						<AppText>
							{formatTime(item.departureTime)} → {formatTime(item.arrivalTime)} ({formatDuration(item.durationMinutes)})
						</AppText>
						<AppText>
							{item.status} · Terminal {item.terminal} · Gate {item.gate}
						</AppText>
					</AppView>
				)}
			/>
		</Screen>
	);
};

const styles = StyleSheet.create({
	list: { padding: spacing.lg, gap: spacing.sm },
	row: { gap: spacing.xs },
});

export default HomeScreen;
