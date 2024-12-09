import Header from '~/components/Header/Header'
import Slider from '~/components/Slider/Slider'
import Intro from '~/components/Intro/Intro'
import About from '~/components/AboutComponent/About'
import ProductList from '~/components/ProductList/ProductList'
import Footer from '~/components/Footer/Footer'
import Box from '@mui/material/Box'
import { getHomePage, getBestSeller } from '~/apis/mock'
import { useEffect, useState } from 'react'
import { fetchHomePage_API, getProductBestSeller } from '~/apis/index'

function Home() {
	const [homePage, setHomePage] = useState(null)
	const [topBestSeller, setTopBestSeller] = useState(null)
	const [bottomBestSeller, setBottomBestSeller] = useState(null)

	useEffect(() => {
		const curLug = 'tiemcur'
		fetchHomePage_API(curLug).then((data) => {
			setHomePage(data)
		})
	}, [])
	useEffect(() => {
		const curLug = 'tiemcur'
		getProductBestSeller(curLug, 'top', 4).then((data) => {
			setTopBestSeller(data)
		})
	}, [])
	useEffect(() => {
		const curLug = 'tiemcur'
		getProductBestSeller(curLug, 'bottom', 4).then((data) => {
			setBottomBestSeller(data)
		})
	}, [])

	// const topBestSeller = getBestSeller('top', 4, 'sold')
	// const bottomBestSeller = getBestSeller('bottom', 4, 'sold')
	if (!homePage) {
		return (
			<div>Server free nên lâu không sài bị stop. Đợi 60s F5 lại là oke. Nếu chưa oke đợi tiếp 60s.</div>
		)
	}

	return (
		<div>
			{homePage &&
				<div style={{ overflow: 'hidden' }} >

					<Header />

					<Slider slide={homePage.slide} homePage />

					<Intro intro={homePage.intro} />

					<ProductList products={topBestSeller} type={'top'} homePage />

					<Box sx={{
						display: 'flex',
						maxWidth: '100%',
						flexDirection: {
							xs: 'column',
							md: 'row'
						},
						p: {
							xs: '0',
							md: '20px'
						},
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
						<Box sx={{
							flex: {
								xs: '0 0 100%',
								md: '0 0 50%'
							},
							maxWidth: {
								xs: '100%',
								md: '50%'
							}
						}}>
							<img src={homePage.thumbShirt}
								alt=""
								style={{
									width: '100%',
									padding: '12px',
									maxHeight: '640px'
								}}
							/>

						</Box>
						<Box sx={{
							flex: {
								xs: '0 0 100%',
								md: '0 0 50%'
							},
							maxWidth: {
								xs: '100%',
								md: '50%'
							}
						}}>
							<img src={homePage.thumbPant}
								alt=""
								style={{
									width: '100%',
									padding: '12px',

									maxHeight: '640px'
								}}
							/>
						</Box>
					</Box>

					<ProductList products={bottomBestSeller} type={'bottom'} homePage />


					<About about={homePage.about} />

					<Footer />

				</div>
			}
		</div>
	)
}
export default Home
