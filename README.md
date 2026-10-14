# Flight App

A React Native (Expo) app for searching flights, viewing flight status, and saving favorites. It talks to a local `json-server` REST API.

## Tech stack

- Expo SDK 57, React Native 0.86, React 19, TypeScript
- React Navigation (bottom tabs + native stacks)
- Redux Toolkit, react-redux, redux-persist
- json-server as a local mock backend
- Jest, jest-expo and React Native Testing Library

## Prerequisites

- Node.js 20 or newer and npm
- Expo Go on a phone, or an Android emulator / iOS simulator

## Setup

```bash
npm install
```

## Run

The app needs two processes, so use two terminals.

```bash
# Terminal 1: mock API on port 3000
npm run api

# Terminal 2: Expo dev server
npm start          # then press a (Android), i (iOS) or w (web)
```

Other scripts:

| Script              | Purpose                             |
| ------------------- | ----------------------------------- |
| `npm run android`   | Start Expo and open on Android      |
| `npm run ios`       | Start Expo and open on iOS          |
| `npm run api:reset` | Reset `db.json` from `db.seed.json` |
| `npm run typecheck` | Run `tsc --noEmit`                  |
| `npm test`          | Run the Jest suite                  |

### API URL

`src/api/config.ts` resolves the API base URL in this order:

1. `EXPO_PUBLIC_API_URL` environment variable, if set
2. The host of the Expo dev server, on port 3000, so a physical device on the same Wi-Fi works with no config
3. `10.0.2.2:3000` on the Android emulator, `localhost:3000` otherwise

### Demo login

- Email: `demo@flightapp.dev`
- Password: `password123`

## Project structure

```
App.tsx                   Providers
db.json db.seed.json      Mock API data
src/
  api/                    Networking layer
  app/                    Redux store and persistence
  components/             Reusable UI components
  data/                   Mock flight data generator
  features/<name>/        Redux slices,selectors, thunks and components for a feature
  navigation/             React Navigation stacks and tabs
  screens/                Screens for each route
  theme/                  Colors, fonts, spacing, etc.
  types/                  TypeScript types
  utils/                  Utility functions
```

## Architecture decisions and trade-offs

**Expo (managed workflow).** There is no native setup, and the app runs on a phone through Expo Go.
The trade-off is that native modules outside the Expo ecosystem need a dev build.

**json-server as the backend.** It gives a real REST API with persistence in about 10 minutes, so the networking layer is exercised against HTTP instead of in-memory fixtures.
The trade-off is that there is no real auth, validation or relations. `db.json` is also mutated at runtime, so `db.seed.json` is kept as the source of truth and `api:reset` restores it.

**Mock flight data is generated, not stored.**
`src/data/mockFlights.ts` builds flights with a seeded random generator from the `rand-seed` package. the search with criteria origin,destination and date is used to seed, so the same search always return the same flights.
The trade-off is that the data is fake, but it is enough to test the app.
