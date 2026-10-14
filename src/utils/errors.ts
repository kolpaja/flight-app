/** Thunks use rejectWithValue(string) so Redux state only ever holds serializable error text. */
export function getErrorMessage(error: unknown): string {
	if (error instanceof Error) return error.message;
	if (typeof error === 'string') return error;
	return 'Something went wrong. Please try again.';
}
