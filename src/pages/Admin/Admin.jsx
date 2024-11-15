import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import Overview from '~/components/Overview/Overview'
import Report from '~/components/Report/Report'
import Statistic from '~/components/Statistic/Statistic'
import CustomPage from '~/components/CustomPage/CustomPage'
import CustomDate from '~/untils/customDate'
import authorizedAxiosIntance from '~/untils/authorizedAxios'
import axios from 'axios'

function Admin() {
	const DRAWER_WIDTH = '320px'
	const STATISTICS_LIST = ['Sản phẩm', 'Người dùng', 'Khách hàng']
	const PAGE_LIST = ['Trang chủ', 'Trang sản phẩm', 'Trang Củ đi lạc']
	const year = new CustomDate().getFullYear()
	const [user, setUser] = useState(null)

	const [filterPrice, setFilterPrice] = useState('latest')
	const [openDrawer, setOpenDrawer] = useState(true)
	const [title, setTitle] = useState('Trang chủ')

	const handleToggleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	document.title = 'Admin Tiem CUR'
	useEffect(() => {
		const testAccess = async () => {
			const res = await authorizedAxiosIntance.get('http://localhost:3000/v1/web/tiemcur/accesstoken')

			setUser(res.data)
		}
		testAccess()
		// document.querySelector('link[rel="icon"]').href = 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1722253234/376248141_609292971392775_7616707295223113086_n_lqcbsv.jpg'
	}, [])

	const handleChangeNav = (item) => {
		setTitle(item)
	}
	return (
		<Box sx={{ backgroundColor: '#f8f8f8' }}>
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ ml: openDrawer ? DRAWER_WIDTH : '0', mr: `-${DRAWER_WIDTH}`, flexGrow: '1', width: '100%' }} >
					<AppBar position="static">
						<Toolbar>
							{!openDrawer &&
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									sx={{ mr: 2 }}
									onClick={handleToggleDrawer}
								>
									<MenuIcon />
								</IconButton>
							}

							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								{title === 'Tổng quan' && 'Tổng quan'}
								{STATISTICS_LIST.includes(title) && `Thống kê: ${title}`}
								{PAGE_LIST.includes(title) && `Chỉnh sửa: ${title}`}
							</Typography>

							{/* <div>
								<IconButton>
									<AccountCircle />
								</IconButton>
								<Menu>
									<MenuItem >Profile</MenuItem>
									<MenuItem >My account</MenuItem>
								</Menu>
							</div> */}
						</Toolbar>
					</AppBar>
				</Box>

				<Drawer
					sx={{
						width: DRAWER_WIDTH,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: DRAWER_WIDTH,
							boxSizing: 'border-box',

							backgroundColor: 'secondary.main',
							color: 'primary.main'
						}
					}}
					variant="persistent"
					anchor="left"
					open={openDrawer}
				>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 8px 15px 20px' }}>
						<Typography variant='h5'>Admin</Typography>
						<IconButton onClick={handleToggleDrawer}
							sx={{
								border: '1px solid ',
								padding: '4px',
								color: 'primary.main'
							}}>
							<ChevronLeftIcon sx={{
								transform: 'scale(1.2)'
							}} />
						</IconButton>
					</Box>
					<Divider />
					<List>
						<ListItem disablePadding onClick={() => handleChangeNav('Tổng quan')} sx={{ backgroundColor: 'Tổng quan' === title ? '#49664c' : 'transparent' }}>
							<ListItemButton>
								<ListItemText primary={'Tổng quan'} />
							</ListItemButton>
						</ListItem>

					</List>

					<Divider textAlign="left"><Chip label="Thống kê" size="small" /></Divider>

					<List>
						{STATISTICS_LIST.map((item, index) => {
							return (
								<ListItem key={index} disablePadding onClick={() => handleChangeNav(item)} sx={{ backgroundColor: item === title ? '#49664c' : 'transparent' }}>
									<ListItemButton>
										<ListItemText primary={item} />
									</ListItemButton>
								</ListItem>
							)
						})}
					</List>

					<Divider textAlign="left"><Chip label="Chỉnh sửa trang Web" size="small" /></Divider>

					<List>
						{PAGE_LIST.map((item, index) => {
							return (
								<ListItem key={index} disablePadding onClick={() => handleChangeNav(item)} sx={{ backgroundColor: item === title ? '#49664c' : 'transparent' }}>
									<ListItemButton>
										<ListItemText primary={item} />
									</ListItemButton>
								</ListItem>
							)
						})}
					</List>
				</Drawer>
			</Box>


			<Box sx={{
				ml: openDrawer ? DRAWER_WIDTH : '0', mr: `-${DRAWER_WIDTH}`, width: openDrawer ? `calc(100% - ${DRAWER_WIDTH})` : '100%'
			}}>

				{title === 'Tổng quan' &&
					// <Box sx={{ maxWidth: '1200px', minWidth: '1200px', m: '0 auto', }}>
					// 	<Box sx={{
					// 		display: 'flex',
					// 		flexDirection: 'column'
					// 	}}>
					// 		<Box sx={{ padding: '20px' }}>
					// 			<Typography variant='h6' sx={{ borderBottom: '1px solid #ccc' }}>Kết quả bán hàng hôm nay</Typography>
					// 			<Box sx={{
					// 				display: 'flex',
					// 				justifyContent: 'flex-start',
					// 				gap: '64px',
					// 				mt: '20px',
					// 				pb: '20px',
					// 				alignItems: 'flex-end',
					// 				px: '32px',
					// 				'& >.MuiBox-root ': {
					// 					display: 'flex',
					// 					alignItems: 'center',
					// 					minWidth: '160px',
					// 					gap: '12px',
					// 					'& .MuiTypography-root.MuiTypography-body1:first-child ': {
					// 						fontWeight: '700',
					// 						ml: '4px'
					// 					}
					// 				},
					// 				'& .MuiSvgIcon-root': {
					// 					// mt: '4px',
					// 					fontSize: '32px',
					// 					color: '#fff',
					// 					borderRadius: '50%'
					// 				},
					// 				borderBottom: '1px solid #ccc'
					// 			}}>

					// 				<Box >
					// 					<Box>
					// 						<AttachMoneySharpIcon
					// 							sx={{
					// 								backgroundColor: 'info.main',
					// 							}} />
					// 					</Box>
					// 					<Box>
					// 						<Typography variant='body1'>1 hóa đơn</Typography>
					// 						<Typography variant='h4' sx={{ color: 'info.main' }} >1.000.000</Typography>
					// 						<Typography variant='body1'>Doanh số</Typography>
					// 					</Box>
					// 				</Box>

					// 				<Box >
					// 					<Box>
					// 						<ReplyAllIcon sx={{
					// 							backgroundColor: 'warning.main',
					// 							px: '4px',
					// 						}} />
					// 					</Box>
					// 					<Box>
					// 						<Typography variant='body1'>0 phiếu</Typography>
					// 						<Typography variant='h4' sx={{ color: 'warning.main' }}>0</Typography>
					// 						<Typography variant='body1'>Trả hàng</Typography>
					// 					</Box>
					// 				</Box>

					// 				<Box >
					// 					<Box>
					// 						< ArrowDownwardIcon sx={{
					// 							backgroundColor: 'error.main',
					// 						}} />
					// 					</Box>
					// 					<Box>

					// 						<Typography variant='h4' sx={{ color: 'error.main' }}>-44.92%</Typography>
					// 						<Typography variant='body1'>So với hôm qua</Typography>
					// 					</Box>
					// 				</Box>
					// 				<Box >
					// 					<Box>
					// 						<ArrowUpwardIcon sx={{
					// 							backgroundColor: 'success.main',
					// 						}} />
					// 					</Box>
					// 					<Box>

					// 						<Typography variant='h4' sx={{ color: 'success.main' }}>26.92%</Typography>
					// 						<Typography variant='body1'>So với cùng kỳ tháng trước</Typography>
					// 					</Box>
					// 				</Box>
					// 			</Box>
					// 		</Box>

					// 		<Box >
					// 			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 32px 0', }}>
					// 				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					// 					<Typography variant='h5'>Doanh số tháng này</Typography>
					// 					<Typography variant='h4' sx={{ color: 'secondary.main', ml: '12px', fontWeight: '700' }}>1.000.000.000</Typography>
					// 				</Box>
					// 				<Box>
					// 					<Box sx={{
					// 						maxWidth: {
					// 							xs: '100%',
					// 							md: '200px'
					// 						},
					// 						minWidth: {
					// 							xs: '100%',
					// 							md: '200px'
					// 						},
					// 						mb: '8px',
					// 						background: 'transparent',
					// 						'& .MuiInputBase-root': {
					// 							color: 'primary.dark',
					// 							fontSize: '18px',
					// 							'& div': {
					// 								p: ' 8px 12px'
					// 							},
					// 							'& .MuiOutlinedInput-notchedOutline': {
					// 								border: '1px solid #000',
					// 								borderColor: '#000'
					// 							}
					// 						}
					// 					}}>

					// 						<FormControl fullWidth>
					// 							<Select
					// 								value={filterPrice}
					// 								inputProps={{ MenuProps: { disableScrollLock: true } }}
					// 								onChange={(e) => { setFilterPrice(e.target.value) }}
					// 							>
					// 								<MenuItem value={'latest'}>Mới nhất</MenuItem>
					// 								<MenuItem value={'increase'}>Tăng dần</MenuItem>
					// 								<MenuItem value={'decrease'}>Giảm dần</MenuItem>
					// 							</Select>
					// 						</FormControl>
					// 					</Box>
					// 				</Box>
					// 			</Box>

					// 			<Chart type={'Tổng quan'} />
					// 		</Box>
					// 		<Box sx={{ padding: '20px' }}>
					// 			<Typography variant='h6' sx={{ borderBottom: '1px solid #ccc' }}>Kết quả bán hàng hôm nay</Typography>
					// 			<Box sx={{
					// 				display: 'flex',
					// 				justifyContent: 'flex-start',
					// 				gap: '64px',
					// 				mt: '20px',
					// 				pb: '20px',
					// 				alignItems: 'flex-end',
					// 				px: '32px',
					// 				'& >.MuiBox-root ': {
					// 					display: 'flex',
					// 					alignItems: 'center',
					// 					minWidth: '160px',
					// 					gap: '12px',
					// 					'& .MuiTypography-root.MuiTypography-body1:first-child ': {
					// 						fontWeight: '700',
					// 						ml: '4px'
					// 					}
					// 				},
					// 				'& .MuiSvgIcon-root': {
					// 					// mt: '4px',
					// 					fontSize: '32px',
					// 					color: '#fff',
					// 					borderRadius: '50%'
					// 				},
					// 				borderBottom: '1px solid #ccc'
					// 			}}>

					// 				<Box >
					// 					<Box>
					// 						<AttachMoneySharpIcon
					// 							sx={{
					// 								backgroundColor: 'info.main',
					// 							}} />
					// 					</Box>
					// 					<Box>
					// 						<Typography variant='body1'>1 hóa đơn</Typography>
					// 						<Typography variant='h4' sx={{ color: 'info.main' }} >1.000.000</Typography>
					// 						<Typography variant='body1'>Doanh số</Typography>
					// 					</Box>
					// 				</Box>

					// 				<Box >
					// 					<Box>
					// 						<ReplyAllIcon sx={{
					// 							backgroundColor: 'warning.main',
					// 							px: '4px',
					// 						}} />
					// 					</Box>
					// 					<Box>
					// 						<Typography variant='body1'>0 phiếu</Typography>
					// 						<Typography variant='h4' sx={{ color: 'warning.main' }}>0</Typography>
					// 						<Typography variant='body1'>Trả hàng</Typography>
					// 					</Box>
					// 				</Box>

					// 				<Box >
					// 					<Box>
					// 						< ArrowDownwardIcon sx={{
					// 							backgroundColor: 'error.main'
					// 						}} />
					// 					</Box>
					// 					<Box>

					// 						<Typography variant='h4' sx={{ color: 'error.main' }}>-44.92%</Typography>
					// 						<Typography variant='body1'>So với hôm qua</Typography>
					// 					</Box>
					// 				</Box>
					// 				<Box >
					// 					<Box>
					// 						<ArrowUpwardIcon sx={{
					// 							backgroundColor: 'success.main',
					// 						}} />
					// 					</Box>
					// 					<Box>

					// 						<Typography variant='h4' sx={{ color: 'success.main' }}>26.92%</Typography>
					// 						<Typography variant='body1'>So với cùng kỳ tháng trước</Typography>
					// 					</Box>
					// 				</Box>
					// 			</Box>
					// 		</Box>
					// 	</Box>

					// </Box>
					<Overview />
				}


				{STATISTICS_LIST.includes(title) &&
					<Box >
						<Statistic type={title} />
					</Box>
				}

				{PAGE_LIST.includes(title) &&
					<Box>
						<CustomPage type={title} />
					</Box>
				}

			</Box>
		</Box >
	)
}

export default Admin
