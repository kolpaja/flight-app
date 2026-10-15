import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { useAppTheme } from '../theme/useAppTheme';
import AppView from './AppView';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setThemeMode, type ThemeMode } from '../features/theme/themeSlice';
import { IconName } from '../types';
import { radius, spacing } from '../theme/colors';
import { AppText } from './AppText';

interface Option {
	mode: ThemeMode;
	label: string;
	icon: IconName;
	activeIcon: IconName;
}

const OPTIONS: Option[] = [
	{
		mode: 'system',
		label: 'System',
		icon: 'phone-portrait-outline',
		activeIcon: 'phone-portrait',
	},
	{ mode: 'light', label: 'Light', icon: 'sunny-outline', activeIcon: 'sunny' },
	{ mode: 'dark', label: 'Dark', icon: 'moon-outline', activeIcon: 'moon' },
];

export const ThemeSelector = () => {
	const { colors } = useAppTheme();
	const mode = useAppSelector((state) => state.theme.mode);
	const dispatch = useDispatch();

	return (
		<AppView style={styles.row}>
			{OPTIONS.map((option) => {
				const selected = option.mode === mode;
				const color = selected ? colors.onPrimary : colors.text;
				return (
					<Pressable
						key={option.mode}
						testID={`theme-${option.mode}`}
						accessibilityRole='radio'
						accessibilityState={{ selected }}
						onPress={() => dispatch(setThemeMode(option.mode))}
						style={[
							styles.option,
							{
								backgroundColor: selected ? colors.primary : colors.card,
								borderColor: selected ? colors.primary : colors.border,
							},
						]}
					>
						<Ionicons name={selected ? option.activeIcon : option.icon} size={24} color={color} />
						<AppText variant='label' style={{ color }}>
							{option.label}
						</AppText>
					</Pressable>
				);
			})}
		</AppView>
	);
};

const styles = StyleSheet.create({
	row: { flexDirection: 'row', gap: spacing.md },
	option: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: spacing.md,
		gap: spacing.xs,
		borderRadius: radius.md,
		borderWidth: 1,
	},
});
