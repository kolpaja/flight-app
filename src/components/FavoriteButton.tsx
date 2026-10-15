import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import type { Flight } from '../types';
import { useFavorite } from '../hooks/useFavorite';

export function FavoriteButton({ flight }: { flight: Flight }) {
	const { colors } = useAppTheme();
	const { isFavorite, toggle } = useFavorite(flight);

	return (
		<Pressable
			onPress={toggle}
			hitSlop={10}
			accessibilityRole='button'
			accessibilityLabel={isFavorite ? `Remove ${flight.flightNumber} from favorites` : `Add ${flight.flightNumber} to favorites`}
			accessibilityState={{ selected: isFavorite }}
		>
			<Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? colors.danger : colors.textMuted} />
		</Pressable>
	);
}
