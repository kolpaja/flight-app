export interface AppColors {
	background: string;
	card: string;
	text: string;
	textMuted: string;
	border: string;
	primary: string;
	onPrimary: string;
	danger: string;
	success: string;
	warning: string;
	inputBackground: string;
}

export const lightColors: AppColors = {
	background: '#F5F7FB',
	card: '#FFFFFF',
	text: '#0F172A',
	textMuted: '#5B6B82',
	border: '#E2E8F0',
	primary: '#2563EB',
	onPrimary: '#FFFFFF',
	danger: '#DC2626',
	success: '#15803D',
	warning: '#B45309',
	inputBackground: '#FFFFFF',
} as const satisfies AppColors;

export const darkColors: AppColors = {
	background: '#0A101D',
	card: '#131C2E',
	text: '#F1F5F9',
	textMuted: '#9AA9C0',
	border: '#24304A',
	primary: '#6EA8FF',
	onPrimary: '#0A101D',
	danger: '#F87171',
	success: '#4ADE80',
	warning: '#FBBF24',
	inputBackground: '#0F1828',
} as const satisfies AppColors;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 } as const;
