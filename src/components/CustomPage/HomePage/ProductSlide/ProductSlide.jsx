import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import EditIcon from '@mui/icons-material/Edit'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'


import { toast } from 'react-toastify'

const ProductSlide = memo(({ page, updateHomePage }) => {
	const SLUG = 'tiemcur'
	const [thumb, setThumb] = useState({ thumbShirt: page?.thumbShirt, thumbPant: page?.thumbPant })
	const [id, setId] = useState({ _id: page?._id, webId: page?.webId })
	const { register, handleSubmit, resetField, setValue } = useForm({
		mode: 'onChange',
		defaultValues: {
			thumbShirt: thumb.thumbShirt,
			thumbPant: thumb.thumbPant
		}
	})

	const [openSettingProductSlide, setOpenSettingProductSlide] = useState(false)

	const [imgShirtPreview, setImgShirtPreview] = useState(undefined)
	const [imgPantReview, setImgPantReview] = useState(undefined)

	const inputImgShirtRef = useRef(null)
	const inputImgPantRef = useRef(null)

	const handleCloseSettingProductSlide = () => {
		resetField('thumbShirt')
		resetField('thumbPant')
		setOpenSettingProductSlide(false)
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgShirtPreview)
		}
	}, [imgShirtPreview, thumb.thumbShirt])

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPantReview)
		}
	}, [imgPantReview, thumb.thumbPant])

	useEffect(() => {
		setValue('thumbShirt', thumb.thumbShirt)
		setValue('thumbPant', thumb.thumbPant)
		setImgShirtPreview(undefined)
		setImgPantReview(undefined)
	}, [openSettingProductSlide])

	useEffect(() => {
		return () => {
			setImgShirtPreview(undefined)
			URL.revokeObjectURL(thumb.thumbShirt)
		}
	}, [thumb.thumbShirt])

	useEffect(() => {
		return () => {
			setImgPantReview(undefined)
			URL.revokeObjectURL(thumb.thumbPant)
		}
	}, [thumb.thumbPant])

	const handleUploadImgShirt = () => {
		inputImgShirtRef.current.click()
	}
	const handleUploadImgPant = () => {
		inputImgPantRef.current.click()
	}

	const submitSettingSlide = (data) => {
		const thumbShirt = typeof data['thumbShirt'][0] !== 'string' ? data['thumbShirt'][0] : ''
		const thumbPant = typeof data['thumbPant'][0] !== 'string' ? data['thumbPant'][0] : ''
		const formData = new FormData()
		formData.append('thumbShirt', thumbShirt)
		formData.append('thumbPant', thumbPant)
		formData.append('_id', id._id)
		formData.append('webId', id.webId)
		updateHomePage(SLUG, formData)
		setThumb({
			...thumb,
			thumbPant: typeof data.thumbPant !== 'string' ? URL.createObjectURL(thumbPant) : thumb.thumbPant,
			thumbShirt: typeof data.thumbShirt !== 'string' ? URL.createObjectURL(thumbShirt) : thumb.thumbShirt
		})
		toast('Đã chỉnh sửa')
		handleCloseSettingProductSlide()
		// const imgLink = await uploadImg_API(formData)
	}

	return (
		<Box sx={{ position: 'relative' }}>
			<Box sx={{
				position: 'absolute',
				md: '20px',
				top: '0', bottom: '0', left: '0', right: '0',
				backgroundColor: 'rgba(255,255,255,0.1)',
				width: '100%',
				zIndex: '1',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				cursor: 'pointer',
				transition: 'all linear .3s',
				'&:hover': {
					backgroundColor: 'rgba(255,255,255,0.3)',
					'& .MuiButtonBase-root': {
						backgroundColor: 'rgba(0,0,0,0.8)',
						'&:hover': {
							color: '#fff'
						}
					}
				}
			}} onClick={() => {
				setOpenSettingProductSlide(true)
			}} >
				<Button startIcon={<EditIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '12px 20px', fontWeight: '700', transition: 'all linear .3s', }} >
					Chỉnh sửa
				</Button>
			</Box>


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
					<img src={thumb.thumbShirt}
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
					<img src={thumb.thumbPant}
						alt=""
						style={{
							width: '100%',
							padding: '12px',
							maxHeight: '640px'
						}}
					/>
				</Box>
			</Box>



			<Dialog
				open={openSettingProductSlide}
				onClose={handleCloseSettingProductSlide}
				sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
			>
				<DialogTitle >
					Chỉnh sửa nội dung
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(submitSettingSlide)}>
						<Box >

							<Box onClick={handleUploadImgShirt} sx={{
								cursor: 'pointer',
								'& img': {
									minWidth: '100%',
									maxWidth: '100%',
									objectFit: 'cover',
									height: '600px',
									objectPosition: 'center center',
									filter: 'brightness(64%)'
								}
							}}>

								<Box sx={{ position: 'relative' }}>

									{imgShirtPreview && <img src={imgShirtPreview} />}
									{!imgShirtPreview && <img src={thumb.thumbShirt} />}

									<Box sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor: !imgShirtPreview ? 'rgba(255,255,255,0.3)' : 'transparent'
									}}>
										<Button variant='outlined' size='large' startIcon={<DriveFolderUploadIcon />}>Thay hình ảnh</Button>
									</Box>
								</Box>

								<TextField
									fullWidth
									type="file"
									inputRef={inputImgShirtRef}
									variant="outlined"
									sx={{ display: 'none' }}
									{...register('thumbShirt', {
										onChange: (e) => {
											setImgShirtPreview(URL.createObjectURL(e.target.files[0]))
										}
									})}
								/>
							</Box>

							<Box onClick={handleUploadImgPant} sx={{
								cursor: 'pointer',
								'& img': {
									minWidth: '100%',
									maxWidth: '100%',
									objectFit: 'cover',
									height: '600px',
									objectPosition: 'center center',
									filter: 'brightness(64%)'
								}
							}}>

								<Box sx={{ position: 'relative' }}>

									{imgPantReview && <img src={imgPantReview} />}
									{!imgPantReview && <img src={thumb.thumbPant} />}

									<Box sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor: !imgPantReview ? 'rgba(255,255,255,0.3)' : 'transparent'
									}}>
										<Button variant='outlined' size='large' startIcon={<DriveFolderUploadIcon />}>Thay hình ảnh</Button>
									</Box>
								</Box>

								<TextField
									fullWidth
									type="file"
									inputRef={inputImgPantRef}
									variant="outlined"
									sx={{ display: 'none' }}
									{...register('thumbPant', {
										onChange: (e) => {
											setImgPantReview(URL.createObjectURL(e.target.files[0]))
										}
									})}
								/>
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
								<Button
									variant="outlined"
									onClick={handleCloseSettingProductSlide}
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
									Lưu
								</Button>
							</Box>

						</Box>
					</form >
				</DialogContent>
			</Dialog>
		</Box >
	)
})
export default ProductSlide