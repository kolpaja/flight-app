import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '../theme/useAppTheme';
import { formatLongDate, fromISODate, toISODate } from '../utils/date';
import { radius, spacing } from '../theme/colors';
import AppView from './AppView';
import { AppText } from './AppText';
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerChangeEvent, type DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface Props {
	label: string;
	value: string;
	onChange: (iso: string) => void;
	minimumDate?: string;
	error?: string;
}

const DateField = ({ label, value, onChange, error, minimumDate }: Props) => {
	const { colors, dark } = useAppTheme();
	const date = fromISODate(value);
	const min = minimumDate ? fromISODate(minimumDate) : undefined;

	const handleChange = (__event: unknown, selected: Date) => {
		onChange(toISODate(selected));
	};

	return (
		<AppView style={{ gap: spacing.sm }}>
			<AppText variant='label' muted>
				{label}
			</AppText>
			{Platform.OS === 'android' ? (
				<Pressable
					accessibilityRole='button'
					accessibilityLabel={`${label}: ${formatLongDate(value)}`}
					onPress={() => DateTimePickerAndroid.open({ value: date, mode: 'date', minimumDate: min, onValueChange: handleChange })}
					style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: error ? colors.danger : colors.border }]}
				>
					<AppText>{formatLongDate(value)}</AppText>
				</Pressable>
			) : (
				<AppView>
					<DateTimePicker value={date} mode='date' display='compact' minimumDate={min} onValueChange={handleChange} themeVariant={dark ? 'dark' : 'light'} />
				</AppView>
			)}
		</AppView>
	);
};

export default DateField;

const styles = StyleSheet.create({
	input: { minHeight: 50, borderWidth: 1, borderRadius: radius.md, paddingHorizontal: 14, justifyContent: 'center' },
	ios: { alignItems: 'flex-start', paddingVertical: spacing.xs },
});
