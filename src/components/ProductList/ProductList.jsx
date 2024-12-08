import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import EastIcon from '@mui/icons-material/East'
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useDispatch } from 'react-redux'
import { addToCart } from '~/redux/cart'
import { toast } from 'react-toastify'
import { useState } from 'react'

function BestSeller({ products, homePage, type }) {
	const productType = type === 'top' ? 'shirt' : 'pant'
	const dispatch = useDispatch()
	const handleAddToCard = (e, data) => {
		toast('Đã thêm sản phẩm vào giỏ hàng')
		e.preventDefault()
		dispatch(addToCart({
			id: data.id,
			quantity: 1,
			totalQuantity: data.quantity
		}))
	}

	return (
		<Box sx={{
			maxWidth: '100%',
			margin: homePage ? '80px 0 40px' : '0',
			backgroundColor: homePage ? 'primary.dark' : 'primary.main',
			padding: homePage ? '40px 0' : '0'
		}}>
			{homePage && <Box sx={{
				textAlign: 'center'
			}}>
				<Typography
					gutterBottom
					variant="h4"
					component="h1"
					sx={{
						textTransform: 'uppercase',
						color: 'primary.main'
					}}>
					{`Best Selling ${productType}s`}
				</Typography>
				<Button variant="text" endIcon={<EastIcon />} sx={{ opacity: '0.85', '&:hover': { opacity: '1' } }}>{`Go to shop ${productType}s`}</Button>

			</Box>}


			<Box sx={{
				maxWidth: {
					md: homePage ? '900px' : '1000px',
					lg: '1200px'
				},
				margin: '0 auto',
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				justifyContent: {
					xs: 'center',
					lg: homePage ? 'space-between' : 'flex-start'
				},
				gap: {
					xs: '16px',
					lg: 0
				},
				p: homePage ? '32px 20px 0 20px' : '4px 20px 0 20px',
				'& a': {
					textDecoration: 'none'
				}
			}}>
				{products && products.map(item => (
					<Link to={`/store/${item._id}`} key={item._id} >
						<Card
							sx={{
								minWidth: '280px',
								maxWidth: '280px',
								minHeight: '380px',
								maxHeight: '380px',
								backgroundColor: 'primary.main',
								p: '16px',
								mb: '24px',
								color: 'primary.dark',
								position: 'relative',
								cursor: 'pointer',
								textDecoration: 'none',
								// transition: 'all linear .3s',
								'&:hover': {
									boxShadow: '0 0 20px 0 #fff'
								},
								'&:hover .MuiBox-root': {
									opacity: '1'
								},
								'&:hover .MuiBox-root .MuiButton-root ': {
									transform: 'translateY(0)'
								}
							}}>
							<Box sx={{
								background: `url(${item.thumb}) no-repeat center / cover`,
								position: 'absolute',
								overflow: 'hidden',
								top: '0',
								left: '0',
								right: '0',
								bottom: '0',
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'center',
								zIndex: '1',
								opacity: '0',
								transition: 'all linear .3s',
								padding: '10px',
								boder: '1px solid #fff'
							}}>
								<Button variant="contained"
									endIcon={<AddShoppingCartIcon />}
									onClick={(e) => {
										handleAddToCard(e, { id: item._id, quantity: item.quantity })
									}}
									sx={{
										backgroundColor: 'primary.main',
										color: 'primary.dark',
										transform: 'translateY(20px)',
										transition: 'all linear .3s',
										mb: '16px',
										borderRadius: '8px',
										'&:hover': {
											backgroundColor: 'primary.main',

											opacity: '0.8'
										}
									}}> Thêm vào giỏ hàng</Button>
							</Box>
							<CardMedia
								component="img"
								height='250px'
								width='250px'
								image={item.thumb}
								alt={item.price}
								sx={{ borderRadius: '4px' }}
							/>

							{!!item.savePercent &&
								<Box sx={{
									backgroundColor: '#ff5e57',
									position: 'absolute',
									top: '0',
									left: '0',
									p: '2px',
									color: 'primary.main',
									borderRadius: '4px'
								}}> {`- ${item.savePercent}% `}</Box>}

							<CardContent sx={{ p: '8px 0' }}>

								<Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'left', textTransform: 'capitalize' }}>
									{item.name === '' ? 'noname' : item.name}
								</Typography>

								<Box sx={{ display: 'flex', gap: '4px' }}>
									<Typography gutterBottom variant="body1" component="p">
										{parseFloat(`${(item.price - (item.price * (item.savePercent / 100)))}`).toFixed(1) + '00 VND'}
									</Typography>
									<Typography gutterBottom variant="body1" component="p" sx={{ ml: '8px', '& span': { textTransform: 'uppercase' } }}>
										Size : <span>{item.size}</span>
									</Typography>

									{
										!!item.savePercent &&
										<Typography gutterBottom variant="body1" component="p" sx={{ textDecoration: 'line-through', color: '#888', ml: '4px' }}>
											{`${item.price}.000 vnd`}
										</Typography>
									}

								</Box>

							</CardContent>
						</Card>
					</Link>
				))
				}


			</Box >

		</Box >
	)
}
export default BestSeller
