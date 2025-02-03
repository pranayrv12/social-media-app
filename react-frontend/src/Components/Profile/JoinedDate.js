export const JoinedDate = (dateString) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const [year, month] = dateString.split('-')
	const monthName = months[parseInt(month) - 1]

	return `${monthName} ${year}`
}
