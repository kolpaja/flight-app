import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { Navigation } from './navigation';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useAppTheme } from './theme/useAppTheme';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLoadUserData } from './hooks/useLoadUserData';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

const linking = {
	enabled: 'auto' as const,
	prefixes: [createURL('/')],
};

function ThemedApp() {
	const { navigationTheme, dark, colors } = useAppTheme();
	useLoadUserData();
	useEffect(() => {
		SystemUI.setBackgroundColorAsync(colors.background);
	}, [colors.background]);
	return (
		<>
			<StatusBar style={dark ? 'light' : 'dark'} />
			<Navigation
				theme={navigationTheme}
				linking={linking}
				onReady={() => {
					SplashScreen.hideAsync();
				}}
			/>
		</>
	);
}

export function App() {
	const [loaded, fontError] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });
	if (fontError) console.warn('Font load failed:', fontError);

	if (!loaded && !fontError) return null;

	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ThemedApp />
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
}
