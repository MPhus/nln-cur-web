import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, MenuList, SvgIcon, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { ReactComponent as EmptyCart } from '~/assets/svgIcon/empty-cart.svg'
import { useSelector, useDispatch } from 'react-redux'
import { getProductById_API } from '~/apis/index'
import { changeQuantity, removeItem } from '~/redux/cart'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import { isEmpty } from 'lodash'

function Cart() {
	const dispatch = useDispatch()
	const [productList, setProductList] = useState([])
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
	// 		...test,
	// 		quantityInCart: item.quantity
	// 	}
	// })

	const isProductListEmpty = isEmpty(productList)
	let totalPrice
	if (productList) {
		totalPrice = productList.map(product => (product.price - (product.price * product.savePercent / 100)) * product.quantityInCart).reduce((init, curr) => {
			return init + curr
		}, 0)

	}

	const handleMinusProduct = (product) => {
		dispatch(changeQuantity({
			id: product._id,
			quantity: product.quantityInCart - 1
		}))
	}

	const handlePlusProduct = (product) => {
		let quantity = product.quantityInCart + 1
		if (quantity >= product.quantity) {
			quantity = product.quantity
		}
		dispatch(changeQuantity({
			id: product._id,
			quantity
		}))
	}
	const handleRemoveProduct = (product) => {
		dispatch(removeItem({
			id: product._id,
			quantity: 0
		}))
	}
	// sx={{
	// 					display: 'flex',
	// 					flexDirection: 'column',
	// 					gap: '24px',
	// 					p: '12px 8px',
	// 					'& .MuiMenuItem-root': {
	// 						textTransform: 'uppercase',
	// 						fontSize: '20px',
	// 						boxShadow: 'none',
	// 						borderRadius: '0px',
	// 						width: '100%',
	// 						color: 'primary.dark',
	// 						justifyContent: 'flex-start',
	// 						gap: '16px',
	// 						letterSpacing: '2px'
	// 					}
	// 				}}
	return (
		<Box sx={{ mt: '120px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

			<Header detail />

			<Box sx={{
				margin: '0 auto',
				width: {
					xs: '100%',
					lg: '1200px'
				},
				padding: '40px 8px',
				minHeight: '100vh',
				display: !isProductListEmpty ? 'flex' : 'block',
				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				gap: '5%'
			}}>

				<Box sx={{
					flex: '0 0 60%',
				}}>
					{!isProductListEmpty && <Box sx={{
						display: {
							xs: 'none',
							md: 'flex'
						}, textAlign: 'center', padding: '8px 20px'
					}}>
						<Typography variant='h6' sx={{ flex: '2', textAlign: 'left' }} >Sản phẩm</Typography>
						<Typography variant='h6' sx={{ flex: '1', textAlign: 'left' }} >Số lượng</Typography>
						<Typography variant='h6' sx={{ flex: '1' }} >Giá</Typography>
						<Typography variant='h6' sx={{ flex: '1', textAlign: 'right' }} >Xóa</Typography>
					</Box>}

					{!isProductListEmpty && productList.map(product =>
						<Box onClick={(e) => {
							e.preventDefault()
						}}
							key={product._id}
							sx={{
								display: 'flex',
								alignItems: 'center',
								padding: '8px 20px',
								'& a': {
									textDecoration: 'none',
									color: 'primary.dark'
								},
								borderBottom: '1px solid #000'
							}}>
							<Box sx={{
								flex: ' 0 0 40%',
								minWidth: {
									xs: '70%',
									md: '40%'
								},
								maxWidth: {
									xs: '70%',
									md: '40%'
								},
							}}>
								<Link to={`/store/${product._id}`} >
									<Box sx={{
										display: 'flex',
										alignItems: 'center',
										'& img': {
											width: '100px', height: '100px'
										}
									}}>

										<img src={product.thumb} />

										<Box sx={{
											display: 'flex',
											flexDirection: 'column',
											padding: '0 20px',
											'& .MuiTypography-root': {
												fontSize: '16px',
											}
										}}>
											<Typography variant='h6' sx={{ textTransform: 'uppercase', mb: '8px 0' }} >
												{`${product.name} `}
											</Typography>

											<Typography variant='h6' sx={{ fontSize: '16px', textTransform: 'uppercase', m: '8px 0' }}>
												{` Size: ${product.size} `}
											</Typography>
											<Typography variant='h6'>
												{parseFloat(`${(product.price - (product.price * (product.savePercent / 100)))}`).toFixed(1) + '00 VND'}
											</Typography>
										</Box>

									</Box>
								</Link>

							</Box>

							<Box sx={{
								display: 'flex',
								justifyContent: 'space-between',
								flex: ' 0 0 30%',
								minWidth: {
									xs: '30%',
									md: '60%'
								},
								maxWidth: {
									xs: '30%',
									md: '60%'
								},
								flexDirection: {
									xs: 'column',
									md: 'row'
								},
								alignItems: {
									xs: 'flex-end',
									md: 'center'
								}
							}}>
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
									<Button onClick={() => { handleMinusProduct(product) }}> <RemoveIcon /> </Button>
									<Typography variant='body1' sx={{ color: 'primary.dark' }}>{product.quantityInCart}</Typography>
									<Button onClick={() => { handlePlusProduct(product) }}> <AddIcon /> </Button>
								</Box>

								<Box sx={{
									maxWidth: {
										xs: '100%',
										md: '160px'
									},
									minWidth: {
										xs: '100%',
										md: '160px'
									},
									textAlign: {
										xs: 'right',
										md: 'left'
									}
								}}>
									<Typography variant='h6' sx={{ fontSize: { xs: '16px', md: '20px' }, fontWeight: { xs: '700', md: '500' } }}>
										{`${new Intl.NumberFormat().format(((product.price - (product.price * (product.savePercent / 100))) * product.quantityInCart) * 1000)} VND`}
									</Typography>
								</Box>

								<Box sx={{
									display: 'flex',
									maxWidth: '200px',
									alignItems: 'center',
									cursor: 'pointer'
								}}
									onClick={() => handleRemoveProduct(product)}
								>
									<DeleteForeverIcon />
								</Box>

							</Box>

						</Box>
					)}
					{!isProductListEmpty && <Button variant="contained" onClick={() => history.back()}
						sx={{
							backgroundColor: {
								xs: 'primary.main',
								md: 'primary.dark'
							},
							color: {
								xs: 'primary.dark',
								md: 'primary.main'
							},
							padding: '8px 12px',
							textTransform: 'uppercase',
							fontSize: '16px',
							minWidth: '45%',
							transform: 'translateY(10px)',
							transition: 'all linear .3s',
							mb: '16px',
							borderRadius: '8px',
							border: '1px solid #000',
							'&:hover': {
								backgroundColor: {
									xs: 'primary.main',
									md: 'primary.dark'
								},
								opacity: '0.8'
							}
						}}> Tiếp tục mua hàng</Button>}

				</Box>

				{!isProductListEmpty &&
					<Box sx={{
						flex: '0 0 35%',
						height: '120px',
						borderRadius: '4px',
						border: '1px solid #000'
					}}>

						<Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', alignItems: 'center' }}>
							<Typography variant='h6' sx={{ fontSize: '16px' }}>Tổng tiền</Typography>
							<Typography variant='h6' sx={{ fontWeight: 'bold ' }}>{`${(new Intl.NumberFormat().format(totalPrice * 1000))} VND`}</Typography>
						</Box>

						<Box sx={{ backgroundColor: '#fafafa', textAlign: 'center', borderTop: '1px solid #000' }}>
							<Button variant="contained"
								sx={{
									backgroundColor: 'primary.dark',
									color: 'primary.main',
									padding: '0',
									textTransform: 'uppercase',
									fontSize: '16px',
									minWidth: '45%',
									transform: {
										xs: 'none',
										md: 'translateY(12px)'
									},
									transition: 'all linear .3s',
									borderRadius: '8px',
									border: '1px solid #000',
									'&:hover': {
										backgroundColor: 'primary.dark',
										opacity: '0.8'
									},
									'& a': {
										color: 'primary.main',
										textDecoration: 'none',
										width: '100%',
										padding: '8px 12px',

									}
								}}><Link to='/checkout' > Mua ngay</Link></Button>
						</Box>
					</Box>}

				{isProductListEmpty &&
					<Box sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '0 16px'
					}}>
						<SvgIcon component={EmptyCart} inheritViewBox
							sx={{
								height: 'auto',
								width: '400px'
							}} />
						<Typography variant='h6' sx={{ textAlign: 'center' }}>Không có sản phẩm nào trong giỏ hàng của bạn.</Typography>
						<Button variant="contained" onClick={() => history.back()}
							sx={{
								backgroundColor: 'primary.dark',
								color: 'primary.main',
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
									backgroundColor: 'primary.dark',
									opacity: '0.8'
								}
							}}> Tiếp tục mua hàng</Button>

					</Box>
				}

			</Box>

			<Footer />
		</Box >

	)
}

export default Cart
