import { ReactElement } from 'react';
import type { RootState } from '../app/rootReducers';
import { setupStore, TestStore } from './setupStore';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';

interface Options {
	preloadedState?: Partial<RootState>;
	store?: TestStore;
}

export async function renderWithProviders(ui: ReactElement, { preloadedState, store = setupStore(preloadedState) }: Options = {}) {
	const utils = await render(<Provider store={store}>{ui}</Provider>);

	return { store, ...utils };
}
