import Box from '@mui/material/Box'
import { ReactComponent as LogoIcon2 } from '~/assets/svgIcon/Curlogow01.svg'
import { ReactComponent as FaceBookIconSVG } from '~/assets/svgIcon/facebook-circle.svg'
import { ReactComponent as InstagramIconSVG } from '~/assets/svgIcon/instagram-logo-fill.svg'
import { ReactComponent as TiktokIconSVG } from '~/assets/svgIcon/tiktok.svg'
import { SvgIcon, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import PlaceIcon from '@mui/icons-material/Place'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import EmailIcon from '@mui/icons-material/Email'

function Footer() {
	return (
		<Box sx={{
			minHeight: '120px',
			display: 'flex',
			flexDirection: {
				xs: 'column',
				md: 'row'
			},
			alignItems: {
				xs: 'center',
				md: 'flex-start'
			},
			textAlign: {
				xs: 'center',
				md: 'left'
			},
			justifyContent: 'space-between',
			overflow: 'hidden',
			backgroundColor: 'primary.dark',
			gap: '16px',
			p: {
				xs: '0 80px',
				md: '0 20px 0 0',
				lg: '0 80px 0 60px',
				xl: '0 160px 0 120px'
			},
			position: 'relative',
			bottom: 0,
			left: 0,
			right: 0,
		}}>

			<Box>
				<SvgIcon component={LogoIcon2} inheritViewBox sx={{
					height: '100%',
					width: '200px'
				}} />
			</Box>

			<Box sx={{
				maxWidth: {
					xs: '100%',
					md: '400px',
					lg: '600px',
					xl: '820px'
				},
				minWidth: {
					xs: '100%',
					md: '400px',
					lg: '600px',
					xl: '820px'
				}
			}}>

				<Typography variant="h5" sx={{
					color: 'primary.main',
					fontFamily: 'fontCustom',
					m: {
						xs: '0 0 16px 0',
						md: '20px 0'
					},
					fontWeight: 'bold',
					letterSpacing: '2px'
				}} >
					Address
				</Typography>

				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					alignItems: {
						xs: 'center',
						md: 'flex-start'
					},
					'& .MuiTypography-root ': {
						color: 'primary.main',
						transition: 'all linear .2s',
						display: 'flex',
						alignItems: 'center',
						fontSize: '16px',
						fontFamily: 'fontCustom'
					},
					'& .MuiTypography-root:hover': {
						opacity: '0.8'
					},
					'& .MuiTypography-root .MuiSvgIcon-root': {
						fontSize: '22px',
						m: ' 0 8px 4px 0',
						display: {
							xs: 'none',
							md: 'inline-block'
						}
					}
				}}>
					<Link href="https://www.google.com/maps/place/Ti%E1%BB%87m+C%E1%BB%A7/@10.0370187,105.774216,18z/data=!4m15!1m8!3m7!1s0x31a088194a944cab:0xd667e641771b9205!2zSOG6u20gMTM4IMSQLiBUcuG6p24gSMawbmcgxJDhuqFvLCBBbiBOZ2hp4buHcCwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!3b1!8m2!3d10.0375253!4d105.7752675!16s%2Fg%2F11cn63dfr7!3m5!1s0x31a089bcc17f71bb:0xe454b8d6cd4c87b7!8m2!3d10.037361!4d105.7753366!16s%2Fg%2F11thdjqdb9?hl=vi&entry=ttu"
						underline='none'
						variant="body1"
						target="_blank"
					>
						<PlaceIcon /> Hẻm 138 Trần Hưng Đạo, An Nghiệp, Ninh Kiều ( vào hẻm 138 đến ngã ba rẽ phải là thấy Củ), Can Tho, Vietnam
					</Link>
					<Link href="tel:0774008040" underline='none' variant="body1" >
						<SmartphoneIcon /> 0937557378
					</Link>
					<Link href="mailto:phu3009@gmail.com" underline='none' variant="body1" >
						<EmailIcon /> tiemcur@gmail.com
					</Link>
				</Box>

			</Box>
			<Box sx={{
				maxWidth: {
					xs: '100%',
					md: '820px'
				},
				minWidth: {
					xs: '100%',
					md: 'fit-content'
				}
			}}>
				<Typography variant="h5" sx={{
					color: 'primary.main',
					fontFamily: 'fontCustom',
					m: '20px 0',
					fontWeight: 'bold',
					letterSpacing: '2px'
				}} >Contact</Typography>

				<Box sx={{
					display: 'flex',
					gap: 2,
					justifyContent: {
						xs: 'center',
						md: 'flex-start'
					},
					mb: {
						xs: '40px',
						md: '0'
					},
					'& .MuiTypography-root ': {
						color: 'primary.main',
						transition: 'all linear .2s',
						display: 'flex',

						alignItems: 'center',
						fontSize: '16px',
						fontFamily: 'fontCustom'
					},
					'& .MuiTypography-root:hover': {
						opacity: '0.8'
					},
					'& .MuiTypography-root .MuiSvgIcon-root': {
						fontSize: '22px',
						m: ' 0 8px 4px 0'
					}
				}}>
					<Link href="https://www.facebook.com/TiemCur" underline='none' target="_blank" variant="body1" >
						<FaceBookIconSVG />
					</Link>
					<Link href="https://www.instagram.com/tiemcur/" underline='none' target="_blank" variant="body1" >
						<InstagramIconSVG />
					</Link>
					<Link href="https://www.tiktok.com/@tiemcur" underline='none' target="_blank" variant="body1" >
						<TiktokIconSVG />
					</Link>
				</Box>

			</Box>

		</Box >
	)
}
export default Footer
