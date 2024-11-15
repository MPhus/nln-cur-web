import Pagination from '@mui/material/Pagination'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getThumbProductForType, getProduct } from '~/apis/mock'
import Slider from '~/components/Slider/Slider'
import { useEffect, useState } from 'react'
import ProductList from '~/components/ProductList/ProductList'
import { fetchStorePage_API, fetchProduct_API } from '~/apis/index'

function Store({ type }) {
	const [filter, setFilter] = useState({
		type,
		page: 1,
		limit: 12,
		price: 'latest',
		color: '',
		fabric: '',
		size: '',
		searchtext: '',
		isGetSoldOut: false
	})
	const [slideFortype, setSlideFortype] = useState({})
	const [products, setProducts] = useState({})
	useEffect(() => {
		fetchProduct_API('tiemcur', filter).then(data => setProducts(data))

	}, [filter])
	useEffect(() => {
		setFilter({ ...filter, type })
		fetchStorePage_API('tiemcur', type).then(data => setSlideFortype(data[`${type}Slide`]))
	}, [type])

	// const slideFortype = getThumbProductForType(type)
	const totalPage = products?.totalPage
	const handlePageShowProduct = (e, v) => {
		setFilter({
			...filter,
			page: v,
		})
	}
	useEffect(() => {
		return () => {
			setFilter({
				...filter,
				page: 1,
			})
		}
	}, [type])
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [filter.page])

	return (
		<Box sx={{
			overflow: 'hidden'
		}}>
			<Header />

			{slideFortype && <Slider slide={slideFortype} storePage={type} />}

			{/* Navigationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
			<Box sx={{
				bgcolor: 'primary.main',
				maxWidth: {
					md: '800px',
					lg: '1200px'
				},
				margin: '40px auto 0',
				padding: '0 20px 0 20px',
				display: 'flex',

				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				justifyContent: 'space-between',
				alignItems: {
					xs: 'center',
					md: 'flex-end'
				},
				borderBottom: '4px solid #000'
			}}>

				<Box sx={{
					display: 'flex',
					gap: {
						xs: '0'
					},
					maxWidth: {
						xs: '100%',
						sm: '70%',
						md: '500px'
					},
					minWidth: {
						xs: '100%',
						sm: '70%',
						md: '500px'
					},
					justifyContent: 'space-between'
				}}>
					{/* ----------------------------------filterColor------------------------------------------------ */}
					<Box sx={{
						minWidth: '30%'
					}} >
						<FormControl sx={{
							minWidth: {
								xs: '100%'
							}
						}}>
							<InputLabel id="color-select-label" sx={{ color: 'red' }} >Màu sắc</InputLabel>
							<Select
								labelId='color-select-label'
								value={filter.color}
								onChange={(e) => { setFilter({ ...filter, color: e.target.value }) }}
								inputProps={{ MenuProps: { disableScrollLock: true } }}
							>
								<MenuItem value={''}>None</MenuItem>
								<MenuItem value={'black'}>Đen</MenuItem>
								<MenuItem value={'white'}>Trắng</MenuItem>
								<MenuItem value={'red'}>Đỏ</MenuItem>
								<MenuItem value={'organe'}>Cam</MenuItem>
								<MenuItem value={'yellow'}>Vàng</MenuItem>
								<MenuItem value={'camo'}>Camo</MenuItem>
								<MenuItem value={'other'}>Khác..</MenuItem>
							</Select>
						</FormControl>
					</Box>

					{/* ----------------------------------filterSize------------------------------------------------ */}
					<Box sx={{
						minWidth: '36%'
					}}>
						<FormControl sx={{
							minWidth: {
								xs: '100%'
							}
						}} >
							<InputLabel id="size-select-label" >Kích thước</InputLabel>
							<Select
								labelId='size-select-label'
								value={filter.size}
								onChange={(e) => { setFilter({ ...filter, size: e.target.value }) }}
								inputProps={{ MenuProps: { disableScrollLock: true } }}
							>
								<MenuItem value=''>None</MenuItem>
								<MenuItem value={'s'}>Size S</MenuItem>
								<MenuItem value={'m'}>Size M</MenuItem>
								<MenuItem value={'l'}>Size L</MenuItem>
								<MenuItem value={'xl'}>Size XL</MenuItem>
								<MenuItem value={'xxl'}>Size XXL</MenuItem>
							</Select>
						</FormControl>
					</Box>


					{/* ----------------------------------filterFabric------------------------------------------------ */}
					<Box sx={{
						minWidth: '30%'
					}}>
						<FormControl sx={{
							minWidth: {
								xs: '100%'
							}
						}}>
							<InputLabel id="fabric-select-label">Loại vải</InputLabel>
							<Select
								labelId='fabric-select-label'
								value={filter.fabric}
								onChange={(e) => { setFilter({ ...filter, fabric: e.target.value }) }}
								inputProps={{ MenuProps: { disableScrollLock: true } }}
							>
								<MenuItem value={''}>None</MenuItem>
								<MenuItem value={'khaki'}>Khaki</MenuItem>
								<MenuItem value={'coduroy'}>Nhung tăm</MenuItem>
								<MenuItem value={'offort'}>Offort</MenuItem>
								<MenuItem value={'hawai'}>Hawai</MenuItem>
								<MenuItem value={'jean'}>Jean</MenuItem>
								<MenuItem value={'kate'}>Jean</MenuItem>
								<MenuItem value={'sweater'}>Sweater</MenuItem>
								<MenuItem value={'flanel'}>Flanel</MenuItem>
								<MenuItem value={'linen'}>Linen</MenuItem>
								<MenuItem value={'other'}>Khác..</MenuItem>
							</Select>
						</FormControl>
					</Box>

				</Box>

				{/*------------------------filterPrice--------------------------------  */}
				<Box sx={{
					maxWidth: {
						xs: '100%',
						md: '200px'
					},
					minWidth: {
						xs: '100%',
						md: '200px'
					},
					mb: '8px',
					background: 'transparent',
					'& .MuiInputBase-root': {
						color: 'primary.dark',
						fontSize: '18px',
						'& div': {
							p: ' 8px 12px'
						},
						'& .MuiOutlinedInput-notchedOutline': {
							border: '1px solid #000',
							borderColor: '#000'
						}
					}
				}}>
					<FormControl fullWidth>

						<Select
							value={filter.price}
							inputProps={{ MenuProps: { disableScrollLock: true } }}
							onChange={(e) => {
								setFilter({
									...filter,
									price: e.target.value
								})
							}}
						>
							<MenuItem value={'latest'}>Mới nhất</MenuItem>
							<MenuItem value={'increase'}>Tăng dần</MenuItem>
							<MenuItem value={'decrease'}>Giảm dần</MenuItem>
						</Select>
					</FormControl>
				</Box>

			</Box>
			{products && <ProductList products={products?.data} />}


			<Pagination
				onChange={handlePageShowProduct}
				size='large'
				page={filter.page}
				count={totalPage}
				defaultPage={1}
				variant="outlined"
				sx={{
					maxWidth: '1200px',
					margin: ' 0 auto',
					padding: {
						xs: '0 0 100px 0',
						md: '0 40px 100px 0'
					},
					'& .MuiPagination-ul': {
						justifyContent: {
							xs: 'center',
							md: 'flex-end'
						}
					},
					'& .MuiButtonBase-root': {
						color: 'primary.dark'
					},
					'& .MuiPaginationItem-root': {
						borderColor: '#000'
					},
					'& .MuiPaginationItem-root:hover': {
						opacity: '0.8'
					}

				}} />
			<Footer />
		</Box >
	)
}
export default Store