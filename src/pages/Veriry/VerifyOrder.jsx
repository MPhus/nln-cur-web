import { Box, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { veriryOderToken_API, orderStatusZaloPay_API } from '~/apis/index'
import { removeAllItem } from '~/redux/cart'
import { useDispatch } from 'react-redux'
function VerifyOrder() {
	const dispatch = useDispatch()
	const { token } = useParams()
	const [test, setTest] = useState({ mess: '' })
	const natigate = useNavigate()
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (token === 'zaloPaySuccess') {
			const apptransid = searchParams.get('apptransid')
			orderStatusZaloPay_API('tiemcur', apptransid)
				.then((data) => {
					if (data.return_code === 1) {
						dispatch(removeAllItem())
						setTimeout(() => {
							natigate('/')
						}, 5000)
						setTest({ mess: 'Is valid', dataSave: undefined })
					} else {
						setTimeout(() => {
							natigate('/cart')
						}, 5000)
						setTest({ mess: 'Looix', dataSave: undefined })
					}
				})
		} else {
			veriryOderToken_API(token)
				.then((res) => {
					dispatch(removeAllItem())
					setTimeout(() => {
						natigate('/')
					}, 5000)
					setTest({ mess: res.message, dataSave: res.data })
				})
				.catch((err) => {
					setTimeout(() => {
						natigate('/cart')
					}, 5000)
					setTest({ mess: err.message, dataSave: undefined })
				})
		}
	}, [token])

	return (
		<Box>
			{!!test.mess && test.mess === 'Is valid' &&
				<Box>
					<Typography variant='h3'>Cảm ơn bạn đã đặt hàng tại TiemCur</Typography>
					<Typography variant='h4'>Đơn hàng được đặt thành công</Typography>
					<Button
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
						Tiếp tục mua hàng
					</Button>
				</Box>
			}
			{!!test.mess && test.mess !== 'Is valid' &&
				<Box>
					<Typography variant='h3'>Có lỗi trong quá trình đặt hàng</Typography>
					<Typography variant='h4'>Bạn vui lòng thử lại sau</Typography>
					<Button
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
						Về giỏ hàng của bạn
					</Button>
				</Box>
			}
		</Box>
	)
}

export default VerifyOrder