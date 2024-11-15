import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import MenuList from '@mui/material/MenuList'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'

import { ReactComponent as LogoIcon } from '~/assets/svgIcon/curlogob.svg'
import { ReactComponent as LogoIconBlack } from '~/assets/svgIcon/curlogob_black.svg'
import { ReactComponent as ShirtIcon } from '~/assets/svgIcon/tshirt.svg'
import { ReactComponent as PantIcon } from '~/assets/svgIcon/pant.svg'

function Header({ detail }) {
	const [blur, setBlur] = useState(detail)
	const [openMenu, setOpenMenu] = useState(false)

	const productInCart = useSelector(state => state.cart.items)

	useEffect(() => {
		const handleScroll = () => {
			setBlur(detail || window.scrollY > 120)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const toggleMenu = (newOpen) => () => {
		setOpenMenu(newOpen)
	}

	return (
		<Box sx={{
			height: '80px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			overflowX: 'auto',
			paddingX: 2,
			backgroundColor: blur ? 'primary.dark' : 'transparent',
			padding: {
				xs: '0 12px',
				md: '0 64px'
			},
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			zIndex: '9',
			borderBottom: !detail ? '1px solid #fff' : '1px solid #000',
			'& a': {
				textDecoration: 'none'
			},
		}}>
			<Box sx={{
				display: {
					xs: 'none',
					md: 'flex'
				},
				alignItems: 'center',
				justifyContent: 'space-between',
				maxWidth: '350px',
				minWidth: {
					md: '300px',
					lg: '350px'
				},
				'& .MuiButtonBase-root': {
					p: 0
				},
				'& a': {
					textTransform: 'uppercase',
					fontSize: '16px',
					borderBottom: '1px solid transparent',
					boxShadow: 'none',
					borderRadius: '0px',
					color: 'primary.main',
					textDecoration: 'none',
					minWidth: '90px',
					p: '8px',
					'&:hover': {
						borderBottom: '1px solid #fff'
					}
				}
			}}>
				<Button variant="text" >
					<Link to='/store-tops'>
						Shirts
					</Link>
				</Button>

				<Button variant="text" >
					<Link to='/store-bottoms'>Pants</Link>
				</Button>
				<Button variant="text" >
					<Link to='/other'>Other...</Link>
				</Button>


			</Box>

			<Box sx={{
				display: { md: 'none' }
			}}>
				<Tooltip title="Menu">
					<Button
						onClick={toggleMenu(true)}
					>
						<MenuIcon sx={{
							color: 'primary.main',
							cursor: 'pointer'
						}} />
					</Button>
				</Tooltip>

				<Drawer
					open={openMenu} onClose={toggleMenu(false)} sx={{
						'& .MuiPaper-root': {
							width: {
								xs: '100%',
								sm: '50%'
							}
						}
					}}
				>
					<MenuList sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '24px',
						p: '12px 8px',
						'& .MuiMenuItem-root': {
							textTransform: 'uppercase',
							fontSize: '20px',
							boxShadow: 'none',
							borderRadius: '0px',
							width: '100%',
							justifyContent: 'flex-start'
						},
						'& .MuiMenuItem-root a': {
							display: 'flex',
							gap: '16px',
							width: '100%',
							color: 'primary.dark',
							letterSpacing: '2px',
							textDecoration: 'none'
						}
					}}>
						<Button sx={{
							alignSelf: 'flex-end',
							color: 'primary.dark',
							width: '32px',
							height: '32px'
						}} onClick={toggleMenu(false)}>
							<CloseIcon sx={{ fontSize: '28px' }} />
						</Button>
						<MenuItem>
							<Link to='/store-tops'>
								<ShirtIcon />
								Shirts
							</Link>
						</MenuItem>

						<MenuItem>
							<Link to='/store-bottoms'>
								<PantIcon />Pants
							</Link>
						</MenuItem>

						<MenuItem>
							<Link to='/other'>
								<LogoIconBlack />Other...
							</Link>
						</MenuItem>
						<SvgIcon component={LogoIconBlack} inheritViewBox sx={{
							height: '100px',
							width: '100px',
							alignSelf: 'center',
							flex: '1'
						}} />
					</MenuList>
				</Drawer>
			</Box>

			<Box>
				<Link to='/'>
					<SvgIcon component={LogoIcon} inheritViewBox sx={{
						height: '100%',
						width: '64px'
					}} />
				</Link>

			</Box>



			<Link to='/cart'>
				<Box sx={{
					display: 'flex',
					maxWidth: '350px',
					minWidth: {
						md: '300px',
						lg: '350px'
					},
					justifyContent: 'flex-end'
				}}>
					<Button variant="text" sx={{
						display: {
							xs: 'none',
							md: 'inline-flex'
						},
						textTransform: 'uppercase',
						fontSize: '16px',
						borderBottom: '1px solid transparent',
						boxShadow: 'none',
						borderRadius: '0px',
						'&:hover': {
							borderBottom: '1px solid #fff'
						},
						'& .MuiButton-icon': {
							mb: '8px'
						}
					}} endIcon={<LocalMallIcon />}>Cart</Button>

					<Badge badgeContent={productInCart.length ? productInCart.length : undefined} color="error">
						<Button sx={{
							display: {
								xs: 'block',
								md: 'none'
							}
						}}>
							<LocalMallIcon sx={{
								mt: '4px'
							}} />
						</Button>

					</Badge>

				</Box>
			</Link>
		</Box >
	)
}
export default Header
