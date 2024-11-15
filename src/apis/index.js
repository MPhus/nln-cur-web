import axios from 'axios'
import authorizedAxiosIntance from '~/untils/authorizedAxios'
import { API_CITY } from '~/untils/contant'
import { API_ROOT } from '~/untils/contant'

export const fetchCityAPI = async () => {
	const response = await axios.get(`${API_CITY}`)
	return response.data
}
export const fetchHomePage_API = async (slug) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}`)
	return response.data
}

export const fetchOtherPage_API = async (slug) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/other`)
	return response.data
}
export const fetchStorePage_API = async (slug, type) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/store?type=${type}`)
	return response.data
}
export const fetchProduct_API = async (slug, filter) => {
	const { type, page, limit, price, color, fabric, size, searchtext, isGetSoldOut } = filter
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/products?type=${type}&page=${page}&limit=${limit}&price=${price}&color=${color}&fabric=${fabric}&size=${size}&searchtext=${searchtext}&isGetSoldOut=${isGetSoldOut}`)
	return response.data
}
export const fetchCustomer_API = async (slug, filter) => {
	const { fullname, email, phone, searchtext, limit, page } = filter
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/customers?fullname=${fullname}&page=${page}&email=${email}&limit=${limit}&phone=${phone}&searchtext=${searchtext}`)
	return response.data
}
export const fetchOrderByCustomer_API = async (slug, data) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/order/getByCustomer/?webId=${data.webId}&email=${data.email}`,)
	return response.data
}
export const getProductById_API = async (slug, id) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/products/detail?id=${id}`)
	return response.data
}
export const updateDetailProduct_API = async (slug, data) => {
	const response = await axios.put(`${API_ROOT}/v1/web/${slug}/products/`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return response.data
}
export const getProductBestSeller = async (slug, type, number) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/products/bestSeller?type=${type}&number=${number}`)
	return response.data
}

export const addNewsOnOtherPage_API = async (slug, data) => {
	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/other/news`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return response.data
}

export const addNewProduct_API = async (slug, data) => {
	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/products/`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return response.data
}
export const DeleteProduct_API = async (slug, id) => {
	const response = await axios.delete(`${API_ROOT}/v1/web/${slug}/products/?id=${id}`)
	return response.data
}
export const updateNews_API = async (slug, data) => {
	const response = await axios.put(`${API_ROOT}/v1/web/${slug}/other/news/`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return response.data
}

export const updateHomePage_API = async (slug, data) => {
	const response = await axios.put(`${API_ROOT}/v1/web/${slug}/`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return response.data
}

export const updateSlide_API = async (slug, data) => {
	const response = await axios.put(`${API_ROOT}/v1/web/${slug}/other/slide`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return response.data
}
export const moveNewsOnOtherPage_API = async (slug, data) => {
	const response = await axios.put(`${API_ROOT}/v1/web/${slug}/other`, data)
	return response.data
}

export const deleteNewsOnOtherPage_API = async (slug, id) => {
	const response = await axios.delete(`${API_ROOT}/v1/web/${slug}/other/news/${id}`)
	return response.data
}
export const createNewCustomerOrderWithCash_API = async (slug, data) => {
	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/order`, data)
	return response.data
}
export const createNewOrderEmployee_API = async (slug, data) => {
	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/order/offline`, data)
	return response.data
}
export const payByZaloPay_API = async (slug, data) => {
	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/order/zalopay`, data)
	return response.data
}
// export const createNewCustomerOrderWithZaloPay_API = async (slug, data) => {
// 	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/order/zalopay`, data)
// 	return response.data
// }
export const veriryOderToken_API = async (token) => {
	const response = await axios.get(`${API_ROOT}/v1/verifyMail?token=${token}`)
	return response.data
}
export const orderStatusZaloPay_API = async (slug, apptransid) => {
	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/order/orderStatus?apptransid=${apptransid}`)
	return response.data
}
export const getMonthList_API = async (slug) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/order/getMonthList`)
	return response.data
}
export const TEST_getAllOrder_API = async (slug, month) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/order/test/?month=${month}`)
	return response.data
}
// export const uploadImg_API = async (data) => {
// 	console.log('data: ', data)
// 	const response = await axios.post(`${API_ROOT}/v1/upload/`, data, {
// 		headers: {
// 			'Content-Type': 'multipart/form-data'
// 		}
// 	})
// 	return response
// }
export const handleLogoutAPI = async (slug) => {
	//---- cookie---
	await authorizedAxiosIntance.delete(`${API_ROOT}/v1/web/${slug}/users/logout`)
	// --------

}
export const refreshTokenAPI = async (slug, refreshToken) => {
	return await authorizedAxiosIntance.put(`${API_ROOT}/v1/web/${slug}/users/refresh_token`, { refreshToken })
}




export const addNewUser_API = async (slug, data) => {
	const response = await axios.post(`${API_ROOT}/v1/web/${slug}/users/`, data)
	return response.data
}
export const DeleteUser_API = async (slug, id) => {
	const response = await axios.delete(`${API_ROOT}/v1/web/${slug}/users/?id=${id}`)
	return response.data
}

export const fetchUser_API = async (slug, filter) => {
	const { email, name, searchtext, isAdmin, page, limit } = filter
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/users/?page=${page}&limit=${limit}&searchtext=${searchtext}&email=${email}&name=${name}&isAdmin=${isAdmin}`)
	return response.data
}

export const getUserById_API = async (slug, id) => {
	const response = await axios.get(`${API_ROOT}/v1/web/${slug}/users/${id}`)
	return response.data
}
export const updateDetailUser_API = async (slug, data) => {
	const response = await axios.put(`${API_ROOT}/v1/web/${slug}/users/`, data)
	return response.data
}