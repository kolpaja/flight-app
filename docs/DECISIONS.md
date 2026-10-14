# All my project decisions

### 1. Expo instead of React Native CLI
Having this project as basic and i am not going to use any native packages for this project and i want to keep it simple to have it run on my phone without any extra project setup and i already have expo installed in my iphone and an android phone.
Trade-off: is that if i need any native modules outside the Expo ecosystem need a dev build which i can use xcode and android studio if needed.

### 2. json-server as the backend
I am using json-server as a mocked BE for this it gives a real REST API with persistence in about 10 minutes, so the networking layer is exercised against HTTP instead of in-memory fixtures.
Trade-off: is that there is no real auth, validation or relations. `db.json` is also mutated at runtime, so `db.seed.json` is kept as the source of truth and `api:reset` restores it.

### 3. Mock flight data is generated, not stored
`src/data/mockFlights.ts` builds flights with a seeded random generator from the `rand-seed` package. the search with criteria origin,destination and date is used to seed, so the same search always return the same flights.

### 4. Theme and colors
I am using a theme folder to store all the colors and fonts and spacing and other things that are used in the app. This is to keep the app consistent and easy to change the theme if needed(if time promises i will switch to NativeWind).

### 5. Redux Toolkit
I am using Redux Toolkit for state management and redux-persist to persist the state in the local storage. 