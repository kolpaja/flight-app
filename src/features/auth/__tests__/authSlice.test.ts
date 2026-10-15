import { authApi } from '../../../api/endpoints';
import { setupStore } from '../../../test/setupStore';
import reducer, { clearAuthError, login, logout } from '../authSlice';

const DEMO_EMAIL = 'demo@flightapp.dev';
const DEMO_PASSWORD = 'password123';
const user = { id: 1, name: 'Demo', email: 'demo@flightapp.dev' };

jest.mock('../../../api/endpoints', () => ({ authApi: { login: jest.fn() } }));

const mockLogin = jest.mocked(authApi.login);

const credentials = {
	email: DEMO_EMAIL,
	password: DEMO_PASSWORD,
};

// Testing Auth Slice Reducer
describe('authSlice reducer', () => {
	it('starts sign out', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({ user: null, status: 'idle', error: null });
	});

	it('logout clears the user', () => {
		const state = reducer({ user, status: 'succeeded', error: null }, logout());
		expect(state).toEqual({ user: null, status: 'idle', error: null });
	});

	it('clearAuthError just clears the error not the state', () => {
		const state = reducer({ user: null, status: 'failed', error: 'some error' }, clearAuthError());

		expect(state).toEqual({ user: null, status: 'failed', error: null });
	});
});

describe('login thunk', () => {
	beforeEach(() => mockLogin.mockReset());

	it('is loading while the request runs', async () => {
		mockLogin.mockResolvedValue(user);
		const store = setupStore();

		const promise = store.dispatch(login(credentials));
		expect(store.getState().auth.status).toEqual('loading');
		await promise;
	});

	it('stores the user on success', async () => {
		mockLogin.mockResolvedValue(user);
		const store = setupStore();

		await store.dispatch(login(credentials));

		expect(store.getState().auth).toEqual({ user, status: 'succeeded', error: null });
		expect(mockLogin).toHaveBeenCalledWith(credentials.email, credentials.password);
	});

	it('keeps the error message on failure', async () => {
		const errorMessage = 'Invalid email or password';

		mockLogin.mockRejectedValue(new Error(errorMessage));

		const store = setupStore();
		await store.dispatch(login(credentials));
		const { error, status, user: currentUser } = store.getState().auth;

		expect(currentUser).toBe(null);
		expect(error).toBe(errorMessage);
		expect(status).toBe('failed');
	});

	it('cache: clears earlier session when a new attempt starts', async () => {
		mockLogin.mockResolvedValue(user);

		const store = setupStore({ auth: { user, status: 'succeeded', error: null } });
		const promise = store.dispatch(login(credentials));

		expect(store.getState().auth.user).toBeNull();

		await promise;
	});
});
