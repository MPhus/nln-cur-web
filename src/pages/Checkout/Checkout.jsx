import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isEmpty } from 'lodash'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import FormControl from '@mui/material/FormControl'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'


import { getProductById } from '~/apis/mock'
import { fetchCityAPI, getProductById_API, payByZaloPay_API, createNewCustomerOrderWithCash_API } from '~/apis/index'

import { ReactComponent as LogoIconBlack } from '~/assets/svgIcon/curlogob_black.svg'
import { ReactComponent as CashIconBlack } from '~/assets/svgIcon/money.svg'
import ZaloPay from '~/assets/svgIcon/ZaloPay_Logo.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { CircularProgress } from '@mui/material'

function Checkout() {
	const TRANPORT_FEE = 35
	const [open, setOpen] = useState(false)
	const [openCheckmail, setOpenCheckmail] = useState({ isOpen: false })
	const [citiesList, setCitiesList] = useState([])
	const [cityName, setCityName] = useState('')
	const [districtName, setDistrictName] = useState('')
	const [wardName, setWardName] = useState('')
	const [productList, setProductList] = useState([])
	const [loading, setLoading] = useState(false)
	const natigate = useNavigate()
	const { register, handleSubmit, formState: { errors } } = useForm()

	useEffect(() => {
		fetchCityAPI().then((data) => setCitiesList(data))
	}, [])

	const districtsList = citiesList?.find(city => city?.Name === cityName)?.Districts
	const wardsList = districtsList?.find(dis => dis?.Name === districtName)?.Wards


	// const submitLogIn = (data) => {
	// 	const propData = { infor: data, productList, totalPrice, tranportFee: TRANPORT_FEE }
	// 	if (data.payMethod === 'cash') {
	// 		natigate('/confirm/cash', { state: propData })
	// 		// createNewCustomerOrderWithCash_API('tiemcur', { infor: data, productList, totalPrice, tranportFee: TRANPORT_FEE })
	// 	}
	// 	else if (data.payMethod === 'zaloPay') {
	// 		natigate('/confirm/zaloPay', { state: propData })
	// 		// createNewCustomerOrderWithZaloPay_API('tiemcur', { infor: data, productList, totalPrice, tranportFee: TRANPORT_FEE })
	// 	}

	// 	// const test = productList.map((item) => {
	// 	// 	return {
	// 	// 		productId: item._id,
	// 	// 		productName: item.name,
	// 	// 		productSize: item.size,
	// 	// 		productThumb: item.thumb,
	// 	// 		quantityInCart: item.quantityInCart
	// 	// 	}
	// 	// })
	// }

	const submitLogIn = (info) => {
		const data = { info, productList, totalPrice, tranportFee: TRANPORT_FEE, type: 'online' }
		if (info.payMethod === 'cash') {
			createNewCustomerOrderWithCash_API('tiemcur', data)
				.then((t) => {
					setOpenCheckmail({ message: t.to[0], isOpen: true, isThen: true })
				})
				.catch((t) => {
					console.log('t: ', t)
					setOpenCheckmail({ message: t.message, isOpen: true, isThen: false })
				})
				.finally(a => setLoading(false))
			setLoading(true)
		}
		else if (info.payMethod === 'zaloPay') {
			// createNewCustomerOrderWithZaloPay_API('tiemcur', { infor: data, productList, totalPrice, tranportFee: TRANPORT_FEE })
			payByZaloPay_API('tiemcur', data)
				.then((test) => {
					console.log('test: ', test)
					window.open(test.order_url, '_self')
				})

		}
	}
	const productInCart = useSelector(state => state.cart.items)

	useEffect(() => {
		const fetchProducts = async () => {
			const promises = productInCart.map(item =>
				getProductById_API('tiemcur', item.id)
					.then(data => ({
						...data,
						quantityInCart: item.quantity
					}))
			);
			const products = await Promise.all(promises)
			setProductList(products)
		};

		fetchProducts()
	}, [productInCart])
	// const productList = productInCart.map(item => {
	// 	return {
	// 		...getProductById(item.id),
	// 		quantityInCart: item.quantity
	// 	}
	// })

	const isProductListEmpty = isEmpty(productList)

	const totalPrice = productList.map(product => (product.price - (product.price * product.savePercent / 100)) * product.quantityInCart).reduce((init, curr) => {
		return init + curr
	}, 0)
	const totalQuantity = productList.map(product => product.quantityInCart).reduce((init, curr) => {
		return init + curr
	}, 0)
	const handleCloseCheckmail = () => {
		natigate('/cart')
		setOpenCheckmail({ isOpen: false })
	}
	const handleOpentab = () => {
		window.open('https://mail.google.com/', '_self')
		setOpenCheckmail({ isOpen: false })
	}

	const handleOpenList = () => {
		setOpen(!open)
	}
	return (
		<Box>
			{loading &&
				<Box sx={{ backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: '99' }}>
					<CircularProgress sx={{ color: 'secondary.main' }} size={80} />
				</Box>
			}
			<form onSubmit={handleSubmit(submitLogIn)}>
				<Box sx={{
					width: {
						md: '100%',
						lg: '1200px'
					},
					p: {
						xs: '0 20px',
						sm: '0',
						md: '0 20px',
						lg: '0'
					},
					m: '0 auto',
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row'
					},
					justifyContent: {
						xs: 'flex-start',
						md: 'space-between'
					},
					height: {
						xs: 'fit-content',
						md: '100vh'
					},

				}}>
					<Box sx={{
						display: {
							xs: 'block',
							md: 'none'
						},
						minWidth: {
							xs: '100%',
							sm: '500px',
							md: '25%',
							lg: '320px'
						},
						maxWidth: {
							xs: '100%',
							sm: '500px',
							md: '25%',
							lg: '320px'
						},
						margin: {
							xs: '0 auto',
							md: '0'
						},
						'& a': {
							display: {
								xs: 'inline-block',
								md: 'none'
							},
							width: '100%',
							textAlign: 'center'
						}
					}}>
						<Link to='/' >
							<SvgIcon component={LogoIconBlack} inheritViewBox sx={{
								height: 'auto',
								width: '120px'
							}} />
						</Link>

						<Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', p: '8px 0' }}
							onClick={handleOpenList}
						>
							<Button
								variant='text'
								endIcon={!open ? <ExpandMoreIcon /> : <KeyboardArrowUpIcon />}
								sx={{
									color: '#000',
									p: '0',
									fontSize: '16px',
									fontWeight: '700'
								}} >
								{`Đơn hàng (${totalQuantity} sản phẩm)`}
							</Button>

							<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main', fontSize: '18px !important', userSelect: 'none' }}>
								{`${(new Intl.NumberFormat().format((totalPrice + TRANPORT_FEE) * 1000))} VND`}
							</Typography>

						</Box>
						<Box sx={{ display: open ? 'block' : 'none' }}>

							<Box sx={{ maxHeight: '500px', overflowY: 'auto', borderBottom: '1px solid #000', py: '20px', mb: '20px' }}>
								{!isProductListEmpty && productList.map(product => (

									<Box key={product._id}
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											pr: '16px',
											alignItems: 'center',
											mb: '20px',
											height: '52px'
										}} >

										<Box sx={{ position: 'relative', height: '100%' }}>
											<img src={product.thumb} style={{ height: '100%' }} />
											<Box sx={{
												position: 'absolute',
												top: '-8px',
												right: '-8px',
												backgroundColor: 'secondary.main',
												color: '#fff',
												minWidth: '20px',
												maxWidth: '20px',
												borderRadius: '50%',
												minHeight: '20px',
												maxHeight: '20px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}>
												<Typography sx={{
													fontSize: '12px !important',
													textAlign: 'center',
													minWidth: '12px',
													maxWidth: '12px',
													minHeight: '12px',
													maxHeight: '12px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}>
													{product.quantityInCart}

												</Typography>
											</Box>
										</Box>
										<Box sx={{ flex: '1', p: '0 20px', }}>
											<Typography variant='body1' sx={{ textTransform: 'capitalize', fontSize: '16px !important' }}>
												{`${product.name}`}
											</Typography>
											<Typography variant='body1' sx={{ textTransform: 'capitalize' }} >
												{`Size: ${product.size} `}
											</Typography>

										</Box>


										<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main' }}>
											{`${new Intl.NumberFormat().format(((product.price - (product.price * (product.savePercent / 100))) * product.quantityInCart) * 1000)} VND`}
										</Typography>

									</Box>
								))}
							</Box>

							<Box sx={{ borderBottom: '1px solid #000', pb: '20px' }}>

								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
									<Typography variant='body1' sx={{ fontSize: '16px ! important' }}>
										Tạm tính
									</Typography>
									<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main', fontSize: '16px ! important' }}>
										{`${(new Intl.NumberFormat().format(totalPrice * 1000))} VND`}
									</Typography>
								</Box>

								{!!TRANPORT_FEE &&
									<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
										<Typography variant='body1' sx={{ mt: '8px' }}>
											Phí vận chuyển
										</Typography>
										<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main' }}>
											{`${(new Intl.NumberFormat().format(TRANPORT_FEE * 1000))} VND`}
										</Typography>
									</Box>
								}

								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #000', pt: '20px' }}>
									<Typography variant='body1' sx={{ fontSize: '16px ! important', fontWeight: '700' }}>
										Tổng cộng
									</Typography>
									<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main', fontSize: '18px !important' }}>
										{`${(new Intl.NumberFormat().format((totalPrice + TRANPORT_FEE) * 1000))} VND`}

									</Typography>
								</Box>

							</Box>

						</Box>
					</Box>

					<Box sx={{
						minWidth: {
							xs: '100%',
							sm: '500px',
							md: '25%',
							lg: '320px'
						},
						maxWidth: {
							xs: '100%',
							sm: '500px',
							md: '25%',
							lg: '320px'
						},
						margin: {
							xs: '0 auto',
							md: '0'
						},
						'& a': {
							display: {
								xs: 'none',
								md: 'inline-block'
							},
							width: '100%',
							textAlign: 'center'
						}
					}}>
						<Link to='/' >
							<SvgIcon component={LogoIconBlack} inheritViewBox sx={{
								height: 'auto',
								width: '120px'
							}} />
						</Link>

						<Box sx={{
							minWidth: '100%',
							maxWidth: '100%'
						}}>
							<Typography variant='h6' sx={{ mt: { xs: '32px', md: '0' } }}>Thông tin nhận hàng</Typography>

							{/*-Input--Input--Input--Input--Input--Input--Input--Input--Input--Input--Input-*/}
							<Box>

								{/* Emailllllllllllllllllllllllllllllllllllllllllllllllllllllll */}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										},
									},
								}}>
									<TextField
										autoFocus
										fullWidth
										size='small'
										label="Email"
										type="text"
										variant="outlined"
										error={!!errors.email}
										{...register('email', {
											required: 'Vui lòng nhập email.',
											pattern: /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/g
										})}
									/>
									{errors.email && errors.email.type !== 'pattern' &&
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											{errors.email.message}
										</Alert>
									}
									{errors?.email?.type === 'pattern' && (
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											Vui lòng nhập đúng định dạng email
										</Alert>
									)}
								</Box>

								{/* FulllllllllllllNameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										},
									},
								}}>
									<TextField
										fullWidth
										size='small'
										label="Họ và tên"
										type="text"
										variant="outlined"
										error={!!errors.fullname}
										{...register('fullname', {
											required: 'Vui lòng nhập họ và tên.'
										})}
									/>
									{errors.fullname &&
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											{errors.fullname.message}
										</Alert>
									}
								</Box>

								{/* Phoneeeeeeee Numberrrrrrrrrrrrrrrrrrrrrrrrr */}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										},
									},
								}}>
									<TextField
										fullWidth
										size='small'
										label="Số điện thoại"
										type="text"
										variant="outlined"
										error={!!errors.phone}
										{...register('phone', {
											required: 'Vui lòng nhập số điện thoại.',
											pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
										})}
									/>
									{errors.phone && errors.phone.type !== 'pattern' &&
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											{errors.phone.message}
										</Alert>
									}
									{errors?.phone?.type === 'pattern' && (
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											Vui lòng nhập đúng định dạng số điện thoại
										</Alert>
									)}
								</Box>

								{/* Addressssssssssssssssssssssssssssssssssssss*/}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										},

									},
								}}>
									<TextField
										fullWidth
										size='small'
										label="Địa chỉ"
										type="text"
										variant="outlined"
										error={!!errors.fullname}
										{...register('address', {
											required: 'Vui lòng nhập địa chỉ.'
										})}
									/>
									{errors.address &&
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											{errors.address.message}
										</Alert>
									}
								</Box>

								{/* Cityyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy */}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0',
										bottom: '16px',
										lineHeight: '1.4375em',
										backgroundColor: '#fff'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important',
											// backgroundColor: '#EEEDEB'
										}
									},
								}}>
									<FormControl fullWidth>
										<InputLabel size='small' variant="outlined" id="city-select-label" >Tỉnh/ Thành phố</InputLabel>
										<Select
											labelId='city-select-label'
											variant="outlined"
											size='small'
											{...register('city', {
												required: 'Vui lòng chọn Tỉnh/ Thành phố.'
											})}
											value={cityName}
											inputProps={{
												MenuProps: {
													disableScrollLock: true, PaperProps: {
														style: {
															maxHeight: 200,
														},
													},
												}
											}}
											onChange={(e) => { setCityName(e.target.value); setDistrictName(''); setWardName('') }}
										>
											{citiesList && citiesList.map(item => <MenuItem key={item.Id} value={item.Name}>{item.Name}</MenuItem>)}
										</Select>
									</FormControl>
									{errors.city &&
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											{errors.city.message}
										</Alert>
									}
								</Box>

								{/* Quậnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0',
										bottom: '16px',
										lineHeight: '1.4375em',
										backgroundColor: cityName ? '#fff' : '#EEEDEB'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important',
											backgroundColor: cityName ? 'transparent' : '#EEEDEB'
										}
									},
								}}>
									<FormControl fullWidth>
										<InputLabel size='small' variant="outlined" id="district-select-label" >Quận/ Huyện</InputLabel>
										<Select
											{...register('district', {
												required: 'Vui lòng chọn Quận/ Huyện.'
											})}
											labelId='district-select-label'
											variant="outlined"
											size='small'
											disabled={!cityName}
											value={districtName}
											defaultValue=""
											inputProps={{
												MenuProps: {
													disableScrollLock: true, PaperProps: {
														style: {
															maxHeight: 200,
														},
													},
												}
											}}
											onChange={(e) => { setDistrictName(e.target.value); setWardName('') }}
										>
											{districtsList && districtsList.map(item => <MenuItem key={item.Id} value={!item.Name ? '' : item.Name}>{!item.Name ? '' : item.Name}</MenuItem>)}
										</Select>
									</FormControl>
									{errors.district &&
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											{errors.district.message}
										</Alert>
									}
								</Box>

								{/* Phườngggggggggggggggggggggggggggggggggggggggggggggggggg */}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0',
										bottom: '16px',
										lineHeight: '1.4375em',
										backgroundColor: districtName ? '#fff' : '#EEEDEB'
									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important',
											backgroundColor: districtName ? 'transparent' : '#EEEDEB'
										}
									},
								}}>
									<FormControl fullWidth>
										<InputLabel size='small' variant="outlined" id="ward-select-label" >Phường/ Xã</InputLabel>
										<Select
											{...register('ward', {
												required: 'Vui lòng chọn Phường/ Xã.'
											})}
											labelId='ward-select-label'
											variant="outlined"
											size='small'
											disabled={!districtName}
											value={wardName}
											defaultValue=""
											inputProps={{
												MenuProps: {
													disableScrollLock: true, PaperProps: {
														style: {
															maxHeight: 200,
														},
													},
												}
											}}
											onChange={(e) => { setWardName(e.target.value) }}
										>
											{wardsList && wardsList.map(item => <MenuItem key={item.Id} value={!item.Name ? '' : item.Name}>{!item.Name ? '' : item.Name}</MenuItem>)}
										</Select>
									</FormControl>
									{errors.ward &&
										<Alert severity="error" sx={{ mt: '8px', py: '0', '.MuiAlert-message': { overflow: 'hidden' } }}>
											{errors.ward.message}
										</Alert>
									}
								</Box>

								{/* Noteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}
								<Box sx={{
									marginTop: '8px',
									'& .MuiFormLabel-root': {
										fontSize: '16px',
										right: 'auto',
										left: '0',

									},
									'&  .MuiOutlinedInput-root ': {
										fontSize: '16px',
										pb: '28px',
										' & .MuiOutlinedInput-notchedOutline': {
											border: '1px solid #000 !important'
										},
									},
								}}>
									<TextField
										fullWidth
										size='small'
										multiline
										label="Ghi chú (tùy chọn)"
										type="text"
										variant="outlined"
										{...register('note')}
									/>

								</Box>
							</Box>
						</Box>
					</Box>

					<Box sx={{
						minWidth: {
							xs: '100%',
							sm: '500px',
							md: '25%',
							lg: '320px'
						},
						maxWidth: {
							xs: '100%',
							sm: '500px',
							md: '25%',
							lg: '320px'
						},
						margin: {
							xs: '32px auto 0',
							md: '128px 0 0 0'
						},
					}} >

						<Typography variant='h6'>Thanh toán</Typography>

						<FormControl sx={{ width: '100%', borderRadius: '8px', border: '1px solid #000', mt: '12px' }} >

							<RadioGroup
								defaultValue="zaloPay"
								name="payment"
							>
								<FormControlLabel
									{...register('payMethod')}
									value="zaloPay"
									control={<Radio color='secondary' />}
									sx={{ mx: '0', pr: '12px', '& .MuiTypography-root': { flex: '1' } }}
									label={
										<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
											<Typography variant='body1'>Thanh toán qua Zalo Pay</Typography>
											<img src={ZaloPay} style={{
												height: 'auto',
												width: '64px'
											}} alt="" />
										</Box>
									} />
								<FormControlLabel
									{...register('payMethod')}
									value="cash"
									control={<Radio color='secondary' />}
									sx={{ borderTop: '1px solid #000', mx: '0', pr: '12px', '& .MuiTypography-root': { flex: '1' } }}
									label={
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
											<Typography variant='body1'>Thanh toán khi nhận hàng (COD) </Typography>
											<SvgIcon
												component={CashIconBlack}
												inheritViewBox
												sx={{
													height: 'auto',
													width: '40px'
												}}
											/>
										</Box>
									} />


							</RadioGroup>
						</FormControl>
					</Box>

					{/* BUTTON RESPONSIVE BUTTON RESPONSIVE BUTTON RESPONSIVE BUTTON RESPONSIVE BUTTON RESPONSIVE BUTTON RESPONSIVE */}
					<Box sx={{
						minWidth: {
							xs: '100%',
							sm: '500px'
						},
						maxWidth: {
							xs: '100%',
							sm: '500px'
						},
						margin: '32px auto 0',
						display: {
							xs: 'block',
							md: 'none'
						},
						justifyContent: 'space-between',
						alignItems: 'center',
						mt: '32px',
						mb: '64px',
						'& a': {
							color: 'secondary.main',
							textDecoration: 'none',
						}
					}}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
							sx={{
								width: '100%',
								backgroundColor: 'secondary.main',
								color: 'primary.main',
								transition: 'all linear .3s',
								'&:hover': {
									backgroundColor: 'secondary.main',
									opacity: '0.9'
								}
							}}
						>
							ĐẶT HÀNG
						</Button>

						<Link to='/cart'>
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '8px' }}>
								<ArrowBackIosIcon sx={{ fontSize: '16px', mb: '1px', mr: '-4px' }} />	Quay về giỏ hàng
							</Box>
						</Link>

					</Box>

					<Box sx={{
						display: {
							xs: 'none',
							md: 'block'
						},
						minWidth: {
							md: '40%',
							lg: '440px'
						},
						maxWidth: {
							md: '40%',
							lg: '440px'
						},
						backgroundColor: '#EEEDEB',
						padding: '20px'
					}}>
						<Typography sx={{ pb: '20px', borderBottom: '1px solid #000', mb: '12px' }} variant='h6'>{`Đơn hàng (${totalQuantity} sản phẩm)`}</Typography>

						<Box sx={{ maxHeight: '500px', overflowY: 'auto', borderBottom: '1px solid #000', py: '20px', mb: '20px' }}>

							{!isProductListEmpty && productList.map(product => (

								<Box key={product._id}
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										pr: '16px',
										alignItems: 'center',
										mb: '20px',
										height: '52px'
									}} >

									<Box sx={{ position: 'relative', height: '100%' }}>
										<img src={product.thumb} style={{ height: '100%' }} />
										<Box sx={{
											position: 'absolute',
											top: '-8px',
											right: '-8px',
											backgroundColor: 'secondary.main',
											color: '#fff',
											minWidth: '20px',
											maxWidth: '20px',
											borderRadius: '50%',
											minHeight: '20px',
											maxHeight: '20px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}>
											<Typography sx={{
												fontSize: '12px !important',
												textAlign: 'center',
												minWidth: '12px',
												maxWidth: '12px',
												minHeight: '12px',
												maxHeight: '12px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}>
												{product.quantityInCart}

											</Typography>
										</Box>
									</Box>
									<Box sx={{ flex: '1', p: '0 20px', }}>
										<Typography variant='body1' sx={{ textTransform: 'capitalize', fontSize: '16px !important' }}>
											{`${product.name} `}
										</Typography>
										<Typography variant='body1' sx={{ textTransform: 'uppercase' }} >
											{`Size: ${product.size} `}
										</Typography>

									</Box>


									<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main' }}>
										{`${new Intl.NumberFormat().format(((product.price - (product.price * (product.savePercent / 100))) * product.quantityInCart) * 1000)} VND`}
									</Typography>

								</Box>
							))}
						</Box>

						<Box sx={{ borderBottom: '1px solid #000', pb: '20px' }}>

							<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
								<Typography variant='body1' sx={{ fontSize: '16px ! important' }}>
									Tạm tính
								</Typography>
								<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main', fontSize: '16px ! important' }}>
									{`${(new Intl.NumberFormat().format(totalPrice * 1000))} VND`}
								</Typography>
							</Box>

							{!!TRANPORT_FEE &&

								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
									<Typography variant='body1' sx={{ mt: '8px' }}>
										Phí vận chuyển
									</Typography>
									<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main' }}>
										{`${(new Intl.NumberFormat().format(TRANPORT_FEE * 1000))} VND`}
									</Typography>
								</Box>
							}


						</Box>

						<Box sx={{ py: '20px' }}>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
								<Typography variant='body1' sx={{ fontSize: '16px ! important', fontWeight: '700' }}>
									Tổng cộng
								</Typography>
								<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main', fontSize: '18px !important' }}>
									{`${(new Intl.NumberFormat().format((totalPrice + TRANPORT_FEE) * 1000))} VND`}

								</Typography>
							</Box>
							<Box sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: '20px',
								'& a': {
									color: 'secondary.main',
									textDecoration: 'none'
								}
							}}>

								<Link to='/cart'>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<ArrowBackIosIcon sx={{ fontSize: '16px', mb: '1px', mr: '-4px' }} />	Quay về giỏ hàng
									</Box>
								</Link>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="large"
									sx={{
										backgroundColor: 'secondary.main',
										color: 'primary.main',
										transition: 'all linear .3s',
										'&:hover': {
											backgroundColor: 'secondary.main',
											opacity: '0.9'
										}
									}}
								>
									ĐẶT HÀNG
								</Button>
							</Box>
						</Box>

					</Box>
				</Box >
			</form>
			<Dialog
				open={openCheckmail.isOpen}
			>
				<DialogTitle id="alert-dialog-title">
					Xác nhận đơn hàng
				</DialogTitle>
				<DialogContent>
					{openCheckmail.isThen
						? `Vui lòng kiểm tra email: ${openCheckmail.message} để xác nhận đơn hàng của bạn`
						: `Có lỗi xảy ra \n${openCheckmail.message}`}

				</DialogContent>
				<DialogActions>
					{openCheckmail.isThen && <Button
						variant="contained"
						color="primary"
						size="large"
						sx={{
							width: '100%',
							backgroundColor: 'secondary.main',
							color: 'primary.main',
							transition: 'all linear .3s',
							'&:hover': {
								backgroundColor: 'secondary.main',
								opacity: '0.9'
							}
						}} onClick={handleOpentab}>Mở Email</Button>}
					{!openCheckmail.isThen && <Button
						variant="contained"
						color="primary"
						size="large"
						sx={{
							width: '100%',
							backgroundColor: 'secondary.main',
							color: 'primary.main',
							transition: 'all linear .3s',
							'&:hover': {
								backgroundColor: 'secondary.main',
								opacity: '0.9'
							}
						}} onClick={handleCloseCheckmail}>Đóng</Button>}
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default Checkout
