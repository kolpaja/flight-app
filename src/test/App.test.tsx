import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { useLoadUserData } from '../hooks/useLoadUserData';
import { store } from '../app/store';
import { logout } from '../features/auth/authSlice';
import '../App';

let mockFontState: [boolean, Error | null] = [true, null];
let mockNavProps: { theme?: unknown; linking?: unknown; onReady?: () => void } | undefined;
let mockStatusBarProps: { style?: string } | undefined;
let mockDark = false;

jest.mock('@expo-google-fonts/inter', () => ({
	useFonts: () => mockFontState,
	Inter_400Regular: 'regular',
	Inter_600SemiBold: 'semibold',
	Inter_700Bold: 'bold',
}));

jest.mock('expo-asset', () => ({ Asset: { loadAsync: jest.fn() } }));
jest.mock('expo-splash-screen', () => ({ preventAutoHideAsync: jest.fn(), hideAsync: jest.fn() }));
jest.mock('expo-linking', () => ({ createURL: jest.fn(() => 'flightapp:///') }));
jest.mock('@react-navigation/elements', () => ({ Assets: ['icon-1', 'icon-2'] }));
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
jest.mock('../hooks/useLoadUserData', () => ({ useLoadUserData: jest.fn() }));
jest.mock('expo-status-bar', () => ({
	StatusBar: (props: { style?: string }) => {
		mockStatusBarProps = props;
		return null;
	},
}));

jest.mock('../theme/useAppTheme', () => ({
	useAppTheme: () => ({ dark: mockDark, navigationTheme: { marker: 'theme' }, colors: {} }),
}));

jest.mock('../navigation', () => {
	const React = require('react');
	const { Text } = require('react-native');
	const { useAppSelector } = require('../app/hooks');
	return {
		Navigation: (props: { onReady?: () => void }) => {
			mockNavProps = props;
			const user = useAppSelector((state: { auth: { user: unknown } }) => state.auth.user);
			React.useEffect(() => props.onReady?.(), []);
			return React.createElement(Text, { testID: 'navigation' }, user ? 'signed-in' : 'signed-out');
		},
	};
});

const importTime = {
	preventAutoHide: (SplashScreen.preventAutoHideAsync as jest.Mock).mock.calls.length,
	assets: (Asset.loadAsync as jest.Mock).mock.calls[0]?.[0],
};

beforeEach(() => {
	mockFontState = [true, null];
	mockDark = false;
	mockNavProps = undefined;
	mockStatusBarProps = undefined;
	(SplashScreen.hideAsync as jest.Mock).mockClear();
	(useLoadUserData as jest.Mock).mockClear();
});

afterEach(() => {
	store.dispatch(logout());
});

describe('App Startup ok', () => {
	it('keeps the splash screen and preloads the navigation assets on import', () => {
		expect(importTime.preventAutoHide).toBe(1);
		expect(importTime.assets).toEqual(['icon-1', 'icon-2']);
	});
});
