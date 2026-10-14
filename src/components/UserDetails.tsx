import { ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppText } from './AppText';
import AppView from './AppView';
import { logout } from '../features/auth/authSlice';
import { spacing } from '../theme/colors';
import { Button } from './Button';

const UserDetails = () => {
	const { user, status, error } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	if (status === 'loading') return <ActivityIndicator />;
	if (status === 'failed')
		return (
			<AppView>
				<AppText>{error}</AppText>
			</AppView>
		);

	if (!user && status === 'succeeded')
		return (
			<AppView>
				<AppText>User not found</AppText>
			</AppView>
		);

	return (
		<AppView style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', gap: spacing.lg, marginVertical: spacing.md }}>
			<AppView>
				<AppView style={{ flexDirection: 'row', gap: spacing.md }}>
					<AppText>Name:</AppText>
					<AppText variant='heading'>{user?.name}</AppText>
				</AppView>
				<AppView style={{ flexDirection: 'row', gap: spacing.md }}>
					<AppText>Email:</AppText>
					<AppText muted>{user?.email}</AppText>
				</AppView>
			</AppView>
			<Button variant='primary' onPress={() => dispatch(logout())} title='Log out' />
		</AppView>
	);
};

export default UserDetails;
