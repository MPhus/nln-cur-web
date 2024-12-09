/* eslint-disable no-undef */


export const API_CITY = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
let apiRoot = 'https://nln-cur-api.onrender.com'
if (process.env.BUILD_MODE === 'dev') {
	apiRoot = 'http://localhost:3000'
}
if (process.env.BUILD_MODE === 'production') {
	apiRoot = 'https://nln-cur-api.onrender.com'
}
console.log('process.env: ', process.env)
console.log('import.meta.env: ', import.meta.env)


export const API_ROOT = apiRoot
