import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import EditIcon from '@mui/icons-material/Edit'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

import { toast } from 'react-toastify'


const SettingSlide = memo(({ page, ortherPage, updateSlide }) => {
	const SLUG = 'tiemcur'
	const [slide, setSlide] = useState({ ...page?.slide })

	const [id, setId] = useState({ _id: slide._id, pageId: slide.pageId, webId: slide.webId })


	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: slide.title,
			heading: slide.heading,
			content: slide.content,
			description: slide.description,
			img: slide.thumb
		}
	})

	const [openSettingSlide, setOpenSettingSlide] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)
	const inputImgRef = useRef(null)

	const handleCloseSettingSlide = () => {
		resetField('title')
		resetField('heading')
		resetField('content')
		resetField('description')
		resetField('thumb')
		setOpenSettingSlide(false)
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview, slide.thumb])
	useEffect(() => {
		setValue('title', slide.title)
		setValue('heading', slide.heading)
		setValue('content', slide.content)
		setValue('description', slide.description)
		setValue('thumb', slide.thumb)
		setImgPreview(undefined)
	}, [openSettingSlide])

	useEffect(() => {
		return () => {
			setImgPreview(undefined)
			URL.revokeObjectURL(slide.thumb)
		}
	}, [slide.thumb])

	const handleUploadImg = () => {
		inputImgRef.current.click()
	}

	const submitSettingSlide = (data) => {
		const file = typeof data['thumb'] !== 'string' ? data['thumb'][0] : ''
		const formData = new FormData()
		formData.append('thumb', file)
		formData.append('title', data.title)
		formData.append('content', data.content)
		formData.append('heading', data.heading)
		formData.append('description', data.description)
		formData.append('_id', id._id)
		formData.append('pageId', id.pageId)
		formData.append('webId', id.webId)
		updateSlide(SLUG, formData)
		setSlide({
			...slide,
			title: data.title,
			heading: data.heading,
			content: data.content,
			description: data.description,
			thumb: typeof data.thumb !== 'string' ? URL.createObjectURL(file) : slide.thumb
		})
		toast('Đã chỉnh sửa')
		handleCloseSettingSlide()
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
						backgroundColor: 'rgba(255, 255, 255, 0.3)',
						'&:hover': {
							color: '#000'

						}

					}
				}
			}} onClick={() => {
				setOpenSettingSlide(true)
			}} >
				<Button startIcon={<EditIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '12px 20px', fontWeight: '700', transition: 'all linear .3s', }} >
					Chỉnh sửa
				</Button>
			</Box>
			{
				slide &&
				<Box sx={{
					position: 'relative',
					width: '100%',
					height: '444px',
					'& img': {
						position: 'absolute',
						top: 0,
						minWidth: '100%',
						maxWidth: '100%',
						minHeight: '100%',
						maxHeight: '100%',
						objectFit: 'cover',
						objectPosition: 'center center',
						filter: 'brightness(64%)'
					}

				}}>
					<img src={slide.thumb} alt="" />
					<Box sx={{
						position: 'absolute',
						top: '24%',
						right: '10%',
						transform: 'none',
						minWidth: '320px',
						maxWidth: '360px',
						textAlign: 'center'
					}}>
						<Box sx={{
							'& .MuiTypography-root': {
								color: 'primary.main',
								fontFamily: 'fontFamily',
								letterSpacing: '2px',
								m: '0 0 20px 0'
							},
							'& .MuiTypography-root.MuiTypography-body1': {
								fontSize: '14px'
							}

						}}>
							<Typography variant="body1" sx={{ fontWeight: 'bold' }} >{slide.title}</Typography>
							<Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '20px' }} >{slide.heading}</Typography>
							<Typography variant="body1" >{slide.content}</Typography>
							<Typography variant="body1">{slide.description}</Typography>
						</Box>
					</Box>
				</Box>
			}

			<Dialog
				open={openSettingSlide}
				onClose={handleCloseSettingSlide}
				sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
			>
				<DialogTitle >
					Chỉnh sửa nội dung
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(submitSettingSlide)}>
						<Box >
							<Box onClick={handleUploadImg} sx={{
								cursor: 'pointer',
								'& img': {
									minWidth: '100%',
									maxWidth: '100%',
									minHeight: '400px',
									maxHeight: '400px',
									objectFit: 'cover',
									objectPosition: 'center center',
									filter: 'brightness(64%)'
								}
							}}>

								<Box sx={{ position: 'relative' }}>

									{imgPreview && <img src={imgPreview} />}
									{!imgPreview && <img src={slide.thumb} />}

									<Box sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor: !imgPreview ? 'rgba(255,255,255,0.3)' : 'transparent'
									}}>
										<Button variant='outlined' size='large' startIcon={<DriveFolderUploadIcon />}>Thay hình ảnh</Button>
									</Box>
								</Box>

								<TextField
									fullWidth
									type="file"
									inputRef={inputImgRef}
									variant="outlined"
									sx={{ display: 'none' }}
									{...register('thumb', {
										onChange: (e) => {
											setImgPreview(URL.createObjectURL(e.target.files[0]))
										}
									})}
								/>
							</Box>

							<TextField
								fullWidth
								size='small'
								label={!ortherPage ? 'Địa chỉ' : 'Tiêu đề'}
								type="text"
								variant="outlined"
								{...register('title')}
								sx={{
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
							/>
							{!ortherPage && <TextField
								fullWidth
								size='small'
								label="Tiều đề"
								type="text"
								multiline
								minRows={2}
								variant="outlined"
								{...register('heading')}
								sx={{
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
							/>}

							<TextField
								fullWidth
								size='small'
								label="Nội dung"
								type="text"

								multiline
								minRows={2}
								variant="outlined"
								{...register('content')}
								sx={{
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
							/>
							<TextField
								fullWidth
								size='small'
								label="Mô tả"
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
							/>

							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
								<Button
									variant="outlined"
									onClick={handleCloseSettingSlide}
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
export default SettingSlide