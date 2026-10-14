import { AxiosError, create } from 'axios';
import { API_URL } from './config';

const TIMEOUT_MS = 8000;

const client = create({
	baseURL: API_URL,
	timeout: TIMEOUT_MS,
	headers: { 'Content-Type': 'application/json' },
});

function toError(error: unknown): Error {
	if (error instanceof AxiosError) {
		if (error.response) return new Error(`Request failed with the status: ${error.response.status}`);
		return new Error(`Can not reach the server API at ${API_URL}. [INFO]: Check is the 'npm run api' running?`);
	}
	return error instanceof Error ? error : new Error('Unknown error');
}

export const http = {
	get: async <T>(path: string): Promise<T> => {
		try {
			return (await client.get<T>(path)).data;
		} catch (error) {
			throw toError(error);
		}
	},
	post: async <T>(path: string, body: unknown): Promise<T> => {
		try {
			return (await client.post<T>(path, body)).data;
		} catch (error) {
			throw toError(error);
		}
	},
	delete: async (path: string): Promise<unknown> => {
		try {
			return (await client.delete(path)).data;
		} catch (error) {
			throw toError(error);
		}
	},
};
