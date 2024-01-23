export const PORT = 3000;

export function checkDate(dateInput: string | undefined) {
	const date = dateInput ? new Date(dateInput) : new Date();
	return date.toDateString();
}

export function isValidDateInput(date: string) {
	const dateRegex = /\d{4}-\d{2}-\d{2}/;
	return dateRegex.test(date) && new Date(date) !== null;
}
