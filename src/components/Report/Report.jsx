import { memo, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Box, Button, Typography } from '@mui/material'
import { test } from '~/apis/mock'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
const Report = memo(({ type }) => {
	const date = '02/08/2024'
	const printContent = useRef(null)
	const handlePrint = useReactToPrint({
		content: () => printContent.current
	})
	return (
		<Box sx={{
			maxWidth: '1200px',
			minWidth: '1200px',
			m: '40px auto',
			backgroundColor: '#fafafa',
			padding: '40px'
		}}>
			<Box sx={{
				mb: '20px',
				display: 'flex',
				gap: '40px',
				width: '100%',
				justifyContent: 'center'
			}}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', justifySelf: 'center' }}>
					<Button variant='text' sx={{ color: '#000' }} ><FirstPageIcon /></Button>
					<Typography sx={{ fontSize: '16px !important' }}>1/1</Typography>
					<Button variant='text' sx={{ color: '#000' }} ><LastPageIcon /></Button>
				</Box>

				<Button variant='contained' sx={{ color: '#000', justifySelf: 'flex-end', '&:hover': { backgroundColor: '#fff', opacity: '0.8' } }} onClick={handlePrint}><LocalPrintshopIcon /></Button>

			</Box>
			<Box ref={printContent} sx={{
				padding: '8px 20px',
				backgroundColor: '#fff',
				width: '100%'
			}}>
				<Box sx={{ textAlign: 'center', my: '40px' }}>
					<Typography variant='h4'>{` Báo cáo cuối ngày về ${type.slice(5)}`}</Typography>
					<Typography variant='h4'>Ngày bán: {date}</Typography>
				</Box>

				<Box sx={{
					mt: '20px',
					'& .MuiBox-root': {
						display: 'flex',
						minHeight: '40px',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0 20px',
						'& .MuiTypography-root': {
							minWidth: '120px'
						}
					}
				}}>
					<Box sx={{
						backgroundColor: '#BFD8AF'
					}}>
						<Typography>Mã giao dịch</Typography>
						<Typography>Thời gian</Typography>
						<Typography>Số lượng</Typography>
						<Typography>Doanh thu</Typography>
						<Typography>Thu khác</Typography>
						<Typography>Phí trả hàng</Typography>
						<Typography>Thực thu</Typography>
					</Box>

					<Box sx={{
						backgroundColor: '#D4E7C5'
					}}>
						<Typography>Hóa đơn: 4</Typography>
						<Typography></Typography>
						<Typography>16</Typography>
						<Typography>3.000.000</Typography>
						<Typography>0</Typography>
						<Typography>0</Typography>
						<Typography>3.000.000</Typography>
					</Box>
					{test.map((item, index) => {
						return (
							<Box key={index} sx={{ borderBottom: '1px solid #4F6F52', mb: '4px' }}>
								<Typography>{item.code}</Typography>
								<Typography>{item.code}</Typography>
								<Typography>{item.code}</Typography>
								<Typography>{item.code}</Typography>
								<Typography>{item.code}</Typography>
								<Typography>{item.code}</Typography>
								<Typography>{item.code}</Typography>
							</Box>

						)
					})}

				</Box>
			</Box>

		</Box>
	)
})


export default Report