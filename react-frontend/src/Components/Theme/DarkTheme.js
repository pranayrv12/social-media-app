import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#CAD5E2',
		},
		secondary: {
			main: '#5A20CB',
		},
		textColor: {
			main: '#111111',
		},
		background: {
			main: '#000000',
			paper: '#000000',
			default: '#000000',
		},
	},
})

export default darkTheme
