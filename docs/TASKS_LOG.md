# All tasks and logs planing for 3 days

## Day 1
- [x] Setup the project with expo and react native using the react navigation tabs
- [x] Setup the folder structure
- [x] setup the json- server as the backend
- [x] setup theme and navigation shell with 4 tabs (Home, Favorite, Profile, More)
- [x] add a mocked login and the LoginScreen 
- [x] config the api base url and the the axios setup with the timeout and error handling.
- [x] adding jest and instanbul coverage 
- [x] setup the types for the user and flights initial need types and interfaces 
- [x] adding the needed script for running the app, the server, the linting and tests

## Day 2
### Build the app features and screens
- [x] setup eslint and prettier
- [x] setup the redux toolkit and redux- persist for the state management
- [x] setup redux toolkit dev tools.
- [/] add tests setup for the redux store, slices and the api calls
- [x] setup the redux slices for the user and flights
- [x] add theme slices
- [x] add the home screen with search form and recent search default empty. When the user fills the search form navigate  to the SearchDetails screen
- [x] add the SearchDetails screen with the search results and the ability to save a flight to the favorites

### Recent search rules:
  - Each item shows the route and dates (for example, "TIA → FCO · 12 Oct – 15 Oct").
  - Tapping a recent search prefills the search form.
  - Newest searches appear at the top,
  - Limit the list to a reasonable number of items (for example, the last 10).
  - The list persists between app restarts.

### Favorite flights Screen
  - [x] show the favorite flights from the db and persisted
  - [x] the user can remove the favorite flight

### Flight details
- [x] Flight details
  - [x] The flight details screen is below the Favorite screen in navigation stack
  - [x] The user can tap a flight in the favorites list or from the search results to see its details
  - [x] flight details screen shows the flight route, dates, and status (on time, delayed, cancelled). The status is randomly generated for each flight.
  - [x] The user can tap a button to remove the flight from favorites.

### Profile and More screens
  - [x] Profile screen
    - [x] The profile screen shows the user's email,  and a logout button.
    - [x] dark mode toggle
  
  - [x] More screen
    - [x] Placeholder screens such as a sub-menu with several options, each leading to a placeholder (empty) screen. Examples are Settings, Help, About, and Contact.
    <!-- TODO later -->
    - [] The more screen shows the app version, a link to the GitHub repo, and a link to the API docs(if decided to host the server for public use and test in app testflight of ios or android).
    - [x] BONUS: add icons and a nice design for the more screen and the placeholder screens.

### Theme and dark mode
- [x] Theme
  - [x] The app has a light and dark theme, and the user can toggle between them in the profile screen.
  - [x] The theme should apply consistently across all screens, including navigation headers and the tab bar.
  - [x] BONUS: remember the user's theme choice and/or respect the system theme by default

## Day 3
Testing and polishing

## **BONUS**
  - [x] Add a "pull to refresh" feature on the search results.
  - [/] Add a "clear all" button for recent searches and favorites.
  - [] Add a "share flight details" feature that allows users to share flight information via social media or messaging apps.
  - [] Airport autocomplete in the origin and destination fields
  - [x] Animations or other polished UI details
  - [] Add unit tests for the redux slices and any utility functions.
  - [] Add integration tests for the main user flows, such as searching for flights, saving favorites, and toggling the theme.
  - [] Ensure that the tests cover edge cases, such as empty search results or network errors.