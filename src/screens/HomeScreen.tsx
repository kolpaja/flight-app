import { FlatList, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { spacing } from '../theme/colors';
import AppView from '../components/AppView';
import { StaticParamList, useNavigation } from '@react-navigation/native';
import { HomeStack } from '../navigation';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useCallback, useState } from 'react';
import SearchForm, { createDefaultCriteria } from '../components/SearchForm';
import { saveSearch } from '../features/searches/searchesSlice';
import { RecentSearch, SearchCriteria } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RecentSearchItem from '../components/RecentSearchItem';
import { EmptyView } from '../components/EmptyView';
import { MAX_SEARCHED_ITEMS } from '../utils/recent-searches';
import { Separator } from '../components/StatusView';

type HomeParamList = StaticParamList<typeof HomeStack>;

const HomeScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>();

	const dispatch = useAppDispatch();

	const userId = useAppSelector((state) => state.auth.user?.id);
	const recent = useAppSelector((state) => state.searches.items);

	const [draft, setDraft] = useState(createDefaultCriteria);

	const handleSubmit = useCallback(
		(criteria: SearchCriteria) => {
			if (userId !== undefined) dispatch(saveSearch({ userId, criteria }));
			navigation.navigate('SearchResults', criteria);
		},
		[dispatch, navigation, userId],
	);

	const preFill = useCallback((search: RecentSearch) => {
		setDraft({
			origin: search.origin,
			destination: search.destination,
			departDate: search.departDate,
			returnDate: search.returnDate,
		});
	}, []);

	return (
		<FlatList
			contentContainerStyle={styles.content}
			data={recent}
			keyExtractor={(item) => String(item.id)}
			keyboardShouldPersistTaps='handled'
			keyboardDismissMode='on-drag'
			ListHeaderComponent={
				<AppView style={styles.header}>
					<SearchForm value={draft} onChange={setDraft} onSubmit={handleSubmit} />
					<AppText variant='heading'>Recent searches:</AppText>
				</AppView>
			}
			renderItem={({ item }) => <RecentSearchItem search={item} onPress={preFill} />}
			ItemSeparatorComponent={Separator}
			ListEmptyComponent={<EmptyView icon='time-outline' title='No recent searches' message={`Your last ${MAX_SEARCHED_ITEMS} searches will show up here.`} />}
		/>
	);
};

const styles = StyleSheet.create({
	content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg },
	header: { gap: spacing.lg, marginBottom: spacing.md },
});

export default HomeScreen;
