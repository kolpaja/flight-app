export function validateLogin(email: string, password: string): { email?: string; password?: string } {
	const errors: { email?: string; password?: string } = {};
	if (!email.trim()) errors.email = 'Enter your email or username';
	if (!password) errors.password = 'Enter your password';
	return errors;
}
