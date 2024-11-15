import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/untils/contant'
import { handleLogoutAPI, refreshTokenAPI } from '~/apis/index'
let authorizedAxiosIntance = axios.create()

authorizedAxiosIntance.defaults.timeout = 1000 * 60 * 10 * 10

// ------Cookies-----
authorizedAxiosIntance.defaults.withCredentials = true
authorizedAxiosIntance.defaults.headers['Cache-Control'] = 'no-cache'
// Add a request interceptor
authorizedAxiosIntance.interceptors.request.use(
	(config) => {
		return config

	}, (error) => {
		return Promise.reject(error)
	})

// Add a response interceptor
let refreshTokenPromise = null
authorizedAxiosIntance.interceptors.response.use((response) => {

	return response
}, (error) => {
	if (error.response.status === 401) {
		handleLogoutAPI('tiemcur').then((() => {
			localStorage.removeItem('userInfo')
			// window.location.href('/login')
		}))
	}
	// refreshToken
	const originalReqest = error.config
	if (error.response.status === 410 && originalReqest) {
		if (!refreshTokenPromise) {
			const refreshToken = localStorage.getItem('refreshToken')
			refreshTokenPromise = refreshTokenAPI('tiemcur', refreshToken)
				.then((res) => {

					// ----------localStorage-----------
					const { accessToken } = res.data
					localStorage.setItem('accessToken', accessToken)
					res.config.headers.Authorization = `Bearer ${accessToken}`
					// ---------------------

				})
				.catch((err) => {
					handleLogoutAPI('tiemcur')
						.then((() => {
							localStorage.removeItem('userInfo')
							// window.location.href('/login')
						}))
					return Promise.reject(err)

				})
				.finally(() => {
					refreshTokenPromise = null
				})
		}
		return refreshTokenPromise.then(() => {
			return authorizedAxiosIntance(originalReqest)
		})
	}
	if (error.response?.status !== 410) {
		toast.error(error.response?.data?.message || error?.message, { position: 'top-center' })
	}
	return Promise.reject(error)
})


export default authorizedAxiosIntance
