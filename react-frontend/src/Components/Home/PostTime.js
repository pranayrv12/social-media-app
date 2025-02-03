export const PostTime = (timeString) => {
	const [, time] = timeString.split('T')
	const [hoursAndMinutes] = time.split('.')
	let [hours, minutes] = hoursAndMinutes.split(':')

	hours = parseInt(hours)
	const suffix = hours >= 12 ? 'PM' : 'AM'
	hours = hours % 12 === 0 ? 12 : hours % 12

	return `${hours}:${minutes} ${suffix}`
}
