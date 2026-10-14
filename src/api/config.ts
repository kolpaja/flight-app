import Constants from 'expo-constants';
import { Platform } from 'react-native';

const PORT = 3000;

export function getBaseUrl(): string {
	const fromEnvFile = process.env.EXPO_PUBLIC_API_URL;
	if (fromEnvFile) {
		return fromEnvFile;
	}

	const host = Constants.expoConfig?.hostUri?.split(':')[0];
	if (host) return `http://${host}:${PORT}`;

	return Platform.OS === 'android' ? `http://10.0.2.2:${PORT}` : `http://localhost:${PORT}`;
}

export const API_URL = getBaseUrl();
