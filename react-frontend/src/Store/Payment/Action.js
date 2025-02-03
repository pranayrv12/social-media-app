import { API } from '../../Components/API/APIClient'

export const activatePremium = (planType) => async (dispatch) => {
	try {
		const { data } = await API.put(`/api/premium/activate/${planType}`)
		console.log('Premium Account', data)
	} catch (error) {
		console.log('Error', error)
	}
}

export const generatePaymentLink = (planType) => async (dispatch) => {
	try {
		const { data } = await API.post(`/api/premium/payment-link/${planType}`)

		if (data.payment_url) {
			window.location.href = data.payment_url
		}
		console.log('Data', data)
	} catch (error) {
		console.log('Error', error)
	}
}
