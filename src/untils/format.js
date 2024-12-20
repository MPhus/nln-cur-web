import CustomDate from '~/untils/customDate'
export const maxForQuantityAndType = (origin, quantity, type) => {
	let newArray = [...origin]
	const originLength = newArray.length

	for (let i = 0; i < originLength - 1; i++) {
		for (let j = i + 1; j <= originLength - 1; j++) {
			if (newArray[i][type] < newArray[j][type]) {
				let temp = newArray[i]
				newArray[i] = newArray[j]
				newArray[j] = temp
			}
		}
	}
	return newArray.filter((item, index) => index < quantity)
}
export const sortMinToMax = (originArray, field) => {
	let newArray = [...originArray]
	const originLength = newArray.length
	for (let i = 0; i < originLength - 1; i++) {
		for (let j = i + 1; j <= originLength - 1; j++) {
			if (newArray[i][field] > newArray[j][field]) {
				let temp = newArray[i]
				newArray[i] = newArray[j]
				newArray[j] = temp
			}
		}
	}
	return newArray
}
export const mapOrder = function (originalArray, orderArray, key) {
	if (!originalArray || !orderArray || !key) return []
	return [...orderArray].map(item => originalArray.find(item2 => item === item2[key]))
}

export const formatDate = (dateString) => {
	// console.log('dateString: ', dateString)
	if (!dateString) {
		return dateString
	} else {
		return dateString.split('T')[0].split('-').reverse().join('/')
	}
}
export const formatDateForTextField = (dateString) => {
	// console.log('dateString: ', dateString)
	if (!dateString) {
		return dateString
	} else {
		return dateString.split('T')[0].split('-').join('-')
	}
}
export const formatDateHaveTime = (dateString) => {
	// console.log('dateString: ', dateString)
	if (!dateString) {
		return dateString
	} else {
		const date = dateString.split('T')[0].split('-').reverse().join('/')
		const time = dateString.split('T')[1].split('.')[0]
		return [time, date].join(' - ')
	}
}
export const formatTime = (dateString) => {
	// console.log('dateString: ', dateString)
	if (!dateString) {
		return dateString
	} else {
		return dateString.split('T')[1].split('.')[0]
	}
}

export const formatToChart = (data, month) => {

	const getDate2 = (createAt) => new Date(formatDateForTextField(createAt)).getDate();

	// Khởi tạo một đối tượng để lưu trữ doanh thu theo ngày
	const revenueByDate = {};

	// Duyệt qua từng đơn hàng và nhóm theo ngày
	data.forEach(order => {
		const date = getDate2(order.createAt)
		if (revenueByDate[date]) {
			revenueByDate[date] += order.totalPrice
		} else {
			revenueByDate[date] = order.totalPrice
		}
	});

	// Chuyển đổi kết quả sang dạng mảng [{ date: , revenueOfDay: }]
	const result = Object.keys(revenueByDate).map(date => ({
		date,
		revenue: revenueByDate[date] * 1000
	}));

	const test = (data, month) => {
		const startDate = 1;
		const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (0-based nên +1)
		const currentDate = new Date().getDate();

		// Nếu là tháng hiện tại thì lấy đến ngày hiện tại, nếu không thì lấy đến 31
		const endDate = month === currentMonth ? currentDate : 31;
		let result = [];
		for (let i = startDate; i <= endDate; i++) {
			// Tìm ngày trong data
			let found = data.find(item => parseInt(item.date) === i)

			// Nếu ngày tồn tại thì đẩy vào result, nếu không thì thêm với revenueOfDay là 0
			if (found) {
				result.push(found)
			} else {
				result.push({ date: i.toString(), revenue: 0 })
			}
		}
		return result
	}

	return test(result, month)
}

export const getDatabyDay = (data, filterDate) => {
	if (filterDate === '') return 'Giá trị đầu vào không hợp lệ.'

	const getDate2 = (createAt) => {
		const date = new Date(formatDateForTextField(createAt))
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}/${month}/${year}`
	}
	const test = data.filter((order) => {
		return getDate2(order.createAt) === filterDate
	})
	return test

}
export const getAllDayData = (data) => {
	const getDate2 = (createAt) => new Date(formatDateForTextField(createAt)).getDate()
	const months = [...data].map((order) => getDate2(order.createAt))
	const uniqueMonths = [...new Set(months)]
	return uniqueMonths.map(m => {
		let arr = {}
		arr = data.filter(d => {
			return getDate2(d.createAt) === m
		})
		return {
			date: m,
			order: arr
		}
	})
}
export const formatAddress = (address) => {
	if (!address) return ''
	return address.replace('/', '%2F').split(' ').join('+')

}