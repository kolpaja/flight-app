import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { useAppTheme } from '../theme/useAppTheme';

export function ProfileScreen() {
	const { colors } = useAppTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<AppText>ProfileScreen</AppText>
		</View>
	);
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
