import { StyleSheet, View } from 'react-native';
import { radius, spacing, type AppColors } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import { STATUS_TONE, type FlightStatus } from '../types/flightStatuses';
import { AppText } from './AppText';

const toneColors = (colors: AppColors) => ({
	neutral: colors.textMuted,
	success: colors.success,
	info: colors.primary,
	warning: colors.warning,
	danger: colors.danger,
});

export function StatusBadge({ status }: { status: FlightStatus }) {
	const { colors } = useAppTheme();
	const tone = toneColors(colors)[STATUS_TONE[status]];

	return (
		<View style={[styles.badge, { borderColor: tone }]} accessibilityLabel={`Status: ${status}`}>
			<View style={[styles.dot, { backgroundColor: tone }]} />
			<AppText variant='label' style={{ color: tone }}>
				{status}
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		gap: 6,
		borderWidth: 1,
		borderRadius: radius.pill,
		paddingVertical: 3,
		paddingHorizontal: spacing.md,
	},
	dot: { width: 6, height: 6, borderRadius: 3 },
});
