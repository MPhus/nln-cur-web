import { memo, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { getHomePage, getOtherPage, getStorePage } from '~/apis/mock'
import {
	addNewsOnOtherPage_API,
	deleteNewsOnOtherPage_API,
	fetchOtherPage_API,
	moveNewsOnOtherPage_API,
	updateNews_API,
	fetchHomePage_API,
	updateSlide_API,
	updateHomePage_API,
	fetchStorePage_API
} from '~/apis/index'

import SettingIntro from './HomePage//SettingIntro/SettingIntro'
import ProductSlide from './HomePage//ProductSlide//ProductSlide'
import SettingAbout from './HomePage/SettingAbout/SettingAbout'
import SettingProductSlide from './StorePage/SettingProductSlide/SettingProductSlide'
import Slider from './../Slider/Slider';
import { isEmpty } from 'lodash'
import SettingOtherPage from './OrtherPage/SettingOtherPage/SettingOtherPage'
import { mapOrder, sortMinToMax } from '~/untils/format'



import SettingSlide from '~/components/CustomPage/HomePage/SettingSlide/SettingSlide'
import CustomOrtherPage from '~/components/CustomPage/OrtherPage/CustomOrtherPage'
import { toast } from 'react-toastify'

const CustomPage = memo(({ type }) => {
	const SLUG = 'tiemcur'
	const [homePage, setHomePage] = useState(undefined)
	const [storeTop, setStoreTop] = useState(undefined)
	const [storeBottom, setStoreBottom] = useState(undefined)
	const [otherPage, setOtherPage] = useState(undefined)
	useEffect(() => {

		switch (type) {
			case 'Trang chủ':
				fetchHomePage_API(SLUG).then(data => setHomePage(data))

				break;
			case 'Trang sản phẩm':
				fetchStorePage_API(SLUG, 'top').then(data => setStoreTop(data?.topSlide))
				fetchStorePage_API(SLUG, 'bottom').then(data => setStoreBottom(data?.bottomSlide))

				break;
			case 'Trang Blog':
				fetchOtherPage_API(SLUG).then(data => {
					setOtherPage(data)
				})
				break

			default:
				break;
		}

		return () => {
			setHomePage(undefined)
			setStoreBottom(undefined)
			setStoreTop(undefined)
			setOtherPage(undefined)
		}
	}, [type])

	const addNews = async (slug, data) => {
		data.append('pageId', '66bb0cbe3abe0f94b4a11029')
		data.append('webId', '66bb08673abe0f94b4a10fed')
		const newData = await addNewsOnOtherPage_API(slug, data)
		const newOtherPage = { ...otherPage }
		newOtherPage.newsList.push(newData)
		if (isEmpty(newOtherPage.newListOderIds)) {
			newOtherPage.newListOderIds = [newData._id]
		} else {
			newOtherPage.newListOderIds.push(newData._id)
		}
		setOtherPage(newOtherPage)
	}
	const moveNews = async (newsOrdered) => {
		const newOtherPage = { ...otherPage }
		const newsOrderedIds = newsOrdered.map(c => c._id)
		newOtherPage.newsList = newsOrdered
		newOtherPage.newListOderIds = newsOrderedIds
		setOtherPage(newOtherPage)
		moveNewsOnOtherPage_API('tiemcur', { newListOderIds: newsOrderedIds })
	}
	const deleteNews = (newsId) => {
		const newOtherPage = { ...otherPage }
		newOtherPage.newsList = newOtherPage.newsList.filter(c => c._id !== newsId)
		newOtherPage.newListOderIds = newOtherPage.newListOderIds.filter(_id => _id !== newsId)
		setOtherPage(newOtherPage)
		deleteNewsOnOtherPage_API('tiemcur', newsId)
			.then(data => {
				toast.success('Bài viết đã được xóa thành công', { position: 'top-center' })
			})
			.catch(err => {
				toast.error('Có lỗi đã xảy ra', { position: 'top-center' })
			})
	}

	const updateNews = async (slug, data) => {
		const newData = await updateNews_API(slug, data)
	}

	const updateSlide = async (slug, data) => {
		const newSlide = await updateSlide_API(slug, data)
	}
	const updateHomePage = async (slug, data) => {
		const newSlide = await updateHomePage_API(slug, data)

	}

	return (
		<Box sx={{ maxWidth: '1200px', minWidth: '1200px', m: '40px auto', }}>
			<Box sx={{ backgroundColor: '#fff', padding: '40px' }}>
				{homePage &&
					<Box>
						<Typography variant='h2'>Trang chủ</Typography>
						<Box>
							<SettingSlide page={homePage} updateSlide={updateSlide} />
							<SettingIntro page={homePage} updateNews={updateNews} />
							<ProductSlide page={homePage} updateHomePage={updateHomePage} />
							<SettingAbout page={homePage} updateNews={updateNews} />
						</Box>
					</Box>
				}
				{storeTop && storeBottom &&
					<Box>
						<Typography variant='h2'>Trang sản phẩm</Typography>
						<Box>

							<Box sx={{
								my: '32px'
							}}>
								<Typography variant='h4'>Chỉnh sửa hình ảnh trang Shirt</Typography>
								<SettingProductSlide thumb={storeTop} updateSlide={updateSlide} />
							</Box>

							<Box>
								<Typography variant='h4'>Chỉnh sửa hình ảnh trang Pant</Typography>
								<SettingProductSlide thumb={storeBottom} isBottom updateSlide={updateSlide} />
							</Box>

						</Box>
					</Box>
				}
				{otherPage &&
					<Box>
						<Typography variant='h2'>Trang Other</Typography>
						<SettingSlide page={otherPage} ortherPage updateSlide={updateSlide} />

						<CustomOrtherPage page={otherPage} addNews={addNews} moveNews={moveNews} deleteNews={deleteNews} updateNews={updateNews} />
					</Box>
				}
			</Box>

		</Box>
	)
})

export default CustomPage