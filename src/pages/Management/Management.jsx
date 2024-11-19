import { useEffect, useRef, useState } from 'react'

import Avatar from '@mui/material/Avatar'
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
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Menu, Card as MuiCard } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { getUserById_API, handleLogoutAPI, updateDetailUser_API } from '~/apis/index'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { fetchCustomer_API, fetchProduct_API, createNewOrderEmployee_API } from '~/apis'
import { useNavigate } from 'react-router-dom'

import LogoutIcon from '@mui/icons-material/Logout'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { formatDate, formatTime } from '~/untils/format'
import CustomDate from '~/untils/customDate'
import authorizedAxiosIntance from '~/untils/authorizedAxios'
import UpdateUser from '~/components/Statistic/UpdateUser'
import { API_ROOT } from '~/untils/contant'

function Management() {

	const [slug] = useState('tiemcur')
	const navigate = useNavigate()

	const SEARCH_HEIGHT = '80px'
	const LIST_HEIGHT = `calc(100% - ${SEARCH_HEIGHT})`

	const [filterProduct, setFilterProduct] = useState('')
	const [newOrder, setNewOrder] = useState({})
	const [filterCustomer, setFilterCustomer] = useState('')
	const [customerPhone, setCustomerPhone] = useState('')
	const [customerName, setCustomerName] = useState('')
	const [customerEmail, setCustomerEmail] = useState('')
	const [productList, setProductList] = useState([])
	const [productInShop, setProductInShop] = useState([])
	const [customerList, setCustomerList] = useState([])
	const [customerView, setCustomerView] = useState(undefined)
	const [payment, setPayment] = useState('cash')
	const [openCreateNew, setOpenCreateNew] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)
	const [viewInfo, setViewInfo] = useState(null)
	const [user, setUser] = useState(null)
	const [userDetail, setUserDetail] = useState({})

	const printTest = useRef()
	const content = useRef()

	const allQuantityInShop = productInShop?.map(a => a.quantityInShop)
	const totalQuantityInShop = allQuantityInShop.reduce((a, b) => a + b, 0)
	const totalPrice = productInShop?.map((a) => a.productOrigin.price * a.quantityInShop).reduce((a, b) => a + b, 0)
	useEffect(() => {
		if (user) {
			getUserById_API('tiemcur', user?.id)
				.then(data => {
					setUserDetail(data)
				}
				)
		}
	}, [user])
	useEffect(() => {
		const testAccess = async () => {
			const res = await authorizedAxiosIntance.get(`${API_ROOT}/v1/web/${slug}/accesstoken`)

			setUser(res.data)
		}
		testAccess()
		// document.querySelector('link[rel="icon"]').href = 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1722253234/376248141_609292971392775_7616707295223113086_n_lqcbsv.jpg'
	}, [])
	useEffect(() => {
		const filter = { type: '', page: 1, limit: 500, price: 'latest', color: '', fabric: '', size: '', searchtext: filterProduct, isGetSoldOut: false }
		fetchProduct_API(slug, filter).then(data => setProductList(data))
	}, [filterProduct])
	useEffect(() => {
		const filter = { fullname: '', page: 1, limit: 500, email: '', phone: '', searchtext: filterCustomer }
		fetchCustomer_API(slug, filter).then(data => setCustomerList(data))
	}, [filterCustomer])

	const handleViewInfo = () => {
		setViewInfo(true)
	}

	const handlePrint = () => {
		if (isEmpty(productInShop)) {
			toast('Chưa có sản phẩm.', { position: 'top-center' })
			return
		}
		const pri = printTest.current.contentWindow
		pri.document.open()
		pri.document.write(content.current.innerHTML)
		pri.document.close()
		pri.focus()
		pri.print()
	}
	const handleLogout = () => {
		handleLogoutAPI(slug).then(data => {
			localStorage.removeItem('userInfo')
			setUser(null)
			navigate('/login')
		})
	}

	let test
	if (!isEmpty(productList)) {
		test = [...productList.data]
	}


	const handleAddCustomer = (cus) => {
		setCustomerView(cus)
		setFilterCustomer('')
	}

	const createNewCustomer = () => {
		const data = {
			phone: customerPhone,
			fullname: customerName,
			email: customerEmail,
		}
		handleAddCustomer({ ...data, isNew: true })
		setOpenCreateNew(false)

	}
	const updateDetailUser = async (data) => {
		console.log('data: ', data)
		const ttestt = await updateDetailUser_API('tiemcur', data)
	}
	const handleCheckout = () => {
		const info = {
			email: '',
			fullname: 'khách lẻ',
			phone: '',
			...customerView,
			payMethod: payment,
			note: '',
			district: '',
			address: '',
			city: '',
			ward: ''
		}
		if (isEmpty(productInShop)) {
			toast('Không có sản phẩm nào để thanh toán', { position: 'top-center' })
			return
		}

		const productList = [...productInShop].map(a => {
			return {
				...a.productOrigin,
				quantityInCart: a.quantityInShop
			}
		})
		handlePrint()
		const data = { info, productList, totalPrice, tranportFee: 0, type: 'offline' }
		setProductInShop([])
		console.log('data: ', data)
		setCustomerView(undefined)
		// createNewOrderEmployee_API('tiemcur', data).then(d => setNewOrder(d))

	}
	const handleOpenCreate = () => {
		setCustomerPhone(filterCustomer)
		setOpenCreateNew(true)
	}

	const handleCloseCreate = () => {
		setOpenCreateNew(false)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleAddShop = (product) => {
		setProductInShop(a => {
			const proShop = { productOrigin: product, quantityInShop: 1 }
			const index = [...a].findIndex(pro => pro.productOrigin._id === proShop.productOrigin._id)
			if (index >= 0) {
				a[index].quantityInShop += 1
				if (a[index].quantityInShop >= proShop.productOrigin.quantity) {
					a[index].quantityInShop = proShop.productOrigin.quantity
					toast('Sản phẩm đã đạt số lượng tối đa', { position: 'top-center' })
				}
			} else {
				a.push(proShop)
			}
			return a
		})
		setFilterProduct('')
	}

	const handleMinusProduct = (proShop) => {
		setProductInShop(a => {
			const x = [...a].map(pro => {
				if (pro.productOrigin._id === proShop.productOrigin._id) {
					pro.quantityInShop = pro.quantityInShop - 1

				}
				return pro
			})
			return x.filter(c => c.quantityInShop > 0)
		})
	}

	const handlePlusProduct = (proShop) => {
		setProductInShop(a => {
			const x = [...a].map(pro => {
				if (pro.productOrigin._id === proShop.productOrigin._id) {
					let t = proShop.quantityInShop + 1
					if (t >= proShop.productOrigin.quantity) {
						t = proShop.productOrigin.quantity
						toast('Sản phẩm đã đạt số lượng tối đa', { position: 'top-center' })
					}
					pro.quantityInShop = t
				}
				return pro
			})
			return x
		})
	}
	const handleRemoveProduct = (proShop) => {
		setProductInShop(a => {
			const x = a.map(pro => {
				if (pro.productOrigin._id === proShop.productOrigin._id) {
					pro.quantityInShop = 0
				}
				return pro
			})
			return x.filter(c => c.quantityInShop > 0)
		})
	}

	if (!user) {
		return (
			<Box>
				Loading
			</Box>
		)
	}

	return (
		<Box>

			<Box sx={{ minHeight: SEARCH_HEIGHT, padding: '20px 12px', backgroundColor: '#4f6f52', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Box sx={{
					position: 'relative',
					flex: ' 0 0 70%',
					'& iframe': {
						width: 0,
						height: 0,
						display: 'none'
					}
				}}>
					<TextField
						id="filled-search"
						label="Tìm sản phẩm.."
						type="text"
						variant="outlined"
						size='small'
						fullWidth
						onChange={(e) => {
							setFilterProduct(e.target.value)
						}}
						value={filterProduct}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<CloseRoundedIcon onClick={() => setFilterProduct('')}
										sx={{
											display: filterProduct ? 'block' : 'none',
											cursor: 'pointer',
											fontSize: '20px',
											fill: '#fff'
										}}
									/>
								</InputAdornment>
							)
						}}
						sx={{
							'& .MuiSvgIcon-root': {
								color: '#fff',
								pt: '3px'
							},
							'& .MuiFormLabel-root': {
								right: 'unset !important',
								left: '0',
								backgroundColor: '#4f6f52',
								color: '#fff !important'
							},
							'&  .MuiOutlinedInput-root ': {
								fontSize: '16px',
								color: '#fff',
								' & .MuiOutlinedInput-notchedOutline': {
									border: '1px solid #fff !important',
								}
							}
						}}
					/>
					{filterProduct &&
						<Box sx={{
							position: 'absolute',
							zIndex: '9',
							backgroundColor: '#fff',
							left: '0',
							top: `calc(${SEARCH_HEIGHT} - 20px)`,
							right: '0',
							maxHeight: '400px',
							overflowY: 'auto',
							boxShadow: '4px 4px 8px #888888'
						}}>
							{test.map(product => (
								<Box
									key={product._id}
									onClick={() => handleAddShop(product)}
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										backgroundColor: 'rgba(0,0,0,0.03)',
										alignItems: 'center',
										boxShadow: '0px 0px 1px #888888',
										padding: '12px 0',
										textAlign: 'center',
										'& .MuiButtonBase-root, & .MuiTypography-body1  ': {
											color: 'primary.dark',
											minWidth: '100px',
											maxWidth: '100px'
										},
										'&:hover': {
											backgroundColor: 'rgba(0,0,0,0.1)',
											cursor: 'pointer'
										}
									}}>
									<Box sx={{ display: 'flex', padding: '0 12px', gap: '16px', alignItems: 'center', }}>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '360px', maxWidth: '360px' }}>
											<Avatar src={product.thumb} />
											<Typography variant='body2' sx={{ textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis' }}>
												{`${product.name} `}
											</Typography>

										</Box>
										<Typography sx={{ textTransform: 'uppercase' }}>{product.size}</Typography>
										<Typography sx={{ textTransform: 'uppercase' }}>{product.color === 'other' ? 'Không xác định' : product.color}</Typography>
									</Box>
									<Typography sx={{ textTransform: 'uppercase' }}>{product.material}</Typography>


									<Typography sx={{ color: 'secondary.main', fontWeight: '700' }}>{`${(new Intl.NumberFormat().format(product.price * 1000))} VND`}</Typography>

								</Box>
							))}
						</Box>}
					<iframe id="ifmcontentstoprint" ref={printTest}></iframe>
				</Box>
				<Box>
					<div>
						<Button
							variant='text'
							sx={{ color: '#fff', textTransform: 'unset' }}
							onClick={handleMenu}>
							<Typography variant="h6" >{user?.email}</Typography>
							<Avatar
								sx={{ bgcolor: 'sencondary.main', ml: '12px' }}
							/>
						</Button>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}

						>
							<MenuItem onClick={handleViewInfo} >Thông tin tài khoản</MenuItem>
							<MenuItem onClick={handleLogout} sx={{ color: 'error.main', textAlign: 'center' }}>Đăng xuất <LogoutIcon sx={{ ml: '8px' }} /> </MenuItem>
						</Menu>
					</div>
					<Dialog
						open={!!viewInfo}
						onClose={() => setViewInfo(false)}
						sx={{ '& .MuiPaper-root': { minWidth: '800px', maxWidth: '800px' } }}
					>
						<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
							Cập nhật thông tin cá nhân
						</DialogTitle>
						<DialogContent>
							<UpdateUser userDetail={userDetail} closeTest={() => setViewInfo(false)} updateDetailUser={updateDetailUser} />
						</DialogContent>
					</Dialog>
				</Box>
			</Box>
			<Box sx={{
				display: 'flex',
				boxSizing: 'border-box',
				height: '100vh',
				// width: '1200px',
				// m: '0 auto'
			}}>

				<Box sx={{ display: 'flex', flexDirection: 'column', flex: ' 0 0 70%' }} >


					<Box sx={{
						minHeight: LIST_HEIGHT,
						maxHeight: LIST_HEIGHT,
						overflowY: 'auto',
						p: '16px'
					}}>
						{isEmpty(productInShop) &&
							<Box >
								Chưa có sản phẩm nào cần thanh toán
							</Box>
						}
						{!isEmpty(productInShop) && productInShop?.map((proShop, index) => (

							<Box key={index}
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									px: '12px',
									mb: '20px',
									height: '60px',
									border: '1px solid #000',
									boxShadow: '4px 4px 8px #888888'
								}} >
								<Box sx={{
									display: 'flex',
									alignItems: 'center',
									minWidth: '320px',
									maxWidth: '320px'
								}}>
									<Avatar src={proShop?.productOrigin.thumb} />

									<Box sx={{ flex: '1', p: '0 20px' }}>
										<Typography variant='body1' sx={{ textTransform: 'capitalize', fontSize: '16px !important' }}>
											{proShop?.productOrigin.name}
										</Typography>
									</Box>

								</Box>



								<Box sx={{
									display: 'flex',
									alignItems: 'center',
									cursor: 'pointer',
									gap: '32px'
								}}
								>
									<Box sx={{
										display: 'flex',
										minWidth: '80px',
										maxWidth: '80px',
										alignItems: 'center',
										justifyContent: 'space-between',
										border: '1px solid #000',
										'& .MuiButtonBase-root': {
											p: '4px 12px',
											color: 'primary.dark',
											minWidth: '24px',
											maxWidth: '24px'
										}
									}}>
										<Button onClick={() => { handleMinusProduct(proShop) }}> <RemoveIcon /> </Button>
										<Typography variant='body1' >
											{proShop?.quantityInShop}
										</Typography>
										<Button onClick={() => { handlePlusProduct(proShop) }}> <AddIcon /> </Button>
									</Box>
									<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main' }}>
										{`${new Intl.NumberFormat().format(proShop?.productOrigin.price * 1000)} VND`}
									</Typography>
									<DeleteForeverIcon
										onClick={() => handleRemoveProduct(proShop)} />
								</Box>
							</Box>
						))}
					</Box>
				</ Box>

				<Box
					sx={{
						backgroundColor: 'rgba(79,111,82,0.3)',
						flex: ' 0 0 30%',
						minHeight: '100vh',
						maxHeight: '100vh',
						padding: '20px 12px'
					}}>
					<Box sx={{ position: 'relative' }}>
						<TextField
							id="filled-search"
							label="Số điện thoại khách hàng"
							type="text"
							variant="outlined"
							size='small'
							fullWidth
							onChange={(e) => {
								setFilterCustomer(e.target.value)
							}}
							value={filterCustomer}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<CloseRoundedIcon onClick={() => setFilterCustomer('')}
											sx={{
												display: filterCustomer ? 'block' : 'none',
												cursor: 'pointer',
												fontSize: '20px',
												fill: 'secondary.main'
											}}
										/>
									</InputAdornment>
								)
							}}
							sx={{
								'& .MuiSvgIcon-root': {
									color: 'primary.dark',
									pt: '3px'
								},
								'& .MuiFormLabel-root': {
									right: 'unset !important',
									left: '0',
									backgroundColor: 'transparent'
								},
								'&  .MuiOutlinedInput-root ': {
									fontSize: '16px',
									' & .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #000 !important'
									}
								}
							}}
						/>
						{filterCustomer && <Box sx={{
							position: 'absolute',
							backgroundColor: '#fff',
							boxShadow: '4px 4px 8px #888888',
							left: '0',
							right: '0',
							maxHeight: '200px',
							overflowY: 'auto',
							cursor: 'pointer'

						}}>
							{!isEmpty(customerList?.data) && customerList?.data.map(cus => (
								<Box key={cus._id} onClick={() => handleAddCustomer(cus)} sx={{
									p: '8px 12px', mt: '4px', '&:hover': {
										backgroundColor: '#ccc'
									}
								}}>
									<Typography variant='p'>{cus.fullname}</Typography>
									<Typography variant='p' sx={{ ml: '20px' }}>{cus.phone}</Typography>

								</Box>
							))}
							{isEmpty(customerList?.data) &&
								<Box sx={{ p: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
									<Typography variant='p'>Khách hàng chưa có trên hệ thống</Typography>
									<Button
										variant='text'
										sx={{ color: '#4f6f52', fontWeight: '700' }}
										onClick={handleOpenCreate}>
										Thêm khách hàng
									</Button>
									<Dialog
										open={openCreateNew}
										onClose={handleCloseCreate}
										sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
									>
										<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }} >
											Thêm thông tin khách hàng
										</DialogTitle>
										<DialogContent>
											<TextField
												label="Số điện thoại khách hàng"
												type="text"
												variant="outlined"
												size='small'
												fullWidth
												onChange={(e) => {
													setCustomerPhone(e.target.value)
												}}
												value={customerPhone}
												sx={{
													mt: '32px',
													'& .MuiSvgIcon-root': {
														color: 'primary.dark',
														pt: '3px'
													},
													'& .MuiFormLabel-root': {
														right: 'unset !important',
														left: '0',
														backgroundColor: 'transparent'
													},
													'&  .MuiOutlinedInput-root ': {
														fontSize: '16px',
														' & .MuiOutlinedInput-notchedOutline': {
															border: '1px solid #000 !important'
														}
													}
												}} />
											<TextField
												label="Tên khách hàng"
												type="text"
												variant="outlined"
												size='small'
												fullWidth
												onChange={(e) => {
													setCustomerName(e.target.value)
												}}
												value={customerName}
												sx={{
													mt: '20px',
													'& .MuiSvgIcon-root': {
														color: 'primary.dark',
														pt: '3px'
													},
													'& .MuiFormLabel-root': {
														right: 'unset !important',
														left: '0',
														backgroundColor: 'transparent'
													},
													'&  .MuiOutlinedInput-root ': {
														fontSize: '16px',
														' & .MuiOutlinedInput-notchedOutline': {
															border: '1px solid #000 !important'
														}
													}
												}} />
											<TextField
												label="Email khách hàng"
												type="text"
												variant="outlined"
												size='small'
												fullWidth
												onChange={(e) => {
													setCustomerEmail(e.target.value)
												}}
												value={customerEmail}
												sx={{
													mt: '20px',
													'& .MuiSvgIcon-root': {
														color: 'primary.dark',
														pt: '3px'
													},
													'& .MuiFormLabel-root': {
														right: 'unset !important',
														left: '0',
														backgroundColor: 'transparent'
													},
													'&  .MuiOutlinedInput-root ': {
														fontSize: '16px',
														' & .MuiOutlinedInput-notchedOutline': {
															border: '1px solid #000 !important'
														}
													}
												}} />
										</DialogContent>
										<DialogActions>
											<Button
												variant="contained"
												color="primary"
												size="large"
												onClick={createNewCustomer}
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
												Thêm khách hàng
											</Button>
										</DialogActions>
									</Dialog>

								</Box>
							}
						</Box>}
					</Box>

					<Box sx={{ borderBottom: '1px solid #000', pb: '20px' }}>
						{!!customerView &&
							<Box sx={{ borderBottom: '1px solid #000', }} >
								<Typography sx={{ mt: '20px' }} variant='h6'>
									Khách hàng:
								</Typography>

								<Typography variant='body1' sx={{ fontSize: '16px ! important', fontWeight: '700', color: '#4f6f52' }}>
									{customerView?.fullname}
								</Typography>

								<Typography variant='body1' sx={{ fontSize: '16px ! important', fontWeight: '700', color: '#4f6f52' }}>
									{customerView?.phone}
								</Typography>


							</Box>
						}

						<Typography sx={{ pb: '20px', borderBottom: '1px solid #000', my: '20px' }} variant='h6'>
							{`Số lượng: ${totalQuantityInShop} sản phẩm`}
						</Typography>

						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: '20px' }}>
							<Typography variant='body1' sx={{ fontSize: '16px ! important', }}>
								Phương thức thanh toán
							</Typography>
							<Box sx={{
								minWidth: '30%'
							}} >
								<FormControl
									sx={{
										maxWidth: '164px',
										minWidth: '164px',
										'& .MuiInputBase-root': {

											color: 'primary.dark',
											fontSize: '16px',
											'& div': {
												p: ' 8px 12px'
											},
											'& fieldset': {
												borderColor: '#000 !important',
											},
											background: 'transparent',
											'& .MuiOutlinedInput-notchedOutline': {
												border: '1px solid #000',
												borderColor: '#000',
												'&:hover': {
													borderColor: 'red !important',
												}
											}
										}
									}}>
									<Select
										value={payment}
										onChange={(e) => { setPayment(e.target.value) }}
										inputProps={{ MenuProps: { disableScrollLock: true } }}
									>
										<MenuItem value={'cash'}>Tiền mặt</MenuItem>
										<MenuItem value={'transfer'}>Chuyển khoản</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Box>

						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #000', pt: '20px' }}>
							<Typography variant='body1' sx={{ fontSize: '16px ! important', fontWeight: '700' }}>
								Tổng cộng
							</Typography>
							<Typography variant='body1' sx={{ fontWeight: '700', color: 'secondary.main', fontSize: '18px !important' }}>

								{`${new Intl.NumberFormat().format(totalPrice * 1000)} VND`}
							</Typography>
						</Box>

						<Box sx={{ py: '20px' }}>
							<Box sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								mt: '20px',
								'& a': {
									color: 'secondary.main',
									textDecoration: 'none'
								}
							}}>

								<Button
									variant="outlined"
									size="large"
									onClick={handlePrint}
									sx={{
										mr: '20px',
										fontSize: '16px',
										color: 'secondary.main',
										border: '1px solid #4f6f52',
										'&:hover': {
											backgroundColor: 'transparent',
											opacity: '0.9',
											border: '1px solid #4f6f52',
										}
									}}
								>
									In hóa đơn
								</Button>

								<Button
									variant="contained"
									color="primary"
									size="large"
									onClick={handleCheckout}
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
									Thanh toán
								</Button>
							</Box>
						</Box>

					</Box>
					<Box>

					</Box>
				</Box>
				<Box sx={{ display: 'none' }} ref={content}>
					<div style={{ textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '12px' }}>
						<h3 style={{ textTransform: 'uppercase' }}>tiemcur</h3>
						<h3 >138/8 Trần Hưng Đạo</h3>
					</div>
					<div style={{ textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '12px' }}>
						<h3 style={{ textTransform: 'uppercase' }}>Phiếu thanh toán</h3>
						<div style={{ display: 'flex', gap: '12px' }}>
							<div >
								<div style={{ display: 'flex', gap: '4px' }}>
									<p>Ngày: </p>
									<p >{formatDate(new Date().toISOString())}</p>
								</div>
								<div style={{ display: 'flex', gap: '4px' }}>
									<p>Giờ: </p>
									<p >{formatTime(new CustomDate().toISOString())}</p>
								</div>
							</div>
							<div>
								<div style={{ display: 'flex', gap: '4px' }}>
									<p>Khách hàng: </p>
									<p >{!customerView ? 'Khách lẻ' : customerView?.fullname}</p>
								</div>
								<div style={{ display: 'flex', gap: '4px' }}>
									<p>Số điện thoại: </p>
									<p >{!customerView ? 'Không có' : customerView?.phone}</p>
								</div>
							</div>

						</div>
					</div>
					<div >
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>

							<p style={{ fontWeight: '700', textTransform: 'capitalize', fontSize: '12 !important' }}>
								Tên sản phẩm
							</p>
							<p style={{ fontWeight: '700', textTransform: 'capitalize', fontSize: '12 !important' }}>
								Kích thước
							</p>
							<p style={{ fontWeight: '700', textTransform: 'capitalize', fontSize: '12 !important' }}>
								Số lượng
							</p>
							<p style={{ fontWeight: '700', fontSize: '12 !important' }}>
								Giá bán
							</p>
							<p style={{ fontWeight: '700', fontSize: '12 !important' }}>
								Tổng tiền
							</p>

						</div>
						{productInShop?.map((proShop, index) => (
							<div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>

								<p style={{ textTransform: 'capitalize', fontSize: '12px !important' }}>
									{proShop?.productOrigin.name}
								</p>
								<p style={{ textTransform: 'capitalize', fontSize: '12px !important' }}>
									{proShop?.productOrigin.size}
								</p>
								<p style={{ textTransform: 'capitalize', fontSize: '12px !important' }}>
									{proShop?.quantityInShop}
								</p>
								<p style={{ fontWeight: '700', color: 'secondary.main' }}>
									{`${new Intl.NumberFormat().format(proShop?.productOrigin.price * 1000)} `}
								</p>
								<p style={{ fontWeight: '700', color: 'secondary.main' }}>
									{`${new Intl.NumberFormat().format(proShop?.productOrigin.price * proShop?.quantityInShop * 1000)} `}
								</p>

							</div>
						))}
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
						<p>Tổng cộng: </p>
						<p style={{ fontWeight: '700', color: 'secondary.main' }}>
							{`${new Intl.NumberFormat().format(totalPrice * 1000)} `}
						</p>
					</div>
				</Box>
			</Box >
		</Box >
	)
}

export default Management
