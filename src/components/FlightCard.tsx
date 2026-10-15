import { memo, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { radius, spacing } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import type { Flight } from '../types';
import { formatDuration, formatTime } from '../utils/date';
import { AppText } from './AppText';
import { FavoriteButton } from './FavoriteButton';
import { StatusBadge } from './StatusBadge';

interface Props {
	flight: Flight;
	onPress: (flight: Flight) => void;
	index?: number;
}

export const FlightCard = memo(function FlightCard({ flight, onPress, index = 0 }: Props) {
	const { colors } = useAppTheme();

	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(opacity, { toValue: 1, duration: 300, delay: Math.min(index, 6) * 50, useNativeDriver: true }).start();
	}, [opacity, index]);

	return (
		<Animated.View style={{ opacity, transform: [{ translateY: opacity.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }}>
			<Pressable
				testID={`flight-card-${flight.id}`}
				accessibilityRole='button'
				accessibilityLabel={`${flight.airline} ${flight.flightNumber}, departs ${formatTime(flight.departureTime)}, arrives ${formatTime(flight.arrivalTime)}`}
				onPress={() => onPress(flight)}
				style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border }, pressed && { opacity: 0.9 }]}
			>
				<View style={styles.row}>
					<View style={styles.flex}>
						<AppText variant='heading'>{flight.airline}</AppText>
						<AppText variant='caption' muted>
							{flight.flightNumber}
						</AppText>
					</View>
					<FavoriteButton flight={flight} />
				</View>

				<View style={styles.row}>
					<View>
						<AppText variant='title'>{formatTime(flight.departureTime)}</AppText>
						<AppText variant='label' muted>
							{flight.origin}
						</AppText>
					</View>
					<View style={styles.middle}>
						<AppText variant='caption' muted>
							{formatDuration(flight.durationMinutes)}
						</AppText>
						<View style={[styles.line, { backgroundColor: colors.border }]} />
					</View>
					<View style={styles.right}>
						<AppText variant='title'>{formatTime(flight.arrivalTime)}</AppText>
						<AppText variant='label' muted>
							{flight.destination}
						</AppText>
					</View>
				</View>

				<StatusBadge status={flight.status} />
			</Pressable>
		</Animated.View>
	);
});

const styles = StyleSheet.create({
	card: { borderWidth: 1, borderRadius: radius.lg, padding: spacing.lg, gap: 14 },
	row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	flex: { flex: 1 },
	middle: { flex: 1, alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md },
	line: { height: 2, alignSelf: 'stretch', borderRadius: 1 },
	right: { alignItems: 'flex-end' },
});
