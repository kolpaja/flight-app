import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import { AppColors, darkColors, lightColors } from './colors';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

export interface AppTheme {
	dark: boolean;
	colors: AppColors;
	navigationTheme: Theme;
}

export function useAppTheme(): AppTheme {
	//TODO Temp for now, adding the selector after redux setup
	const dark = useColorScheme() === 'dark';

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
