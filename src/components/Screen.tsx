import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import { spacing } from '../theme/colors';
import AppView from './AppView';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface Props {
	children: ReactNode;
	isScroll?: boolean;
	isKeyboard?: boolean;
	isCentered?: boolean;
	style?: StyleProp<ViewStyle>;
	edges?: Edge[];
}
export function Screen({ children, isCentered = false, isKeyboard = false, isScroll = false, edges = [], style }: Props) {
	const { colors } = useAppTheme();
	const contentStyles = [styles.content, isCentered && styles.centered, style];

	const body = isScroll ? (
		<ScrollView contentContainerStyle={[{ flexGrow: 1 }, contentStyles]} keyboardShouldPersistTaps='handled'>
			{children}
		</ScrollView>
	) : (
		<AppView style={[{ flex: 1 }, contentStyles]}>{children}</AppView>
	);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={isKeyboard && Platform.OS === 'ios' ? 'padding' : undefined} enabled={isKeyboard}>
				{body}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	content: { padding: spacing.lg, gap: spacing.md },
	centered: { justifyContent: 'center' },
});
