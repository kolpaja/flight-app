import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { StaticParamList, useNavigation } from '@react-navigation/native';
import { MoreStack } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { spacing } from '../theme/colors';

type MoreParamList = StaticParamList<typeof MoreStack>;

const MORE_TAB_SCREENS = ['Settings', 'Help', 'About', 'Contact'] as const satisfies readonly (keyof MoreParamList)[];

const MoreScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<MoreParamList>>();
	return (
		<View style={styles.container}>
			{MORE_TAB_SCREENS.map((name) => (
				<Pressable key={name} style={styles.row} onPress={() => navigation.navigate(name)}>
					<AppText>{name}</AppText>
				</Pressable>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { padding: spacing.lg, gap: spacing.sm },
	row: { padding: spacing.lg, borderRadius: spacing.sm, borderWidth: StyleSheet.hairlineWidth },
});

export default MoreScreen;
