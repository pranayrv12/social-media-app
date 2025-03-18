import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		background: {
			paper: 'white',
		},
		primary: {
			main: '#2196F3',
		},
		secondary: {
			main: '#F50057',
		},
	},
})

export default lightTheme
