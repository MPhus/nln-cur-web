import { Box, Button, Typography, Zoom } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import { Link } from 'react-router-dom'
function NotFound() {
	return (
		<Box sx={{
			display: 'flex',
			minHeight: '100vh',
			alignItems: 'center',
			justifyContent: 'flex-start',
			background: 'url("https://res.cloudinary.com/dwa6hiofs/image/upload/v1722253234/376700102_609293028059436_9068363357934760444_n_s4pr1h.jpg")',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
			color: '#fff'
		}}>

			<Box sx={{
				alignSelf: 'center',
				maxWidth: {
					xs: '100%',
					md: '800px'
				},
				m: {
					sx: '0 20px',
					md: '0 0 0 80px'
				},
				backgroundColor: 'rgba(0,0,0,0.5)',
				padding: {
					xs: '20px',
					md: ' 40px 80px'
				},
				textAlign: 'center',
				'& a': {
					backgroundColor: '#fff',
					padding: '20px',
					width: '100%',
					textDecoration: 'none',
					fontSize: '20px',
					color: '#000',

				}
			}}>
				<Typography variant='h1' >404</Typography>
				<Typography variant='h3' sx={{ my: '32px' }} >Trang này không tồn tại rồi bạn ơi.</Typography>
				<Typography variant='h3' >Bạn bị lạc ư</Typography>
				<Button variant='outlined' sx={{ p: 0, mt: '32px', width: { xs: '100%', md: 'auto' } }}>
					<Link to='/'>Đường về trang chủ nè</Link>
				</Button>
			</Box>


		</Box>
	)
}

export default NotFound