import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import { AppColors, darkColors, lightColors } from './colors';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

export interface AppTheme {
	dark: boolean;
	colors: AppColors;
	navigationTheme: Theme;
}

export function useAppTheme(): AppTheme {
	const mode = useAppSelector((state) => state.theme.mode);
	const systemTheme = useColorScheme();
	const dark = mode === 'system' ? systemTheme === 'dark' : mode === 'dark';

	return useMemo(() => {
		const colors = dark ? darkColors : lightColors;
		const base = dark ? DarkTheme : DefaultTheme;
		const navigationTheme: Theme = {
			...base,
			dark,
			colors: {
				...base.colors,
				primary: colors.primary,
				background: colors.background,
				card: colors.card,
				text: colors.text,
				border: colors.border,
				notification: colors.danger,
			},
		};
		return { dark, colors, navigationTheme };
	}, [dark]);
}
