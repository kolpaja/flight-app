import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SearchCriteria } from '../types';
import { addDaysISO, todayISO } from '../utils/date';
import { SearchErrors, validateSearch } from '../utils/validatiors';
import { TextField } from './TextField';
import AppView from './AppView';
import { spacing } from '../theme/colors';
import DateField from './DateField';
import { Button } from './Button';
import { Ionicons } from '@expo/vector-icons';

export const createDefaultCriteria = (): SearchCriteria => ({
	origin: '',
	destination: '',
	departDate: addDaysISO(todayISO(), 7),
	returnDate: addDaysISO(todayISO(), 14),
});

interface Props {
	value: SearchCriteria;
	onChange: (value: SearchCriteria) => void;
	onSubmit: (value: SearchCriteria) => void;
}

const NO_ERRORS: SearchErrors = {};

const SearchForm = ({ onChange, onSubmit, value }: Props) => {
	const [checked, setChecked] = useState<{ source: SearchCriteria; errors: SearchErrors } | null>(null);
	const errors = checked?.source === value ? checked.errors : NO_ERRORS;

	const setDeparture = (departureDate: string) =>
		onChange({
			...value,
			departDate: departureDate,
			returnDate: value.returnDate < departureDate ? departureDate : value.returnDate,
		});

	const submit = () => {
		const criteria: SearchCriteria = { ...value, origin: value.origin.trim().toUpperCase(), destination: value.destination.trim().toUpperCase() };

		const found = validateSearch(criteria);

		setChecked({
			source: value,
			errors: found,
		});

		if (Object.keys(found).length === 0) onSubmit(criteria);
	};

	return (
		<AppView style={{ gap: spacing.lg }}>
			<TextField
				label='From:'
				placeholder='TIA'
				value={value.origin}
				onChangeText={(origin) => onChange({ ...value, origin: origin.toUpperCase() })}
				autoCapitalize='characters'
				autoCorrect={false}
				maxLength={3}
				error={errors.origin}
			/>
			<TextField
				label='To:'
				placeholder='FCO'
				value={value.destination}
				onChangeText={(destination) => onChange({ ...value, destination: destination.toUpperCase() })}
				autoCapitalize='characters'
				autoCorrect={false}
				maxLength={3}
				error={errors.destination}
			/>
			<AppView style={{ flexDirection: 'row', gap: spacing.md, width: '100%', justifyContent: 'space-between' }}>
				<DateField label='Depart:' value={value.departDate} minimumDate={todayISO()} onChange={setDeparture} error={errors.departDate} />
				<DateField
					label='Return:'
					value={value.returnDate}
					minimumDate={value.departDate}
					onChange={(returnDate) => onChange({ ...value, returnDate })}
					error={errors.returnDate}
				/>
			</AppView>
			<Button style={{ marginTop: spacing.sm }} title='Search flights' onPress={submit} />
		</AppView>
	);
};

export default SearchForm;
