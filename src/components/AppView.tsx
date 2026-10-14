import { StyleSheet, View, ViewProps } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import { radius } from '../theme/colors';

type Surface = 'background' | 'card';

interface Props extends ViewProps {
	surface?: Surface;
	bordered?: boolean;
}

export default function AppView({ surface = 'background', bordered = false, style, ...rest }: Props) {
	const { colors } = useAppTheme();
	return (
		<View
			{...rest}
			style={[
				{
					backgroundColor: colors[surface],
				},
				bordered && {
					borderColor: colors.border,
					borderWidth: StyleSheet.hairlineWidth,
					borderRadius: radius.sm,
				},
				style,
			]}
		/>
	);
}
