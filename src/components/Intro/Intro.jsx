import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

function Intro({ intro, darkTheme, setting }) {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [isShow, setIsShow] = useState(false)

	const originContent = intro?.content?.split('\n')
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
			backgroundColor: darkTheme ? 'primary.dark' : 'primary.main',
			color: darkTheme ? 'primary.main' : 'primary.dark',
			p: '40px 0'
		}}>
			<Box sx={{
				maxWidth: {
					xs: '100%',
					md: '960px',
					lg: '1200px'
				},
				margin: '0 auto ',
				textAlign: 'center',
				padding: {
					xs: ' 0 32px',
					md: 'none'
				},
				'& .MuiTypography-root.MuiTypography-h1': {
					fontWeight: '300',
					fontSize: {
						xs: '28px',
						md: '32px'
					},
					lineHeight: {
						sx: '28px',
						md: '44px'
					},
					letterSpacing: '4px',
					p: {
						xs: '20px 0',
						md: '32px 0'
					},
					fontFamily: 'fontPE'
				},
				'& .MuiTypography-root.MuiTypography-body1': {
					fontSize: '16px',
					letterSpacing: '2px',
					fontFamily: 'fontPE',
					mb: {
						xs: '8px',
						md: '16px'
					}
				}
			}}>
				<Typography variant="h1">{intro.title}</Typography>
				<Box>
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

				{/* <Typography variant="body1">

				{intro.content}

			</Typography> */}


				<img src={intro.thumb}
					alt=""
					style={{
						maxWidth: '100%',
						marginTop: '32px'
					}}
				/>


			</Box >
		</Box>
	)
}
export default Intro
