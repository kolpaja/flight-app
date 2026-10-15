import { useAppSelector } from '../app/hooks';
import { AppText } from './AppText';
import AppView from './AppView';
import { spacing } from '../theme/colors';
import { Avatar } from './UserAvatar';

const UserDetails = () => {
	const user = useAppSelector((state) => state.auth.user);

	if (!user)
		return (
			<AppView testID='no-user'>
				<AppText>User not found</AppText>
			</AppView>
		);

	return (
		<AppView style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', gap: spacing.lg, marginVertical: spacing.md }}>
			<AppView style={{ alignItems: 'center', gap: spacing.lg, marginTop: spacing.lg }}>
				<Avatar name={user.name} size={100} />
				<AppView style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: spacing.md }}>
					<AppText variant='title'>{user?.name}</AppText>
				</AppView>
				<AppView style={{ flexDirection: 'row', gap: spacing.md }}>
					<AppText>Email:</AppText>
					<AppText muted>{user?.email}</AppText>
				</AppView>
			</AppView>
		</AppView>
	);
};

export default UserDetails;
