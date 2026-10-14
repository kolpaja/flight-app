import { Text, type TextProps, type TextStyle } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

type Variant = 'title' | 'heading' | 'body' | 'caption' | 'label';

const VARIANTS: Record<Variant, TextStyle> = {
	title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.4 },
	heading: { fontSize: 18, fontWeight: '600' },
	body: { fontSize: 16, fontWeight: '400' },
	caption: { fontSize: 13, fontWeight: '400' },
	label: { fontSize: 13, fontWeight: '600', letterSpacing: 0.3 },
};

interface Props extends TextProps {
	variant?: Variant;
	muted?: boolean;
}

export function AppText({ variant = 'body', muted = false, style, ...rest }: Props) {
	const { colors } = useAppTheme();
	return <Text {...rest} style={[VARIANTS[variant], { color: muted ? colors.textMuted : colors.text }, style]} />;
}
