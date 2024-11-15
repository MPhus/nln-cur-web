// import { Box, Button, Typography } from '@mui/material'
// import { useEffect, useState } from 'react'
// import { useParams, useLocation, Link } from 'react-router-dom'
// import { fetchBankList_API, createNewCustomerOrderWithCash_API } from '~/apis/index'
// import MuitlpleBankSvgIcon from '~/components/MuitlpleBankSvgIcon/MuitlpleBankSvgIcon'
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
// import CheckIcon from '@mui/icons-material/Check'
// import Radio from '@mui/material/Radio'
// function ConfirmOrder() {
// 	const [bankList, setBankList] = useState(null)

// 	const [bank36, setBank36] = useState(null)
// 	const [bank38, setBank38] = useState(null)
// 	console.log('bank38: ', bank38)
// 	const [bank39, setBank39] = useState(null)
// 	const [zaloMethod, setZaloMethod] = useState(null)


// 	useEffect(() => {
// 		setBank36(bankList?.banks['36'][0])
// 		setBank38(bankList?.banks['38'][0])
// 		setBank39(bankList?.banks['39'])
// 	}, [bankList])
// 	useEffect(() => {
// 		setBank('')
// 	}, [zaloMethod])

// 	const [bank, setBank] = useState('')

// 	const { payMethod } = useParams()
// 	const location = useLocation()
// 	const data = location.state
// 	useEffect(() => {
// 		switch (payMethod) {
// 			case 'cash':
// 				createNewCustomerOrderWithCash_API('tiemcur', data)
// 				setBankList(null)

// 				break;
// 			case 'zaloPay':
// 				fetchBankList_API('tiemcur').then((test) => setBankList(test))
// 				break;

// 			default:
// 				break;
// 		}

// 	}, [])
// 	const handleChangeBank = (e) => {
// 		setBank(e.currentTarget.getAttribute('key2'))
// 	}

// 	const handleChangePayMethod = (e) => {
// 		setZaloMethod(e.target.value)
// 	}
// 	const handlePay = () => {
// 	}

// 	return (
// 		<Box>
// 			{!bankList &&

// 				<Box>
// 					Check Email
// 				</Box>

// 			}
// 			{bankList &&
// 				<Box sx={{
// 					maxWidth: '1200px',
// 					margin: '0 auto'
// 				}} >
// 					<Typography variant={'h4'}>Vui lòng chọn phương thức thanh toán</Typography>
// 					<Box>
// 						<Radio
// 							checked={zaloMethod === bank36?.bankcode}
// 							onChange={handleChangePayMethod}
// 							value={bank36?.bankcode}
// 							sx={{ color: 'red !important' }}
// 							name="radio-buttons"
// 						/>
// 						{bank36?.name}
// 					</Box>
// 					<Box>
// 						<Radio
// 							checked={zaloMethod === bank38?.bankcode}
// 							onChange={handleChangePayMethod}
// 							value={bank38?.bankcode}
// 							sx={{ color: 'red !important' }}
// 							name="radio-buttons"
// 						/>
// 						{bank38?.name}
// 					</Box>
// 					<Box>
// 						<Radio
// 							checked={zaloMethod === 'ATM'}
// 							onChange={handleChangePayMethod}
// 							value={'ATM'}
// 							sx={{ color: 'red !important' }}
// 							name="radio-buttons"
// 						/>
// 						Thẻ ATM
// 					</Box>
// 					<Box sx={{
// 						display: 'grid',
// 						gridTemplateColumns: 'repeat(4, 1fr)',
// 						gridColumnGap: '10px',
// 						gridRowGap: '10px',
// 						maxWidth: 600,
// 					}}>
// 						{zaloMethod == 'ATM' && bank39?.map((item) => {
// 							return (
// 								<Button
// 									key={item.bankcode}
// 									key2={item.bankcode}
// 									sx={{
// 										position: 'relative',
// 										flexDirection: 'column',
// 										color: 'red',
// 										border: bank === item.bankcode ? '2px solid green' : '2px solid #ccc',
// 									}}
// 									onClick={handleChangeBank}
// 									startIcon={<CheckIcon sx={{
// 										position: 'absolute',
// 										top: '-8px',
// 										right: '-8px',
// 										display: bank === item.bankcode ? 'block' : 'none',
// 										color: '#fff',
// 										backgroundColor: 'green',
// 										borderRadius: '50%'
// 									}} />}
// 								>
// 									<MuitlpleBankSvgIcon bankNames={item.name.replace(/\s/g, '')} />

// 									{item.name}

// 								</Button>
// 							)
// 						})}
// 					</Box>

// 					<Button
// 						type="submit"
// 						variant="contained"
// 						color="primary"
// 						size="large"
// 						onClick={handlePay}
// 						sx={{
// 							backgroundColor: 'secondary.main',
// 							my: '20px',
// 							color: 'primary.main',
// 							transition: 'all linear .3s',
// 							'&:hover': {
// 								backgroundColor: 'secondary.main',
// 								opacity: '0.9'
// 							}
// 						}}
// 					>
// 						Thanh Toán
// 					</Button>
// 				</Box>

// 			}

// 		</Box>
// 	)
// }

// export default ConfirmOrder