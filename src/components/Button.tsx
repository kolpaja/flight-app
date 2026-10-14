import { ActivityIndicator, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { radius } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import { AppText } from './AppText';

interface Props {
	title: string;
	onPress: () => void;
	variant?: 'primary' | 'secondary' | 'danger';
	loading?: boolean;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}

export function Button({ title, onPress, variant = 'primary', loading = false, disabled = false, style, testID }: Props) {
	const { colors } = useAppTheme();
	const isDisabled = disabled || loading;

	const background = variant === 'primary' ? colors.primary : variant === 'danger' ? colors.danger : 'transparent';
	const textColor = variant === 'secondary' ? colors.primary : variant === 'danger' ? '#FFFFFF' : colors.onPrimary;

	return (
		<Pressable
			testID={testID}
			accessibilityRole='button'
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			disabled={isDisabled}
			onPress={onPress}
			style={({ pressed }) => [
				styles.base,
				{ backgroundColor: background, borderColor: variant === 'secondary' ? colors.border : background },
				pressed && { opacity: 0.85 },
				isDisabled && { opacity: 0.55 },
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator color={textColor} />
			) : (
				<AppText variant='heading' style={{ color: textColor }}>
					{title}
				</AppText>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		minHeight: 50,
		borderRadius: radius.md,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
});
