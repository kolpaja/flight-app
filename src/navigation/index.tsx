import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createBottomTabScreen } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, createNativeStackScreen } from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import MoreScreen from '../screens/MoreScreen';
import { NotFound } from '../screens/NotFound';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useAppSelector } from '../app/hooks';
import SearchResultScreen from '../screens/SearchResultScreen';
import FlightDetailsScreen from '../screens/FlightDetailsScreen';

// ? Sync and Check the signed-in user from persisted state
const useIsSignedIn = () => useAppSelector((state) => state.auth.user !== null);
const useIsSignedOut = () => !useIsSignedIn();

const FlightDetails = createNativeStackScreen({
	screen: FlightDetailsScreen,
	options: ({ route }) => ({ title: route.params.flight.flightNumber }),
});

export const HomeStack = createNativeStackNavigator({
	screens: {
		Home: createNativeStackScreen({ screen: HomeScreen, options: { title: 'Search Flights' } }),
		SearchResults: createNativeStackScreen({
			screen: SearchResultScreen,
			options: ({ route }) => ({ title: `${route.params.origin} -> ${route.params.destination}` }),
		}),
		FlightDetails,
	},
});

export const FavoritesStack = createNativeStackNavigator({
	screens: {
		Favorites: createNativeStackScreen({ screen: FavoriteScreen, options: { title: 'Favorites' } }),
		FlightDetails,
	},
});

const ProfileStack = createNativeStackNavigator({
	screens: {
		Profile: createNativeStackScreen({ screen: ProfileScreen, options: { title: 'Profile', headerShown: false } }),
	},
});

export const MoreStack = createNativeStackNavigator({
	screens: {
		More: createNativeStackScreen({ screen: MoreScreen }),
		Settings: createNativeStackScreen({ screen: PlaceholderScreen }),
		Help: createNativeStackScreen({ screen: PlaceholderScreen }),
		About: createNativeStackScreen({ screen: PlaceholderScreen }),
		Contact: createNativeStackScreen({ screen: PlaceholderScreen }),
	},
});

const MainTabs = createBottomTabNavigator({
	screenOptions: { headerShown: false },
	screens: {
		HomeTab: createBottomTabScreen({
			screen: HomeStack,
			options: {
				title: 'Home',
				tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />,
			},
		}),
		FavoritesTab: createBottomTabScreen({
			screen: FavoritesStack,
			options: {
				title: 'Favorites',
				tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />,
			},
		}),
		ProfileTab: createBottomTabScreen({
			screen: ProfileStack,
			options: {
				title: 'Profile',
				tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />,
			},
		}),
		MoreTab: createBottomTabScreen({
			screen: MoreStack,
			options: {
				title: 'More',
				tabBarIcon: ({ focused, color, size }) => (
					<Ionicons name={focused ? 'ellipsis-horizontal-circle' : 'ellipsis-horizontal-circle-outline'} size={size} color={color} />
				),
			},
		}),
	},
});

const RootStack = createNativeStackNavigator({
	screenOptions: { headerShown: false },
	groups: {
		SignedIn: {
			if: useIsSignedIn,
			screens: {
				Main: createNativeStackScreen({ screen: MainTabs }),
			},
		},
		SignedOut: {
			if: useIsSignedOut,
			screens: {
				Login: createNativeStackScreen({ screen: LoginScreen }),
			},
		},
	},
	screens: {
		NotFound: createNativeStackScreen({ screen: NotFound, options: { title: '404', headerShown: true }, linking: { path: '*' } }),
	},
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface RootNavigator extends RootStackType {}
}
