import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function About({ about, darkTheme, setting }) {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [isShow, setIsShow] = useState(false)

	const originContent = about?.content?.split('\n')
	const originContentLength = originContent?.length

	const [contents, setContents] = useState(originContent)
	const handleShowAllContent = () => {
		setIsShow(false)
		setContents(originContent)
	}
	useEffect(() => {
		if (windowWidth < 1200 && originContentLength > 3) {
			const contentsTemp = contents.filter((t, i) => i <= 2)
			setIsShow(true)
			setContents(contentsTemp)
		} else {
			handleShowAllContent()
		}
	}, [windowWidth, setting])

	useEffect(() => {
		const hadleResize = (event) => {

			setWindowWidth(event.srcElement.innerWidth)
		}
		window.addEventListener('resize', hadleResize)
		return () => {
			window.removeEventListener('resize', hadleResize)
		}
	}, [])
	return (
		<Box sx={{
			maxWidth: '100%',
			margin: '0 auto ',
			display: 'flex',
			flexDirection: {
				xs: 'column-reverse',
				lg: 'row'
			},
			alignItems: 'center',
			padding: '40px 20px ',
			backgroundColor: darkTheme ? 'primary.dark' : 'primary.main',
			color: darkTheme ? 'primary.main' : 'primary.dark',
			gap: '20px'
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
				<img src={about.thumb}
					alt=""
					style={{
						maxWidth: '100%',
						minWidth: '100%'
					}}
				/>
			</Box>
			<Box sx={{
				p: {
					xs: '0 12px',
					md: '0 20px',
					lg: '0 80px'
				},
				textAlign: {
					xs: 'center',
					lg: 'left'
				},
				fontFamily: 'fontCustom',
				flex: {
					xs: '0 0 50%',
					lg: '0 0 100%'
				},
				maxWidth: {
					xs: '100%',
					lg: '50%'
				},
				'& .MuiTypography-root.MuiTypography-h1': {
					maxWidth: {
						xs: '100%',
						lg: '500px'
					},
					fontWeight: '300',
					fontSize: {
						xs: '28px',
						md: '40px'
					},
					lineHeight: '44px',
					letterSpacing: '4px',
					p: '8px 0'
				},
				'& .MuiButtonBase-root': {
					color: 'primary.main',
					backgroundColor: 'primary.dark',
					textTransform: 'uppercase',
					fontSize: {
						xs: '12px',
						md: '16px'
					},
					p: '0',
					minWidth: {
						xs: '80px',
						md: '160px'
					},
					maxWidth: '160px',
					borderRadius: 'none',
					mt: '16px',
					'&:hover': {
						opacity: 0.8
					}
				},
				'& a': {
					textDecoration: 'none',
					color: 'primary.main',
					p: '8px',
					width: '100%'
				}
			}}>
				<Typography variant="h1">{about.title}</Typography>

				<Box sx={{
					'& .MuiTypography-root.MuiTypography-body1': {
						fontSize: '16px',
						letterSpacing: '2px',
						fontFamily: 'fontPE',
						m: '8px 0',
						overflow: 'hidden'
					}
				}}>
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
			</Box>


		</Box >
	)
}
export default About
