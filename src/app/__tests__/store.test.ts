import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreModule = typeof import('../store');
type DevGlobal = { __DEV__?: boolean };

const user = { id: 1, name: 'Demo User', email: 'demo@flightapp.dev' };
const loaded: StoreModule[] = [];

const loadStore = (dev = true) => {
	const original = (globalThis as DevGlobal).__DEV__;
	(globalThis as DevGlobal).__DEV__ = dev;

	const enhancer = jest.fn(() => (createStore: unknown) => createStore);
	jest.doMock('redux-devtools-expo-dev-plugin', () => ({ __esModule: true, default: enhancer }));

	let mod!: StoreModule;

	jest.isolateModules(() => {
		mod = require('../store');
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

beforeEach(async () => {
	await AsyncStorage.clear();
});

afterEach(() => {
	loaded.splice(0).forEach(({ persistor }) => persistor.pause());
	jest.resetModules();
	jest.resetAllMocks();
});

describe('store', () => {
	it('starts signed out', async () => {
		const { store, persistor } = loadStore();
		await bootstrapped(persistor);

		expect(store.getState().auth).toMatchObject({ user: null, status: 'idle', error: null });
	});
});
