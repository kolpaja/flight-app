import { View, FlatList, StyleSheet } from 'react-native';
import { generateFlights } from '../data/mockFlights';
import AppView from './AppView';
import { AppText } from './AppText';
import { formatDuration, formatTime } from '../utils/date';
import { spacing } from '../theme/colors';

const flights = generateFlights({ origin: 'TIA', destination: 'FCO', departDate: '2026-10-20', returnDate: '2026-10-25' });

const TempSampleFlights = () => {
	return (
		<View>
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
		</View>
	);
};

const styles = StyleSheet.create({
	list: { padding: spacing.lg, gap: spacing.sm },
	row: { gap: spacing.xs },
});

export default TempSampleFlights;
