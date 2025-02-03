import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#2196F3',
		},
		secondary: {
			main: '#F50057',
		},
		background: {
			paper: 'white',
		},
	},
})

export default lightTheme
