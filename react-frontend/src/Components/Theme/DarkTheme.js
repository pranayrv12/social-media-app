import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		textColor: {
			main: '#111111',
		},
		primary: {
			main: '#CAD5E2',
		},
		secondary: {
			main: '#5A20CB',
		},
		background: {
			main: '#000000',
			paper: '#000000',
			default: '#000000',
		},
	},
})

export default darkTheme
