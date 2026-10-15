import { Pressable, StyleSheet, Text, View } from 'react-native';
import { memo } from 'react';
import { RecentSearch } from '../types';
import { useAppTheme } from '../theme/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { formatSearch } from '../utils/recent-searches';
import { radius, spacing } from '../theme/colors';

interface Props {
	search: RecentSearch;
	onPress: (search: RecentSearch) => void;
}

const RecentSearchItem = memo(function RecentSearchItem({ search, onPress }: Props) {
	const { colors } = useAppTheme();
	return (
		<Pressable
			accessibilityRole='button'
			accessibilityLabel={`Use Recent search ${formatSearch(search)}`}
			onPress={() => onPress(search)}
			style={({ pressed }) => [styles.row, { backgroundColor: colors.card, borderColor: colors.border }, pressed && { opacity: 0.85 }]}
		>
			<Ionicons name='time-outline' size={20} color={colors.textMuted} />
			<AppText>{formatSearch(search)}</AppText>
		</Pressable>
	);
});

export default RecentSearchItem;

const styles = StyleSheet.create({
	row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1 },
	text: { flex: 1 },
});
