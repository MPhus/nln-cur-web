import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Pagination from '@mui/material/Pagination'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import CloseIcon from '@mui/icons-material/Close'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import SearchIcon from '@mui/icons-material/Search'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

// import { getProduct } from '~/apis/mock'
import { addNewProduct_API, DeleteProduct_API, fetchProduct_API, getProductById_API, updateDetailProduct_API } from '~/apis/index'
import { Alert, CircularProgress, DialogActions } from '@mui/material'
import { formatDate } from '~/untils/format'
import UpdateProduct from './UpdateProduct'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
function ProductListStatistic() {
	const [productList, setProductList] = useState(undefined)
	const [closeIcon, setCloseIcon] = useState('')
	const [test, setTest] = useState({})
	const [searchText, setSearchText] = useState('')
	const [numberOfPage, setNumberOfPage] = useState(1)
	const [openAddProduct, setOpenAddProduct] = useState(false)
	const [openDetail, setOpenDetail] = useState(false)
	const [loading, setLoading] = useState(false)
	const [productDetail, setProductDetail] = useState({})
	const [imgProductPreview, setImgProductPreview] = useState(undefined)
	const inputImgRef = useRef(null)
	const totalPage = productList?.totalPage
	const totalProduct = productList?.totalProduct

	const [testtt, setTesttt] = useState(false)
	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
		material: '',
		price: 100,
		quantity: 1,
		savePercent: 0,
		supplier: '',
		thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1723884187/upload_wt1avg.jpg',
		type: 'top',
		color: 'other',
		size: 's'
	})

	const { register, handleSubmit, resetField, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			...newProduct
		}
	})


	useEffect(() => {
		const filter = { type: '', page: numberOfPage, limit: 10, price: 'latest', color: '', fabric: '', size: '', searchtext: searchText, isGetSoldOut: true }
		fetchProduct_API('tiemcur', filter).then(data => setProductList(data))

	}, [numberOfPage, searchText, test])

	const handlePageShowProduct = (e, v) => {
		setNumberOfPage(v)
	}
	useEffect(() => {
		return () => {
			setNumberOfPage(1)
		}
	}, [])

	const handleUploadImg = () => {
		inputImgRef.current.click()
	}

	const submitSettingSlide = async (data) => {
		const formData = new FormData()
		formData.append('thumb', data['thumb'][0])
		formData.append('price', data.price)
		formData.append('name', data.name)
		formData.append('material', data.material)
		formData.append('description', data.description)
		formData.append('quantity', data.quantity)
		formData.append('savePercent', data.savePercent)
		formData.append('supplier', data.supplier)
		formData.append('color', data.color)
		formData.append('type', data.type)
		formData.append('size', data.size)

		addNewProduct_API('tiemcur', formData)
			.then((item) => {
				toast.success('Đã thêm sản phẩm mới', { position: 'top-center' })
				setTest(item)
			})
			.catch(err => {
				toast.error('Có lỗi đã xảy ra', { position: 'top-center' })
			})
			.finally(a => setLoading(false))
		setLoading(true)

		handleCloseAddProduct()
	}

	const handleCloseAddProduct = () => {
		resetField('description')
		resetField('material')
		resetField('name')
		resetField('price')
		resetField('quantity')
		resetField('savePercent')
		resetField('supplier')
		resetField('thumb')
		resetField('color')
		resetField('type')
		resetField('size')
		setImgProductPreview(newProduct.thumb)
		setOpenAddProduct(false)
		setTimeout(() => {
			setTest({})
		}, 5000);
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgProductPreview)
		}
	}, [imgProductPreview])

	const handleViewDetail = (id) => {
		getProductById_API('tiemcur', id)
			.then(product => {
				setProductDetail(product)
				setOpenDetail(true)
			}
			)
	}
	const handleCloseViewDetail = () => {
		setOpenDetail(false)

	}
	const updateDetailProduct = (data) => {
		updateDetailProduct_API('tiemcur', data).then(pro => setTest(pro))
	}
	const DeleteProduct = (id) => {
		setOpenDetail(false)
		setTesttt(id)
	}
	const DeleteProduct2 = (id) => {
		DeleteProduct_API('tiemcur', id)
			.then(pro => {
				toast('Đã xóa sản phẩm', { position: 'top-center' })
				setTest(pro)
				setTesttt(undefined)
			})
	}

	return (
		<Box sx={{ maxWidth: '1200px', minWidth: '1200px', m: '40px auto', }}>
			{loading &&
				<Box sx={{ backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: '99' }}>
					<CircularProgress sx={{ color: 'secondary.main' }} size={80} />
				</Box>
			}
			<Dialog
				open={testtt}
				onClose={() => setTesttt(false)}
				sx={{ '& .MuiPaper-root': { minWidth: '800px', maxWidth: '800px' } }}
			>
				<DialogTitle sx={{ backgroundColor: 'error.main', color: '#fff' }}>
					Xác nhận xóa sản phẩm
					<Tooltip title="Đóng ">
						<CloseIcon onClick={() => setTesttt(false)} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
					</Tooltip>
				</DialogTitle>
				<DialogContent sx={{
					mt: '20px',
					padding: ' 8px 20px',
				}}>
					Sản phẩm này sẽ vĩnh viễn bị xóa khỏi hệ thống của bạn, bạn có chắc chắn muốn xóa
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => { DeleteProduct2(testtt) }}
						sx={{
							fontSize: '16px',
							color: 'red',
							border: '1px solid red',
							'&:hover': {
								border: '1px solid red',
								color: 'red',
								opacity: 0.9
							}
						}}
						startIcon={<DeleteForeverIcon />}
					>
						Xóa
					</Button>
				</DialogActions>
			</Dialog>
			<Box>
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: '#fff',
					padding: '40px 20px',
					borderRadius: '8px',
					mb: '40px',
				}}>
					<Typography variant='h4' sx={{ color: 'secondary.main', fontWeight: '700' }} >Tổng số sản phẩm: {totalProduct}</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>

						<Button variant='outlined' sx={{
							color: '#000',
							border: '1px solid #000',
							'&:hover': {
								border: '1px solid #000',
								opacity: '0.8'
							}
						}} startIcon={<AddToPhotosIcon />} onClick={() => setOpenAddProduct(true)}>Thêm sản phẩm</Button>

						<Dialog
							open={openAddProduct}
							onClose={handleCloseAddProduct}
							sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
						>
							<DialogTitle >
								Thêm sản phẩm
							</DialogTitle>
							<DialogContent>
								<form onSubmit={handleSubmit(submitSettingSlide)} encType="multipart/form-data">
									<Box sx={{ display: 'flex' }} >
										<Box onClick={handleUploadImg} sx={{
											cursor: 'pointer',
											minWidth: '50%',
											maxWidth: '50%',
											'& img': {
												minWidth: '100%',
												maxWidth: '100%',
												objectFit: 'cover',
												height: '600px',
												objectPosition: 'center center',
												filter: 'brightness(64%)'
											}
										}}>

											<Box sx={{ position: 'relative' }} >

												{imgProductPreview && <img src={imgProductPreview} />}
												{!imgProductPreview && <img src={newProduct.thumb} />}

												<Box sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													maxWidth: '100%',
													position: 'absolute',
													top: 0, left: 0, right: 0, bottom: 0,
													backgroundColor: !imgProductPreview ? 'rgba(255,255,255,0.3)' : 'transparent'
												}}>
													<Button variant='outlined' size='large' startIcon={<DriveFolderUploadIcon />}>Thêm hình ảnh</Button>
												</Box>
											</Box>

											<TextField
												type="file"
												inputRef={inputImgRef}
												variant="outlined"
												sx={{ display: 'none' }}
												{...register('thumb', {
													onChange: (e) => {
														setImgProductPreview(URL.createObjectURL(e.target.files[0]))
													}
												})}
											/>

										</Box>

										<Box sx={{ minWidth: '50%', maxWidth: '50%' }}>
											<Box sx={{ padding: '0 20px' }}>
												<TextField
													label='Tên sản phẩm'
													fullWidth
													size='small'
													type="text"
													variant="outlined"
													{...register('name', {
														required: 'Vui lòng nhập tên sản phẩm.',
														minLength: 3,
														maxLength: 50
													})}
													sx={{
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															fontSize: '16px',
															top: '-2px',
															backgroundColor: '#fff'
														},
														'&  .MuiOutlinedInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #000 !important'
															}
														}
													}}
												/>
												{errors.name && errors?.name?.type !== 'minLength' && errors?.name?.type !== 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														{errors.name.message}
													</Alert>
												}
												{errors.name?.type == 'minLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập ít nhất 3 ký tự
													</Alert>
												}
												{errors.name?.type == 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập tối đa 50 ký tự
													</Alert>
												}
												<TextField
													label='Chất liệu'
													fullWidth
													size='small'
													type="text"
													variant="outlined"
													{...register('material', {
														required: 'Vui lòng nhập trường này.',
														minLength: 3,
														maxLength: 50
													})}
													sx={{
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															fontSize: '16px',
															top: '-2px',
															backgroundColor: '#fff'
														},
														'&  .MuiOutlinedInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #000 !important'
															}
														}
													}}
												/>
												{errors.material && errors?.material?.type !== 'minLength' && errors?.material?.type !== 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														{errors.material.message}
													</Alert>
												}
												{errors.material?.type == 'minLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập ít nhất 3 ký tự
													</Alert>
												}
												{errors.material?.type == 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập tối đa 50 ký tự
													</Alert>
												}

												<TextField
													label='Thương hiệu'
													fullWidth
													size='small'
													type="text"
													variant="outlined"
													{...register('supplier', {
														required: 'Vui lòng nhập trường này.',
														minLength: 3,
														maxLength: 50
													})}
													sx={{
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															fontSize: '16px',
															top: '-2px',
															backgroundColor: '#fff'
														},
														'&  .MuiOutlinedInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #000 !important'
															}
														}
													}}
												/>
												{errors.supplier && errors?.supplier?.type !== 'minLength' && errors?.supplier?.type !== 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														{errors.supplier.message}
													</Alert>
												}
												{errors.supplier?.type == 'minLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập ít nhất 3 ký tự
													</Alert>
												}
												{errors.supplier?.type == 'maxLength' &&
													<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
														Vui lòng nhập tối đa 50 ký tự
													</Alert>
												}

												<TextField
													label='Mô tả'
													fullWidth
													multiline
													minRows={3}
													size='small'
													type="text"
													variant="outlined"
													{...register('description')}
													sx={{
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															fontSize: '16px',
															top: '-2px',
															backgroundColor: '#fff'
														},
														'&  .MuiOutlinedInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #000 !important'
															}
														}
													}}
												/>
											</Box>

											<Box sx={{
												display: 'flex', justifyContent: 'space-between', padding: '0 20px',

											}}>
												<Box sx={{
													minWidth: '160px',
													maxWidth: '160px',
												}}>
													<TextField
														label='Giá .000vnd'
														size='small'
														type="number"
														InputProps={{ inputProps: { min: 0 } }}
														variant="outlined"
														sx={{
															minWidth: '160px',
															maxWidth: '160px',
															mt: '32px',
															'& .MuiSvgIcon-root': {
																color: 'primary.dark',
																pt: '3px'
															},
															'& .MuiFormLabel-root': {
																right: 'unset !important',
																left: '0',
																top: '-4px',
																backgroundColor: '#fff'
															},
															'&  .MuiOutlinedInput-root ': {
																fontSize: '16px ',
																' & .MuiOutlinedInput-notchedOutline': {
																	border: '1px solid #000 !important'
																}
															}
														}}
														{...register('price', {
															required: 'Vui lòng nhập trường này.',
															min: 0
														})}

													/>
													{errors.price && errors?.price?.type !== 'min' &&
														<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
															{errors.price.message}
														</Alert>
													}
													{errors.price?.type === 'min' &&
														<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
															Giá tối thiểu là 0
														</Alert>
													}
												</Box>

												<Box sx={{
													minWidth: '160px',
													maxWidth: '160px',
												}}>
													<TextField
														label='Số lượng'
														size='small'
														type="number"
														InputProps={{ inputProps: { min: 1 } }}
														variant="outlined"
														sx={{
															minWidth: '160px',
															maxWidth: '160px',
															mt: '32px',
															'& .MuiSvgIcon-root': {
																color: 'primary.dark',
																pt: '3px'
															},
															'& .MuiFormLabel-root': {
																right: 'unset !important',
																left: '0',
																top: '-4px',
																backgroundColor: '#fff'
															},
															'&  .MuiOutlinedInput-root ': {
																fontSize: '16px',
																' & .MuiOutlinedInput-notchedOutline': {
																	border: '1px solid #000 !important'
																}
															}
														}}
														{...register('quantity', {
															required: 'Vui lòng nhập trường này.',
															min: 1
														})}
													/>
													{errors.quantity && errors?.quantity?.type !== 'min' &&
														<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
															{errors.quantity.message}
														</Alert>
													}
													{errors.quantity?.type === 'min' &&
														<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
															Số lương tối thiểu là 1
														</Alert>
													}
												</Box>

												<Box sx={{
													minWidth: '160px',
													maxWidth: '160px',
												}}>
													<TextField
														label='Giảm giá %'
														size='small'
														type="number"
														InputProps={{ inputProps: { min: 0, max: 100 } }}
														variant="outlined"
														sx={{
															minWidth: '160px',
															maxWidth: '160px',
															mt: '32px',
															'& .MuiSvgIcon-root': {
																color: 'primary.dark',
																pt: '3px'
															},
															'& .MuiFormLabel-root': {
																right: 'unset !important',
																left: '0',
																top: '-4px',
																backgroundColor: '#fff'
															},
															'&  .MuiOutlinedInput-root ': {
																fontSize: '16px',
																' & .MuiOutlinedInput-notchedOutline': {
																	border: '1px solid #000 !important'
																}
															}
														}}
														{...register('savePercent', {
															required: 'Vui lòng nhập trường này.',
															min: 0,
															max: 100
														})}
													/>
													{errors.savePercent && errors?.savePercent?.type !== 'min' && errors?.savePercent?.type !== 'max' &&
														<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
															{errors.savePercent.message}
														</Alert>
													}
													{errors.savePercent?.type === 'min' &&
														<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
															Giảm giá tối thiểu là 0%
														</Alert>
													}
													{errors.savePercent?.type === 'max' &&
														<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
															Giảm giá tối đa là 100%
														</Alert>
													}
												</Box>
											</Box>

											<Box sx={{
												display: 'flex', mt: '20px', padding: '0 20px', justifyContent: 'space-between'
											}}>
												<TextField
													label="Color"
													select
													size='small'
													defaultValue='other'
													{...register('color')}
													sx={{
														minWidth: '160px',
														maxWidth: '160px',
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															top: '-4px',
															backgroundColor: '#fff'
														},
														'&  .MuiOutlinedInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #000 !important'
															}
														}
													}}
												>
													<MenuItem value={''}>None</MenuItem>
													<MenuItem value={'black'}>Đen</MenuItem>
													<MenuItem value={'white'}>Trắng</MenuItem>
													<MenuItem value={'red'}>Đỏ</MenuItem>
													<MenuItem value={'purple'}>Tím</MenuItem>
													<MenuItem value={'green'}>Xanh lục</MenuItem>
													<MenuItem value={'blue'}>Xanh lam</MenuItem>
													<MenuItem value={'organe'}>Cam</MenuItem>
													<MenuItem value={'yellow'}>Vàng</MenuItem>
													<MenuItem value={'camo'}>Camo</MenuItem>
													<MenuItem value={'other'}>Khác..</MenuItem>
												</TextField>

												<TextField
													select
													label="Size"
													size='small'
													defaultValue='s'
													{...register('size')}
													sx={{
														minWidth: '160px',
														maxWidth: '160px',
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															top: '-4px',
															backgroundColor: '#fff'
														},
														'&  .MuiOutlinedInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #000 !important'
															}
														}
													}}
												>
													<MenuItem value={'s'}>Size S</MenuItem>
													<MenuItem value={'m'}>Size M</MenuItem>
													<MenuItem value={'l'}>Size L</MenuItem>
													<MenuItem value={'xl'}>Size XL</MenuItem>
													<MenuItem value={'xxl'}>Size XXL</MenuItem>
												</TextField>

												<TextField
													select
													size='small'
													label="type"
													defaultValue='top'
													{...register('type')}
													sx={{
														minWidth: '160px',
														maxWidth: '160px',
														mt: '32px',
														'& .MuiSvgIcon-root': {
															color: 'primary.dark',
															pt: '3px'
														},
														'& .MuiFormLabel-root': {
															right: 'unset !important',
															left: '0',
															top: '-4px',
															backgroundColor: '#fff'
														},
														'&  .MuiOutlinedInput-root ': {
															fontSize: '16px',
															' & .MuiOutlinedInput-notchedOutline': {
																border: '1px solid #000 !important'
															}
														}
													}}
												>
													<MenuItem value={'top'}>Top</MenuItem>
													<MenuItem value={'bottom'}>Bottom</MenuItem>
												</TextField>
											</Box>

											<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
												<Button
													onClick={() => handleCloseAddProduct()}
													variant="outlined"
													sx={{
														mt: '20px',
														padding: ' 8px 20px',
														fontSize: '16px',
														color: '#000',

														border: '1px solid #000',
														'&:hover': {
															border: '1px solid #000',
															color: '#000',
															opacity: 0.9
														}
													}}
												>
													Hủy
												</Button>

												<Button
													type="submit"
													variant="contained"
													sx={{
														mt: '20px',
														padding: '8px 20px',
														fontSize: '16px',
														backgroundColor: '#000',
														color: '#fff',
														'&:hover': {
															backgroundColor: '#000',
															color: '#fff',
															opacity: 0.9
														}
													}}
												>
													Thêm
												</Button>
											</Box>
										</Box>
									</Box>
								</form >
							</DialogContent>
						</Dialog>


						<TextField
							id="filled-search"
							label="Search"
							type="text"
							variant="outlined"
							size='small'
							onChange={(e) => {
								setSearchText(e.target.value)
							}}
							value={searchText}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<CloseRoundedIcon onClick={() => setCloseIcon('')}
											sx={{
												display: searchText == '' ? 'block' : 'none',
												cursor: 'pointer',
												fontSize: '16px'
											}}
										/>
									</InputAdornment>
								)
							}}
							sx={{
								minWidth: 320,
								maxWidth: 320,
								'& .MuiSvgIcon-root': {
									color: 'primary.dark',
									pt: '3px'
								},
								'& .MuiFormLabel-root': {
									right: 'unset !important',
									left: '0',
									backgroundColor: '#fff'
								},
								'&  .MuiOutlinedInput-root ': {
									fontSize: '16px',
									' & .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #000 !important'
									}
								}
							}}
						/>
					</Box>
				</Box>

				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#fff',
					padding: '20px 0',
					borderRadius: '8px'
				}}>
					<Box sx={{
						display: 'flex',
						borderBottom: '1px solid #000',
						justifyContent: 'space-between',
						'& .MuiButtonBase-root ': {
							fontWeight: '700',
							color: 'primary.dark',
							minWidth: '100px',
						}
					}}>
						<Button variant='text' sx={{ flex: '2' }} endIcon={null}>Sản phẩm</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Thương hiệu</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Số lượng</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Giá</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Màu</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Loại vải</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Kích thước</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Ngày thêm</Button>
						<Button variant='text' sx={{ flex: '1', maxWidth: '100px' }} endIcon={null}>Chỉnh sửa</Button>
					</Box>

					<Box sx={{}} >
						{productList && productList?.data.map((product, index) => {
							return (
								<Box key={index} sx={{
									display: 'flex',
									position: 'relative',
									justifyContent: 'space-between',
									backgroundColor: test._id === product._id ? 'rgba(0,0,0,0.03)' : '#fff',
									alignItems: 'center',
									boxShadow: '0px 0px 1px #888888',
									padding: '12px 0',
									textAlign: 'center',
									'& .MuiButtonBase-root, & .MuiTypography-body1  ': {
										color: 'primary.dark',
										minWidth: '100px',
										maxWidth: '100px'
									},
									'&:hover': {
										backgroundColor: 'rgba(0,0,0,0.03)',
									}
								}}>
									<Box sx={{
										position: 'absolute',
										top: '0',
										left: '0',
										backgroundColor: '#ff5e57',
										color: '#fff',
										fontSize: '12px',
										userSelect: 'none',
										display: product.quantity <= 0 ? 'block' : 'none',

									}}>Hết hàng</Box>
									<Box sx={{ display: 'flex', flex: '2', padding: '0 12px', gap: '16px', alignItems: 'center' }}>
										<Avatar src={product.thumb} />
										<Typography variant='body2' sx={{ textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis' }}>
											{`${product.name} `}
										</Typography>
									</Box>
									<Typography sx={{ flex: '1' }}>{product.supplier}</Typography>
									<Typography sx={{ flex: '1' }}>{product.quantity}</Typography>
									<Typography sx={{ flex: '1' }}>{`${(new Intl.NumberFormat().format(product.price * 1000))} VND`}</Typography>
									<Typography sx={{ flex: '1' }}>{product.color}</Typography>
									<Typography sx={{ flex: '1' }}>{product.material}</Typography>
									<Typography sx={{ flex: '1', textTransform: 'uppercase' }}>{product.size}</Typography>
									<Typography sx={{ flex: '1' }}> {formatDate(product.createdAt)} </Typography>
									<Button
										sx={{ flex: '1' }}
										variant='text'
										onClick={() => { handleViewDetail(product._id) }} >
										<MoreHorizIcon sx={{ color: '#888' }} />
									</Button>
								</Box>
							)
						})}
					</Box>
					<Dialog
						open={!!openDetail}
						onClose={handleCloseViewDetail}
						sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
					>
						<DialogTitle sx={{ backgroundColor: 'secondary.main', color: '#fff' }}>
							Chỉnh sửa thông tin sản phẩm
							<Tooltip title="Đóng ">
								<CloseIcon onClick={handleCloseViewDetail} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
							</Tooltip>
						</DialogTitle>
						<DialogContent >
							<UpdateProduct productDetail={productDetail} closeTest={handleCloseViewDetail} updateDetailProduct={updateDetailProduct} DeleteProduct={DeleteProduct} />
						</DialogContent>

					</Dialog>
					<Box>
						{productList &&
							<Pagination
								onChange={handlePageShowProduct}
								size='large'
								page={numberOfPage}
								count={totalPage}
								defaultPage={1}
								variant="outlined"
								sx={{
									maxWidth: '1200px',
									margin: ' 32px auto 0',
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
						}
					</Box>
				</Box>

			</Box>

		</Box>
	)
}

export default memo(ProductListStatistic)