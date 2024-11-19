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
import CloseIcon from '@mui/icons-material/Close'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import SearchIcon from '@mui/icons-material/Search'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { Alert } from '@mui/material'

function UpdateProduct({ productDetail, closeTest, updateDetailProduct, DeleteProduct }) {
	const inputImgRef = useRef(null)
	const [newProduct, setNewProduct] = useState({ ...productDetail })
	const [imgProductPreview, setImgProductPreview] = useState(undefined)
	const { register, handleSubmit, resetField, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			...newProduct
		}
	})
	const handleUploadImg = () => {
		inputImgRef.current.click()
	}

	const submitSettingSlide = async (data) => {
		const formData = new FormData()
		const file = typeof data['thumb'] !== 'string' ? data['thumb'][0] : ''
		formData.append('thumb', file)
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
		formData.append('webId', productDetail.webId)
		formData.append('_id', productDetail._id)

		toast('Đang cập nhật sản phẩm....', { position: 'top-center' })
		updateDetailProduct(formData)

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
		closeTest()
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgProductPreview)
		}
	}, [imgProductPreview])
	const handleDeleteProduct = () => {
		DeleteProduct(productDetail._id)
		handleCloseAddProduct()
	}
	return (
		<Box>
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
								variant="outlined"
								onClick={() => { handleDeleteProduct() }}
								sx={{
									mt: '20px',
									padding: ' 8px 20px',
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
								Cập nhật
							</Button>


						</Box>
					</Box>
				</Box>
			</form >
		</Box>
	)
}

export default memo(UpdateProduct)