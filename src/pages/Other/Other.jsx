import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import Slider from '~/components/Slider/Slider'
import { sortMinToMax, mapOrder } from '~/untils/format'
import NewsInTheCenter from '~/components/Intro/Intro'
// import { mockData } from '~/apis/mock'
import { fetchOtherPage_API } from '~/apis/index'
import Box from '@mui/material/Box'
import NewsInTheLeft from '~/components/AboutComponent/About'
import { useEffect, useState } from 'react'
function Other() {
	const [otherPage, setOtherPage] = useState(undefined)
	const [newsList, setNewsList] = useState([])
	useEffect(() => {
		fetchOtherPage_API('tiemcur').then(data => {
			setOtherPage(data)
			setNewsList(mapOrder(data.newsList, data.newListOderIds, '_id'))
		})
	}, [])
	// const data = mockData.otherPage
	// const newsList = mapOrder(data.newsList, data.newListOderIds, '_id')
	return (
		<Box>
			{!otherPage &&
				<Box>
					Loading
				</Box>
			}
			{otherPage &&
				<Box>
					<Header />
					<Slider slide={otherPage.slide} otherPage />
					{
						newsList && newsList.map((item, index) => {
							if (item.isCenter) {
								return (
									<NewsInTheCenter key={index} intro={item} darkTheme={item.isDark} />
								)
							}
							return (<NewsInTheLeft key={index} about={item} darkTheme={item.isDark} />)
						})
					}
					<Footer />
				</Box>
			}
		</Box>
	)
}
export default Other
