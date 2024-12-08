import { useEffect, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import Chart from '~/components/Chart/Chart'
import { TEST_getAllOrder_API, getMonthList_API } from '~/apis/index'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { formatToChart, formatDate, getDatabyDay, formatTime, getAllDayData, formatDateForTextField } from '~/untils/format'
import CustomDate from '~/untils/customDate'
import { TextField } from '@mui/material'
import { toast } from 'react-toastify'
function Overview() {
	const [slug] = useState('tiemcur')
	const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1)
	const [filterDate, setFilterDate] = useState(formatDateForTextField(new Date().toISOString()))
	const [allOrder, setAllOrder] = useState([])
	const [monthList, setMonthList] = useState([])
	useEffect(() => {
		const currentYear = new Date().getFullYear();
		let newFilterDate;

		if (filterMonth === new Date().getMonth() + 1) {
			// If the selected month is the current month, set filterDate to today's date
			newFilterDate = new Date()
		} else if (filterMonth === new Date().getMonth()) {
			// If the selected month is the last month, set filterDate to the last day of the previous month
			const lastDayOfPreviousMonth = dayjs(new Date(currentYear, filterMonth - 1, 1)).endOf('month').toDate();
			newFilterDate = lastDayOfPreviousMonth
		} else {
			// For other months, set to the first day of the selected month
			newFilterDate = new Date(currentYear, filterMonth - 1, 1);
		}

		setFilterDate(formatDateForTextField(newFilterDate.toISOString()));
	}, [filterMonth])
	useEffect(() => {
		getMonthList_API(slug).then((month) => setMonthList(month))
	}, [])
	useEffect(() => {
		TEST_getAllOrder_API(slug, filterMonth).then((month) => setAllOrder(month))
	}, [filterMonth])

	const totalRevenue = useMemo(() => {
		return allOrder?.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.totalPrice
		}, 0)
	}, [allOrder])

	const dataChart = useMemo(() => {
		return formatToChart(allOrder, filterMonth)
	}, [allOrder])
	const allDayData = useMemo(() => {
		return getAllDayData(allOrder)
	}, [allOrder])

	const dataByDay = useMemo(() => {
		return getDatabyDay(allOrder, formatDate(new Date(filterDate).toISOString()))
	}, [allOrder, filterDate])


	return (
		<Box sx={{ maxWidth: '1200px', minWidth: '1200px', m: '20px auto', }}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column'
			}}>
				<Box sx={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
					<Box sx={{ borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='h6' sx={{
							fontWeight: '700',
						}}>{`Báo cáo bán hàng tháng ${filterMonth}`}</Typography>

						<Box sx={{
							maxWidth: {
								xs: '100%',
								md: '200px'
							},
							minWidth: {
								xs: '100%',
								md: '200px'
							},
							mb: '8px',
							background: 'transparent',
							'& .MuiInputBase-root': {
								color: 'primary.dark',
								fontSize: '18px',
								'& div': {
									p: ' 8px 12px'
								},
								'& fieldset': {
									borderColor: '#000 !important',
								},

								'& .MuiOutlinedInput-notchedOutline': {
									border: '1px solid #000',
									borderColor: '#000'
								}
							}
						}}>

							<FormControl fullWidth>
								<Select
									value={filterMonth || ''}
									inputProps={{ MenuProps: { disableScrollLock: true } }}
									onChange={(e) => { setFilterMonth(parseInt(e.target.value)) }}
									defaultValue=""
								>
									{!isEmpty(monthList) && monthList.map((item, index) => (
										<MenuItem key={index} value={`${item}`} >{`Tháng ${item}`}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>

					</Box>
					<Box>
						<Typography variant='h6' sx={{
							color: 'secondary.main',
							fontWeight: '700',
							mt: '12px'
						}} >{`Tổng số hóa đơn: ${allOrder.length}`}</Typography>
						<Box sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							'& .MuiTypography-h6': {
								fontWeight: '700',
								minWidth: '200px',
								maxWidth: '200px',
								textAlign: 'center'
							}
						}}>
							<Typography variant='h6' >
								Ngày
							</Typography>
							<Typography variant='h6' >
								Số lượng hóa đơn
							</Typography>
							<Typography variant='h6' >
								Số lượng sản phẩm
							</Typography>
							<Typography variant='h6' >
								Tổng doanh thu
							</Typography>
						</Box>
						{!isEmpty(allDayData) && allDayData.map((data, index) => (
							<Box key={index} sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								mt: '12px',
								'& .MuiTypography-body1': {
									fontSize: '18px !important',
									minWidth: '200px',
									maxWidth: '200px',
									textAlign: 'center'
								}
							}}>
								<Typography variant='body1' >
									{` ${data.date}/${filterMonth}`}
								</Typography>
								<Typography variant='body1' >
									{`${data.order.length}`}
								</Typography>
								<Typography variant='body1' >
									{`${data.order.map(d => d.productList.map(a => a.quantity)).flat().reduce((a, b) => { return a + b }, 0)}`}
								</Typography>
								<Typography variant='body1' sx={{ color: 'secondary.main', fontWeight: '700' }} >
									{`${new Intl.NumberFormat().format(dataChart.find(a => a.date === data.date.toString())?.revenue)} VND`}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>

				<Box sx={{ borderBottom: '1px solid #ccc', pb: '20px' }} >
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 32px 0' }}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Typography variant='h5'>{`Tổng doanh thu tháng ${filterMonth}: `} </Typography>
							<Typography variant='h4' sx={{ color: 'secondary.main', ml: '12px', fontWeight: '700' }}>
								{`${new Intl.NumberFormat().format(totalRevenue * 1000)} VND`}
							</Typography>
						</Box>
						<Box>

						</Box>
					</Box>

					{!isEmpty(dataChart) && <Chart type={'Tổng quan'} dataChart={dataChart} />}
				</Box>

				<Box sx={{ padding: '20px' }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', alignItems: 'center' }}>
						<Typography variant='h6' >{`Chi tiết hóa đơn bán hàng ngày ${formatDate(new Date(filterDate).toISOString())} `}</Typography>

						<Box sx={{
							mb: '8px',
							minWidth: '200px',
							maxWidth: '200px',
							'& .MuiFormLabel-root': {
								fontSize: '16px',
								right: 'auto',
								left: '0'
							},
							'&  .MuiOutlinedInput-root ': {
								fontSize: '16px',
								' & .MuiOutlinedInput-notchedOutline': {
									border: '1px solid #000 !important'
								}
							}
						}}>
							<TextField
								fullWidth
								type="date"
								variant="outlined"
								size='small'
								label="Ngày"
								value={filterDate}
								onChange={(e) => {
									const selectedDate = new Date(e.target.value)
									const selectedMonth = selectedDate.getMonth() + 1

									if (selectedMonth !== filterMonth) {
										toast.error('Bạn không thể thay đổi tháng/năm.', { position: 'bottom-right' })
										return
									}
									setFilterDate(e.target.value)

								}}
								InputLabelProps={{ shrink: true }}
							/>

						</Box>
					</Box>
					<Box sx={{
						borderBottom: '1px solid #ccc'
					}} >
						{dataByDay === 'Giá trị đầu vào không hợp lệ.' &&
							<Box>
								Giá trị đầu vào không hợp lệ
							</Box>
						}
						{isEmpty(dataByDay) &&
							<Box>
								Không có đơn hàng nào
							</Box>
						}
						{!isEmpty(dataByDay) &&
							<Box>
								{dataByDay.map(data => (
									<Box key={data._id} sx={{ borderBottom: '1px solid #4F6F52', margin: '12px 0' }}>
										<Typography variant='h6'
											sx={{ mt: '20px', '& span': { fontWeight: 'bold' } }}>
											<span>Thời gian:</span> {formatTime(data.createAt)}</Typography>
										<Typography variant='h6'
											sx={{ mt: '20px', display: 'flex', flexDirection: 'column' }}>
											<b>Thông tin khách hàng:</b>
											<span style={{ textTransform: 'capitalize' }}>
												{data.customerFullname}
											</span>
											<span>
												{data.customerEmail}
											</span>
											<span>
												{data.customerPhone}
											</span>
										</Typography>
										<Typography variant='h6'
											sx={{ '& span': { fontWeight: 'bold' } }}
										> <span> Phương thức thanh toán: </span>
											{data.type === 'online' ? 'Mua hàng Online' : 'Mua hàng tại Online'}
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
										<Box sx={{ display: 'flex', flexWrap: 'wrap', mb: '12px', justifyContent: 'space-around' }} >
											{data.productList.map((pro) => (
												<Box key={pro.productID} >
													<Box sx={{
														mt: '20px',
														'& img': {
															width: '100px',
															height: '100px',
															m: '8px 0'
														}
													}} >
														<Box sx={{ textAlign: 'center' }}>
															<Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{pro.productDetails.name}</Typography>
															<img src={pro.productDetails.thumb} alt="" />
															<Typography variant='body1'
																sx={{ '& span': { fontWeight: 'bold', textTransform: 'uppercase' } }}
															> Kích thước: <span>{pro.productDetails.size}</span></Typography>
															<Typography variant='body1'
																sx={{ '& span': { fontWeight: 'bold', textTransform: 'uppercase' } }}>
																Giá tiền:
																<span>

																	{`${(new Intl.NumberFormat().format(pro.productDetails.price * 1000))} VND`}
																</span>
															</Typography>
															<Typography variant='body1'
																sx={{ '& span': { fontWeight: 'bold', textTransform: 'uppercase' } }}
															>
																Số lượng:
																<span>
																	{pro.quantity}
																</span>
															</Typography>
														</Box>
													</Box>
												</Box>
											))
											}
										</Box>
									</Box>
								))}
							</Box>
						}
					</Box>
				</Box>




			</Box>

		</Box >
	)
}

export default Overview