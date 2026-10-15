import { Pressable, StyleSheet } from 'react-native';
import { AppText } from '../components/AppText';
import { StaticParamList, useNavigation } from '@react-navigation/native';
import { MoreStack } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { radius, spacing } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import { Screen } from '../components/Screen';
import AppView from '../components/AppView';
import { Ionicons } from '@expo/vector-icons';
import { IconName } from '../types';

type MoreParamList = StaticParamList<typeof MoreStack>;

const MORE_TAB_SCREENS: { name: Exclude<keyof MoreParamList, 'More'>; icon: IconName }[] = [
	{ name: 'Settings', icon: 'settings-outline' },
	{ name: 'Help', icon: 'help-circle-outline' },
	{ name: 'About', icon: 'information-circle-outline' },
	{ name: 'Contact', icon: 'mail-outline' },
];

const MoreScreen = () => {
	const { colors } = useAppTheme();
	const navigation = useNavigation<NativeStackNavigationProp<MoreParamList>>();
	return (
		<Screen style={styles.container}>
			{MORE_TAB_SCREENS.map(({ name, icon }) => (
				<Pressable
					key={name}
					accessibilityRole='button'
					onPress={() => navigation.navigate(name)}
					style={({ pressed }) => [styles.row, { backgroundColor: colors.card, borderColor: colors.border }, pressed && { opacity: 0.85 }]}
				>
					<AppView style={[styles.iconBox, { backgroundColor: colors.background }]}>
						<Ionicons name={icon} size={20} color={colors.primary} />
					</AppView>
					<AppText style={styles.label}>{name}</AppText>
					<Ionicons name='chevron-forward' size={20} color={colors.textMuted} />
				</Pressable>
			))}
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: spacing.lg, gap: spacing.sm },
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.md,
		padding: spacing.md,
		borderRadius: radius.md,
		borderWidth: StyleSheet.hairlineWidth,
	},
	iconBox: { width: 36, height: 36, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
	label: { flex: 1 },
});
export default MoreScreen;
