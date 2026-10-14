import { Pressable, StyleSheet } from 'react-native';
import { AppText } from '../components/AppText';
import { StaticParamList, useNavigation } from '@react-navigation/native';
import { MoreStack } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { spacing } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import { Screen } from '../components/Screen';

type MoreParamList = StaticParamList<typeof MoreStack>;

const MORE_TAB_SCREENS = ['Settings', 'Help', 'About', 'Contact'] as const satisfies readonly (keyof MoreParamList)[];

const MoreScreen = () => {
	const { colors } = useAppTheme();
	const navigation = useNavigation<NativeStackNavigationProp<MoreParamList>>();
	return (
		<Screen style={styles.container}>
			{MORE_TAB_SCREENS.map((name) => (
				<Pressable
					key={name}
					style={[
						styles.row,
						{
							backgroundColor: colors.background,
							borderColor: colors.border,
						},
					]}
					onPress={() => navigation.navigate(name)}
				>
					<AppText>{name}</AppText>
				</Pressable>
			))}
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: spacing.lg, gap: spacing.sm },
	row: { padding: spacing.lg, borderRadius: spacing.sm, borderWidth: StyleSheet.hairlineWidth },
});

export default MoreScreen;
