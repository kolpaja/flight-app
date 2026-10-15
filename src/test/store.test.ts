import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFavorite } from '../features/favorites/favoritesSlice';
import { login, logout } from '../features/auth/authSlice';
import { searchFlights } from '../features/flights/flightsSlice';
import { demoUser, makeFlight } from '../test/constants';

type StoreModule = typeof import('../app/store');
type DevGlobal = { __DEV__?: boolean };

const loaded: StoreModule[] = [];
const credentials = { email: 'demo@flightapp.dev', password: 'password123' };
const criteria = { origin: 'TIA', destination: 'FCO', departDate: '2026-10-20', returnDate: '2026-10-25' };

// A fresh copy of store.ts each time, so state and persistence never leak between tests.
const loadStore = (dev = true) => {
	const original = (globalThis as DevGlobal).__DEV__;
	(globalThis as DevGlobal).__DEV__ = dev;

	const enhancer = jest.fn(() => (createStore: unknown) => createStore);
	jest.doMock('redux-devtools-expo-dev-plugin', () => ({ __esModule: true, default: enhancer }));

	let mod!: StoreModule;
	jest.isolateModules(() => {
		mod = require('../app/store');
	});

	(globalThis as DevGlobal).__DEV__ = original;
	loaded.push(mod);
	return { ...mod, enhancer };
};

const bootstrapped = (persistor: StoreModule['persistor']) =>
	new Promise<void>((resolve) => {
		const check = () => {
			if (persistor.getState().bootstrapped) {
				unsubscribe();
				resolve();
			}
		};
		const unsubscribe = persistor.subscribe(check);
		check();
	});

// redux-persist saves each field as a JSON string inside a JSON object.
const readSaved = async (key: string) => {
	const raw = await AsyncStorage.getItem(key);
	return raw ? JSON.parse(raw) : null;
};

beforeEach(async () => {
	await AsyncStorage.clear();
});

afterEach(() => {
	loaded.splice(0).forEach(({ persistor }) => persistor.pause());
	jest.resetModules();
	jest.clearAllMocks(); // not resetAllMocks: that would wipe the AsyncStorage mock from jest.setup.ts
});

describe('initial state', () => {
	it('starts signed out, with the system theme and empty lists', async () => {
		const { store, persistor } = loadStore();
		await bootstrapped(persistor);

		const state = store.getState();
		expect(state.auth).toMatchObject({ user: null, status: 'idle', error: null });
		expect(state.theme.mode).toBe('system');
		expect(state.searches.items).toEqual([]);
		expect(state.favorites.items).toEqual([]);
		expect(state.flights.flights).toEqual([]);
	});
});

describe('persistence', () => {
	it('saves only the user from the auth slice', async () => {
		const { store, persistor } = loadStore();
		await bootstrapped(persistor);

		store.dispatch(login.fulfilled(demoUser, 'req', credentials));
		await persistor.flush();

		const saved = await readSaved('persist:auth');
		expect(JSON.parse(saved.user)).toEqual(demoUser);
		expect(saved).not.toHaveProperty('status');
		expect(saved).not.toHaveProperty('error');
	});

	it('restores a saved user on start', async () => {
		await AsyncStorage.setItem('persist:auth', JSON.stringify({ user: JSON.stringify(demoUser), _persist: JSON.stringify({ version: -1, rehydrated: true }) }));

		const { store, persistor } = loadStore();
		await bootstrapped(persistor);

		expect(store.getState().auth.user).toEqual(demoUser);
	});

	it('restores a saved theme mode on start', async () => {
		await AsyncStorage.setItem('persist:theme', JSON.stringify({ mode: JSON.stringify('light'), _persist: JSON.stringify({ version: -1, rehydrated: true }) }));

		const { store, persistor } = loadStore();
		await bootstrapped(persistor);

		expect(store.getState().theme.mode).toBe('light');
	});

	it('does not warn about redux-persist actions', async () => {
		const errors = jest.spyOn(console, 'error').mockImplementation(() => {});
		const { persistor } = loadStore();
		await bootstrapped(persistor);

		expect(errors).not.toHaveBeenCalled();
		errors.mockRestore();
	});
});

describe('logout', () => {
	it('resets the user data but keeps the theme choice', async () => {
		const { store, persistor } = loadStore();
		await bootstrapped(persistor);
		const flight = makeFlight('1');

		store.dispatch(login.fulfilled(demoUser, 'req', credentials));
		store.dispatch(addFavorite.fulfilled({ id: 10, userId: 1, flight }, 'req', { userId: 1, flight }));
		store.dispatch(searchFlights.pending('flights-1', criteria));
		store.dispatch(searchFlights.fulfilled([flight], 'flights-1', criteria));
		expect(store.getState().flights.flights).toHaveLength(1);

		store.dispatch(logout());

		const state = store.getState();
		expect(state.auth.user).toBeNull();
		expect(state.searches.items).toEqual([]);
		expect(state.favorites.items).toEqual([]);
		expect(state.flights.flights).toEqual([]);
		expect(state.theme.mode).toBe('dark');
	});
});

describe('devtools gating', () => {
	it('adds the enhancer in development', () => {
		const { enhancer } = loadStore(true);
		expect(enhancer).toHaveBeenCalledTimes(1);
	});

	it('leaves it out of release builds', () => {
		const { enhancer } = loadStore(false);
		expect(enhancer).not.toHaveBeenCalled();
	});
});
