import { useState } from 'react';
import { AppText } from '../components/AppText';
import { TextField } from '../components/TextField';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Screen } from '../components/Screen';
import { clearAuthError, login } from '../features/auth/authSlice';
import { Button } from '../components/Button';

// TEMP  demo user
const DEMO_EMAIL = 'demo@flightapp.dev';
const DEMO_PASSWORD = 'password123';

export function LoginScreen() {
	const [email, setEmail] = useState(DEMO_EMAIL);
	const [password, setPassword] = useState(DEMO_PASSWORD);
	const [formError, setFormError] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const { status, error } = useAppSelector((state) => state.auth);

	const resetErrors = () => {
		setFormError(null);
		if (error) dispatch(clearAuthError());
	};

	const onSubmit = () => {
		if (!email.trim() || !password) return setFormError('Enter your email and password');
		dispatch(login({ email, password }));
	};

	const errorMessage = formError ?? error;

	return (
		<Screen isScroll isKeyboard isCentered>
			<AppText style={{ fontSize: 24 }}>Login</AppText>

			<TextField
				label='Email'
				placeholder='Email'
				value={email}
				onChangeText={(value) => {
					setEmail(value);
					resetErrors();
				}}
				autoCapitalize='none'
				keyboardType='email-address'
			/>

			<TextField
				label='Password'
				placeholder='Password'
				value={password}
				onChangeText={(value) => {
					setPassword(value);
					resetErrors();
				}}
				secureTextEntry
			/>

			{errorMessage && <AppText style={{ color: 'red' }}>{errorMessage}</AppText>}

			<Button title='Sign in' loading={status === 'loading'} onPress={onSubmit} />

			<AppText>
				Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
			</AppText>
		</Screen>
	);
}
