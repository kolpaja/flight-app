import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Screen } from '../components/Screen';
import { StaticScreenProps } from '@react-navigation/native';
import { Flight } from '../types';
import { AppText } from '../components/AppText';
import { useAppTheme } from '../theme/useAppTheme';
import { useFavorite } from '../hooks/useFavorite';
import { radius, spacing } from '../theme/colors';
import { FavoriteButton } from '../components/FavoriteButton';
import { StatusBadge } from '../components/StatusBadge';
import { formatDuration, formatTime, formatLongDate } from '../utils/date';
import { airportLabel } from '../data/airports';
import { Button } from '../components/Button';

type Props = StaticScreenProps<{ flight: Flight }>;

function FlightPart({ label, time, airport }: { label: string; time: string; airport: string }) {
	return (
		<View style={styles.leg}>
			<AppText variant='label' muted>
				{label.toUpperCase()}
			</AppText>
			<AppText variant='title'>{time}</AppText>
			<AppText>{airport}</AppText>
		</View>
	);
}
const FlightDetailsScreen = ({ route }: Props) => {
	const { flight } = route.params;
	const { colors } = useAppTheme();
	const { isFavorite, toggle } = useFavorite(flight);

	const contentRows = [
		['Aircraft', flight.aircraft],
		['Terminal', flight.terminal],
		['Gate', flight.gate],
		['Duration', formatDuration(flight.durationMinutes)],
		['Date', formatLongDate(flight.departureTime)],
	];

	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.titleRow}>
				<View style={styles.flex}>
					<AppText variant='title'>{flight.flightNumber}</AppText>
					<AppText muted>{flight.airline}</AppText>
				</View>
				<FavoriteButton flight={flight} />
			</View>

			<StatusBadge status={flight.status} />

			<View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
				<FlightPart label='Departure' time={formatTime(flight.departureTime)} airport={airportLabel(flight.origin)} />
				<View style={[styles.divider, { backgroundColor: colors.border }]} />
				<FlightPart label='Arrival' time={formatTime(flight.arrivalTime)} airport={airportLabel(flight.destination)} />
			</View>

			<View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
				{contentRows.map(([label, value], index) => (
					<View key={label} style={[styles.detailRow, index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border }]}>
						<AppText muted>{label}</AppText>
						<AppText variant='heading' style={styles.value}>
							{value}
						</AppText>
					</View>
				))}
			</View>

			<Button variant={isFavorite ? 'danger' : 'primary'} title={isFavorite ? 'Remove from favorites' : 'Add to favorites'} onPress={toggle} />
		</ScrollView>
	);
};

export default FlightDetailsScreen;

const styles = StyleSheet.create({
	flex: { flex: 1 },
	content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
	titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
	card: { borderWidth: 1, borderRadius: radius.lg, paddingHorizontal: spacing.lg },
	leg: { paddingVertical: spacing.lg, gap: 2 },
	divider: { height: StyleSheet.hairlineWidth },
	detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
	value: { fontSize: 16 },
});
