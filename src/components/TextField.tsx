import { forwardRef } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { radius } from '../theme/colors';
import { useAppTheme } from '../theme/useAppTheme';
import { AppText } from './AppText';

interface Props extends TextInputProps {
	label: string;
	error?: string;
}

export const TextField = forwardRef<TextInput, Props>(function TextField({ label, error, style, ...rest }, ref) {
	const { colors } = useAppTheme();
	return (
		<View style={styles.wrapper}>
			<AppText variant='label' muted>
				{label}
			</AppText>
			<TextInput
				ref={ref}
				accessibilityLabel={label}
				placeholderTextColor={colors.textMuted}
				{...rest}
				style={[
					styles.input,
					{
						color: colors.text,
						backgroundColor: colors.inputBackground,
						borderColor: error ? colors.danger : colors.border,
					},
					style,
				]}
			/>
			{error ? (
				<AppText variant='caption' style={{ color: colors.danger }} accessibilityLiveRegion='polite'>
					{error}
				</AppText>
			) : null}
		</View>
	);
});

const styles = StyleSheet.create({
	wrapper: { gap: 6 },
	input: {
		minHeight: 50,
		borderWidth: 1,
		borderRadius: radius.md,
		paddingHorizontal: 14,
		fontSize: 16,
	},
});
