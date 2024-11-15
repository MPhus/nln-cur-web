import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Slider({ slide, homePage, storePage }) {

	return (
		<Box sx={{
			position: 'relative',
			width: '100%',
			height: storePage ? '400px' : '800px'
		}}>
			<img src={slide.thumb}
				alt=""
				style={{
					position: 'absolute',
					top: 0,
					minWidth: '100%',
					maxWidth: '100%',
					minHeight: '100%',
					maxHeight: '100%',
					objectFit: 'cover',
					objectPosition: storePage === 'bottom' ? 'top' : 'center center',
					filter: 'brightness(64%)'
				}}
			/>
			<Box sx={{
				position: 'absolute',
				top: '24%',
				right: {
					xs: '50%',
					lg: '10%'
				},
				transform: {
					xs: 'translateX(50%)',
					lg: 'none'
				},
				minWidth: {
					xs: '320px',
					md: '500px'
				},
				maxWidth: '600px',
				textAlign: 'center'
			}}>
				<Box sx={{
					'& .MuiTypography-root': {
						color: 'primary.main',
						fontFamily: 'fontFamily',
						letterSpacing: '4px',
						m: '0 0 20px 0'
					},
					'& .MuiTypography-root.MuiTypography-body1': {
						fontSize: '16px'
					}

				}}>

					<Typography variant="body1"
						sx={{
							fontWeight: 'bold'
						}} >
						{slide.title}
					</Typography>
					{homePage && <Typography variant="h2"
						sx={{
							fontWeight: 'bold',
							fontSize: {
								xs: '20px',
								md: '40px'
							}
						}} >
						{slide.heading}
					</Typography>}
					{slide.content && slide.content.split('\n').map((content, index) => <Typography variant="body1" key={index}>{content}</Typography>)}
					<Typography variant="body1">
						{slide.description}
					</Typography>

				</Box>

				<Box sx={{
					display: 'flex',
					mt: '32px',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					'& .MuiButton-root': {
						textTransform: 'uppercase',
						fontSize: {
							xs: '12px',
							md: '14px'
						},
						fontWeight: '700',
						boxShadow: 'none',
						minWidth: {
							xs: '80px',
							md: '200px'
						},
						border: '1px solid #fff',
						borderRadius: '0px',
						py: '8px',
						transition: 'all linear .4s',
						'&:hover': {
							backgroundColor: 'primary.main',
							color: 'primary.dark'
						}
					}
				}}>
				</Box>
			</Box>

		</Box>
	)
}
export default Slider
