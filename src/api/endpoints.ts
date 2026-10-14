import { User, UserRecord } from '../types';
import { http } from './http';

export const authApi = {
	async login(email: string, password: string): Promise<User> {
		const users = await http.get<UserRecord[]>(`/users?email=${encodeURIComponent(email.trim().toLowerCase())}`);

		const foundUser = users.find((user) => user.password === password);
		if (!foundUser) throw new Error('Invalid email or password');
		const { password: __omit, ...safeUser } = foundUser;
		return safeUser;
	},
};
