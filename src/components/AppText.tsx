import { Text, type TextProps, type TextStyle } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';
import { fontFamily, fontSize } from '../theme/typography';

type Variant = 'title' | 'heading' | 'body' | 'caption' | 'label';

const VARIANTS: Record<Variant, TextStyle> = {
	title: { fontSize: fontSize.title, fontFamily: fontFamily.bold, letterSpacing: -0.4 },
	heading: { fontSize: fontSize.heading, fontFamily: fontFamily.semibold },
	body: { fontSize: fontSize.body, fontFamily: fontFamily.regular },
	caption: { fontSize: fontSize.caption, fontFamily: fontFamily.regular },
	label: { fontSize: fontSize.caption, fontFamily: fontFamily.semibold, letterSpacing: 0.3 },
};

interface Props extends TextProps {
	variant?: Variant;
	muted?: boolean;
}

export function AppText({ variant = 'body', muted = false, style, ...rest }: Props) {
	const { colors } = useAppTheme();
	return <Text {...rest} style={[VARIANTS[variant], { color: muted ? colors.textMuted : colors.text }, style]} />;
}
