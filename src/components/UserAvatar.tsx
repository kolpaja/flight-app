import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { useAppTheme } from '../theme/useAppTheme';
import { radius } from '../theme/colors';
import { fontFamily } from '../theme/typography';

interface Props {
	name: string;
	size?: number;
}

export function Avatar({ name, size = 120 }: Props) {
	const { colors } = useAppTheme();
	const initial = name.trim().charAt(0).toUpperCase() || '?';

	return (
		<View
			style={[styles.circle, { width: size, height: size, borderRadius: radius.pill, backgroundColor: colors.primary }]}
			accessibilityRole='image'
			accessibilityLabel={`Avatar for ${name}`}
		>
			<AppText style={{ color: colors.onPrimary, fontSize: size * 0.4, lineHeight: size * 0.5, fontFamily: fontFamily.semibold }}>{initial}</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	circle: { alignItems: 'center', justifyContent: 'center' },
});
