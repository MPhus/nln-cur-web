import { memo, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { doanhthu } from '../../apis/dataTest/doanhthu'
import { Box } from '@mui/material'
function Chart({ type, dataChart }) {
	const [widthChart, setWidthChart] = useState(1200)

	const valueFormatter = (value) => (`${value / 1000000} tr `)

	return (
		<Box  >
			<BarChart
				dataset={dataChart}
				xAxis={[{
					scaleType: 'band',
					dataKey: 'date',
					textAnchor: 'middle',
					tickPlacement: 'middle',
					valueFormatter: (date, context) =>
						context.location === 'tick'
							? date
							: `Ngày ${date}`,

				}]}
				yAxis={[{
					valueFormatter
				}]}
				grid={{ horizontal: true }}
				series={[
					{ dataKey: 'revenue', label: 'Doanh thu' },
				]}
				width={widthChart}
				height={600}
				sx={{
					padding: '20px 0 20px 20px',
					'& .MuiChartsAxis-left .MuiChartsAxis-tickLabel, & .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
						strokeWidth: '0.4',
						transform: 'scale(1.6)'
					},
					'& .MuiChartsLegend-root.MuiChartsLegend-row': {
						display: 'none'
					}
				}}
				colors={['#4F6F52']}
			/>
		</Box>
	)
}


export default memo(Chart)