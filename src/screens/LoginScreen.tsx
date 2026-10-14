import { useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AppText } from '../components/AppText';
import { TextField } from '../components/TextField';
import { spacing } from '../theme/colors';

interface Props {
	onLogin: () => void;
}

// TEMP  demo user
const DEMO_EMAIL = 'demo@flightapp.dev';
const DEMO_PASSWORD = 'password123';

export function LoginScreen({ onLogin }: Props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const submit = () => {
		if (!email.trim() || !password) return setError('Enter your email and password');
		if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
			return setError('Invalid email or password');
		}
		setError(null);
		// TODO when the redux is added
		// onLogin();
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1, justifyContent: 'center', padding: spacing.lg, gap: spacing.md }}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing.lg, gap: spacing.md }}
				keyboardShouldPersistTaps='handled'
				keyboardDismissMode='on-drag'
			>
				<AppText style={{ fontSize: 24 }}>Login</AppText>

				<TextField label='Email' placeholder='Email' value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' />

				<TextField label='Password' placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />

				{error && <AppText style={{ color: 'red' }}>{error}</AppText>}
				<Button title='Sign in' onPress={submit} />
				<AppText>
					Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
				</AppText>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
