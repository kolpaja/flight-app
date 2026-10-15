import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { spacing } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import type { IconName } from '../types';
import { AppText } from './AppText';
import AppView from './AppView';

interface EmptyViewProps {
	icon: IconName;
	title: string;
	message?: string;
}

export function EmptyView({ icon, title, message }: EmptyViewProps) {
	const { colors } = useAppTheme();

	return (
		<AppView style={styles.center}>
			<Ionicons name={icon} size={40} color={colors.textMuted} />
			<AppText variant='heading'>{title}</AppText>
			{message ? (
				<AppText muted style={styles.message}>
					{message}
				</AppText>
			) : null}
		</AppView>
	);
}

const styles = StyleSheet.create({
	center: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
	message: { textAlign: 'center' },
});
