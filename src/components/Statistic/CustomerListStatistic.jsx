import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Pagination from '@mui/material/Pagination'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import SearchIcon from '@mui/icons-material/Search'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { isEmpty } from 'lodash'
import Tooltip from '@mui/material/Tooltip';
import { fetchCustomer_API, fetchOrderByCustomer_API } from '~/apis/index'
import { Alert } from '@mui/material'
import { formatDateHaveTime } from '~/untils/format'

function CustomerListStatistic() {
	const [customerList, setCustomerList] = useState(undefined)
	const [closeIcon, setCloseIcon] = useState('')
	const [order, setOrder] = useState([])
	console.log('order: ', order)
	const [openDetail, setOpenDetail] = useState(false)

	const [searchText, setSearchText] = useState('')
	const [numberOfPage, setNumberOfPage] = useState(1)

	const totalPage = customerList?.totalPage
	console.log('customerList: ', customerList)
	const totalProduct = customerList?.totalCustomer
	useEffect(() => {
		const filter = { fullname: '', page: numberOfPage, limit: 10, email: '', phone: '', searchtext: searchText }
		// fetchCustomer_API('tiemcur', filter).then(data => setCustomerList(data))
		fetchCustomer_API('tiemcur', filter).then(data => setCustomerList(data))

	}, [numberOfPage, searchText])

	const handlePageShowCustomer = (e, v) => {
		setNumberOfPage(v)
	}
	useEffect(() => {
		return () => {
			setNumberOfPage(1)
		}
	}, [])

	const handleViewDetail = (data) => {
		fetchOrderByCustomer_API('tiemcur', data)
			.then((t) => setOrder(t))
		setOpenDetail(data.email === '' ? 'Các khách lẻ' : data.email)
	}
	const handleCloseViewDetail = () => {
		setOpenDetail(false)

	}
	return (
		<Box sx={{ maxWidth: '1200px', minWidth: '1200px', m: '40px auto', }}>
			<Box>
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: '#fff',
					padding: '40px 20px',
					borderRadius: '8px',
					mb: '40px',
				}}>
					<Typography variant='h4' sx={{ color: 'secondary.main', fontWeight: '700' }} >Tổng số Khách hàng: {totalProduct}</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
						<TextField
							id="filled-search"
							label="Search"
							type="text"
							variant="outlined"
							size='small'
							onChange={(e) => {
								setSearchText(e.target.value)
							}}
							value={searchText}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<CloseRoundedIcon onClick={() => setCloseIcon('')}
											sx={{
												display: searchText == '' ? 'block' : 'none',
												cursor: 'pointer',
												fontSize: '16px'
											}}
										/>
									</InputAdornment>
								)
							}}
							sx={{
								minWidth: 320,
								maxWidth: 320,
								'& .MuiSvgIcon-root': {
									color: 'primary.dark',
									pt: '3px'
								},
								'& .MuiFormLabel-root': {
									right: 'unset !important',
									left: '0',
									backgroundColor: '#fff'
								},
								'&  .MuiOutlinedInput-root ': {
									fontSize: '16px',
									' & .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #000 !important'
									}
								}
							}}
						/>
					</Box>
				</Box>

				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#fff',
					padding: '20px 0',
					borderRadius: '8px'
				}}>
					<Box sx={{
						display: 'flex',
						borderBottom: '1px solid #000',
						justifyContent: 'space-between',
						'& .MuiButtonBase-root ': {
							fontWeight: '700',
							color: 'primary.dark',
							minWidth: '100px',
						}
					}}>
						<Button variant='text' sx={{ flex: '1' }}>Tên khách hàng</Button>
						<Button variant='text' sx={{ flex: '1' }} >Email</Button>
						<Button variant='text' sx={{ flex: '1' }} >Số điện thoại</Button>
						<Button variant='text' sx={{ flex: '1' }}>Xem chi tiết lịch sử mua hàng</Button>
					</Box>

					<Box sx={{}} >
						{customerList && customerList?.data.map((customer, index) => {
							return (
								<Box key={index} sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									boxShadow: '0px 0px 1px #888888',
									padding: '12px 0',
									textAlign: 'center',
									'& .MuiButtonBase-root, & .MuiTypography-body1  ': {
										color: 'primary.dark',
										minWidth: '100px'
									}
								}}>

									<Typography sx={{ flex: '1' }}>{customer.fullname}</Typography>
									<Typography sx={{ flex: '1' }}>{customer.email}</Typography>
									<Typography sx={{ flex: '1' }}>{customer.phone}</Typography>
									<Button sx={{ flex: '1' }} variant='text' onClick={() => { handleViewDetail({ email: customer.email, webId: customer.webId }) }}  ><MoreHorizIcon sx={{ color: '#888' }} /></Button>
								</Box>
							)
						})}
						<Dialog
							open={!!openDetail}
							onClose={handleCloseViewDetail}
							sx={{ '& .MuiPaper-root': { minWidth: '800px', maxWidth: '800px' } }}
						>
							<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
								{`Lịch sử mua hàng của ${openDetail}`}
								<Tooltip title="Đóng ">
									<CloseIcon onClick={handleCloseViewDetail} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />

								</Tooltip>
							</DialogTitle>
							<DialogContent >
								{!isEmpty(order) && order.map(data => (
									<Box key={data._id} sx={{ borderBottom: '1px solid #4F6F52', margin: '12px 0' }}>
										<Typography variant='h6'
											sx={{ mt: '20px', '& span': { fontWeight: 'bold' } }}>
											<span>Thời gian:</span> {formatDateHaveTime(data.createAt)}</Typography>
										<Typography variant='h6'
											sx={{ '& span': { fontWeight: 'bold' } }}
										> <span> Phương thức thanh toán: </span>
											{data.type === 'online' ? 'Mua hàng Online' : 'Mua hàng Online'}
											{'  -  '}
											{data.payMethod === 'cash' ? 'Thanh toán bằng tiền mặt' : 'Thanh toán bằng chuyển khoản'}

										</Typography>
										<Box sx={{ m: '12px 0' }}>
											<Typography variant='h6'
												sx={{ '& span': { color: '#4F6F52' }, fontWeight: 'bold' }}
											>Giá tiền: <span>{`${(new Intl.NumberFormat().format(data.totalPrice * 1000))} VND`}</span></Typography>
											<Typography variant='h6'
												sx={{ '& span': { color: '#4F6F52' }, fontWeight: 'bold' }}
											>Phí giao hàng: <span> {`${(new Intl.NumberFormat().format(data.tranportFee * 1000))} VND`}</span> </Typography>
										</Box>

										<Typography variant='h6' sx={{ fontWeight: 'bold' }}>Thông tin sản phẩm:</Typography>
										<Box >
											{data.productList.map((pro) => (
												<Box key={pro.productID}>
													<Box sx={{
														display: 'flex',
														height: '120px',
														width: '100%',
														mt: '20px',
														'& img': {
															width: '100px',
															height: '100px'
														}
													}} >
														<Box sx={{ position: 'relative', height: '100%', alignSelf: 'center' }}>
															<img src={pro.productDetails.thumb} alt="" />
															<Box sx={{
																position: 'absolute',
																top: '-8px',
																right: '-8px',
																backgroundColor: 'secondary.main',
																color: '#fff',
																minWidth: '28px',
																maxWidth: '28px',
																borderRadius: '50%',
																minHeight: '28px',
																maxHeight: '28px',
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center'
															}}>
																<Typography sx={{
																	fontSize: '16px !important',
																	textAlign: 'center',
																	minWidth: '16px',
																	maxWidth: '16px',
																	minHeight: '16px',
																	maxHeight: '16px',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center'
																}}>
																	{pro.quantity}
																</Typography>
															</Box>
														</Box>
														<Box sx={{ flex: 1, ml: '24px' }}>
															<Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
																{pro.productDetails.name}
															</Typography>

															<Typography variant='h6'>
																Size: {pro.productDetails.size.toUpperCase()}
															</Typography>
														</Box>
														<Typography variant='h6' sx={{ color: 'secondary.main', fontWeight: 'bold', justifySelf: 'flex-end' }}>
															{`${(new Intl.NumberFormat().format(pro.productDetails.price * pro.quantity * 1000))} VND`}
														</Typography>

													</Box>
												</Box>
											))
											}
										</Box>
									</Box>
								))}
							</DialogContent>
							{/* <DialogActions>
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
							</DialogActions> */}
						</Dialog>
					</Box>
					<Box>
						{customerList &&
							<Pagination
								onChange={handlePageShowCustomer}
								size='large'
								page={numberOfPage}
								count={totalPage}
								defaultPage={1}
								variant="outlined"
								sx={{
									maxWidth: '1200px',
									margin: ' 32px auto 0',
									padding: {
										xs: '0 0 100px 0',
										md: '0 40px 100px 0'
									},
									'& .MuiPagination-ul': {
										justifyContent: {
											xs: 'center',
											md: 'flex-end'
										}
									},
									'& .MuiButtonBase-root': {
										color: 'primary.dark'
									},
									'& .MuiPaginationItem-root': {
										borderColor: '#000'
									},
									'& .MuiPaginationItem-root:hover': {
										opacity: '0.8'
									}
								}} />
						}
					</Box>
				</Box>

			</Box>

		</Box>
	)
}

export default memo(CustomerListStatistic)