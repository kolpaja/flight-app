/// <reference types="jest" />
// AsyncStorage needs a mock in Jest (there is no native module). Its package ships an official one.
// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

// Icons load fonts asynchronously, which triggers act() warnings. Components only need a placeholder in unit tests.
jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));
jest.mock('redux-devtools-expo-dev-plugin', () => ({
	__esModule: true,
	default: () => (createStore: unknown) => createStore,
}));
jest.mock('@react-native-community/datetimepicker', () => ({
	__esModule: true,
	default: () => null,
	DateTimePickerAndroid: { open: jest.fn() },
}));
