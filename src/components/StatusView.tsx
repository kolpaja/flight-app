import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { spacing } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import type { IconName } from '../types';
import { AppText } from './AppText';
import { Button } from './Button';

export function LoadingView({ label = 'Loading…' }: { label?: string }) {
	const { colors } = useAppTheme();
	return (
		<View style={styles.center} accessibilityLiveRegion='polite'>
			<ActivityIndicator size='large' color={colors.primary} />
			<AppText muted>{label}</AppText>
		</View>
	);
}

export function EmptyView({ icon = 'airplane-outline', title, message }: { icon?: IconName; title: string; message?: string }) {
	const { colors } = useAppTheme();
	return (
		<View style={styles.center}>
			<Ionicons name={icon} size={40} color={colors.textMuted} />
			<AppText variant='heading'>{title}</AppText>
			{message ? (
				<AppText muted style={styles.text}>
					{message}
				</AppText>
			) : null}
		</View>
	);
}

export function ErrorView({ message, onRetry }: { message: string; onRetry?: () => void }) {
	const { colors } = useAppTheme();
	return (
		<View style={styles.center}>
			<Ionicons name='cloud-offline-outline' size={40} color={colors.danger} />
			<AppText variant='heading'>Something went wrong</AppText>
			<AppText muted style={styles.text}>
				{message}
			</AppText>
			{onRetry ? <Button title='Try again' variant='secondary' onPress={onRetry} /> : null}
		</View>
	);
}

export const Separator = () => <View style={{ height: spacing.sm }} />;

const styles = StyleSheet.create({
	center: { alignItems: 'center', justifyContent: 'center', gap: spacing.sm, padding: spacing.xl },
	text: { textAlign: 'center' },
});
