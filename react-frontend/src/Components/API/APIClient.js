import axios from 'axios'

export const API_BASE_URL = 'http://localhost:8080'

export const API = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

API.interceptors.request.use(
	(config) => {
		const jwtToken = localStorage.getItem('jwt')

		if (jwtToken) {
			config.headers['Authorization'] = `Bearer ${jwtToken}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)
