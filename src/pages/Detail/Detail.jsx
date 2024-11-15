import { Link, useParams } from 'react-router-dom'
import { getProductById } from '~/apis/mock'
import { Box, Button, Typography } from '@mui/material'
import Footer from '~/components/Footer/Footer'
import Header from '~/components/Header/Header'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById_API } from '~/apis/index'
import { addToCart } from '~/redux/cart'
import { toast } from 'react-toastify'
function Detail() {
	const { id } = useParams()
	const [detail, setDetail] = useState({})
	useEffect(() => {
		getProductById_API('tiemcur', id).then((data) => setDetail({ ...data, price: parseInt(data.price) }))
	}, [id])
	// const detail = getProductById(id)


	const productType = detail?.type === 'top' ? 'shirt' : 'pant'
	const remain = detail.quantity - detail.sold
	const [isShow, setIsShow] = useState(false)

	// const cart = useSelector(state => state.cart.items)

	const dispatch = useDispatch()
	const handleAddToCart = () => {
		toast('Đã thêm sản phẩm vào giỏ hàng')
		dispatch(addToCart({
			id,
			quantity: 1,
			totalQuantity: detail.quantity
		}))
	}
	const handleAddToCheckout = () => {
		dispatch(addToCart({
			id,
			quantity: 1,
			totalQuantity: detail.quantity
		}))
	}

	const originContent = detail?.description?.split('\n')
	const originContentLength = originContent?.length

	const [contents, setContents] = useState(originContent)

	const handleShowAllContent = () => {
		setIsShow(false)
		setContents(originContent)
	}

	useEffect(() => {
		if (originContentLength > 3) {
			const contentsTemp = contents?.filter((t, i) => i <= 2)
			setIsShow(true)
			setContents(contentsTemp)
		} else {
			handleShowAllContent()
		}
	}, [])


	return (
		<Box >
			<Header detail />
			<Box sx={{
				padding: '0 20px',
				m: '120px auto',
				maxWidth: '1200px',
				display: 'flex',
				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				justifyContent: {
					xs: 'space-between',
					md: 'none'
				},

			}}>

				<Box sx={{
					flex: {
						xs: '0 0 50%',
						lg: '0 0 100%'
					},
					maxWidth: {
						xs: '100%',
						lg: '50%'
					}
				}}>
					<img src={detail.thumb} style={{ minWidth: '100%%', maxWidth: '100%' }} alt="" />

				</Box>

				<Box sx={{
					pl: {
						xs: '0',
						md: '40px'
					},
					display: {
						xs: 'flex',
						md: 'block'
					},
					flexDirection: 'column'
				}}>
					<Box>
						<Typography variant='h3'
							sx={{
								textTransform: 'uppercase',
								textAlign: {
									xs: 'center',
									md: 'left'
								},
								fontSize: {
									xs: '32px',
									md: '48px'
								}
							}}>
							{`${detail.name} `}
						</Typography>

						<Typography variant='h6'
							sx={{
								m: '8px 0',
								textAlign: {
									xs: 'center',
									md: 'left'
								},
							}}>
							{parseFloat(`${(detail.price - (detail.price * (detail.savePercent / 100)))}`).toFixed(1) + '00 VND'}
						</Typography>

						{
							!!detail.savePercent &&
							<Typography gutterBottom variant="body1" component="p"
								sx={{
									textDecoration: 'line-through',
									color: '#888',
									textAlign: {
										xs: 'center',
										md: 'left'
									},
								}}>
								{`${detail.price}.000 vnd`}
							</Typography>
						}
					</Box>

					<Box sx={{
						order: '3',
						mt: {
							xs: '20px',
							md: '0'
						}
					}}>
						<Typography variant='h6' sx={{ fontSize: '20px', fontWeight: '700' }}>
							Chi tiết sản phẩm:
						</Typography>
						<Box sx={{
							m: '12px 0',
							'& .MuiTypography-body1': {
								fontSize: '16px'
							}
						}}>
							<Box sx={{
								display: 'flex',
								gap: '16px',
								mb: '8px'
							}}>
								<Typography variant='body1'>
									Kích thước: {detail?.size?.toUpperCase()}
								</Typography>
								<Typography variant='body1'>
									Chất liệu: {detail.material}
								</Typography>
								<Typography variant='body1'>
									Số lượng: {detail.quantity}
								</Typography>
							</Box>

							{contents?.map((content, index) => {
								return (
									<Typography
										variant="body1"
										component="p" key={index}
									>
										{content}
									</Typography>
								)
							}
							)}

							{isShow && <Typography
								variant="body1"
								component="p"
								onClick={() => handleShowAllContent()}
								sx={{ cursor: 'pointer', fontWeight: 'bold' }}
							>
								Xem thêm
							</Typography>}
						</Box>

						<Box>

							<Typography variant='h6' sx={{ fontSize: '20px', fontWeight: '700' }}>
								Size Chart:
							</Typography>
							<img src={productType == 'shirt' ?
								'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721376583/bang-size-ao-danh-cho-nam-va-nu-chuan-nhat-hien-nay-2_oxeesi.jpg' :
								'https://res.cloudinary.com/dwa6hiofs/image/upload/v1721376591/sizePant_ak6pzc.png'}
								style={{
									minWidth: '200px',
									maxWidth: '200px'
								}}
								alt="" />
						</Box>
					</Box>

					<Box sx={{
						display: 'flex',
						justifyContent: 'space-between',
						gap: {
							xs: '2px',
							md: '8px'
						},
						order: '2',
						flexDirection: {
							xs: 'column',
							md: 'row'
						}
					}}>
						<Button variant="contained"
							onClick={handleAddToCheckout}
							sx={{
								backgroundColor: 'primary.dark',
								flex: '1',
								textTransform: 'uppercase',
								fontSize: '16px',
								transform: 'translateY(20px)',
								transition: 'all linear .3s',
								p: '0',
								borderRadius: '8px',
								mb: {
									xs: '2px',
									md: '16px'
								},
								'&:hover': {
									backgroundColor: 'primary.dark',
									opacity: '0.8'
								},
								'& a': {
									color: 'primary.main',
									textDecoration: 'none',
									width: '100%',
									padding: '8px 0'
								},
							}}> <Link to='/checkout' > Mua ngay</Link></Button>
						<Button variant="contained" onClick={handleAddToCart}
							sx={{
								backgroundColor: 'primary.main',
								color: 'primary.dark',
								padding: '8px 12px',
								textTransform: 'uppercase',
								fontSize: '16px',
								minWidth: '45%',
								transform: 'translateY(20px)',
								transition: 'all linear .3s',
								mb: '16px',
								borderRadius: '8px',
								border: '1px solid #000',
								'&:hover': {
									backgroundColor: 'primary.main',
									opacity: '0.8'
								}
							}}> Thêm vào giỏ hàng</Button>
					</Box>

				</Box>
			</Box>
			<Footer />
		</Box >
	)
}

export default Detail