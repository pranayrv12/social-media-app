export const PostDate = (dateString) => {
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
	const [year, month, day] = dateString.split('-')
	const monthName = months[parseInt(month) - 1]

	return `${monthName} ${parseInt(day)}, ${year}`
}
