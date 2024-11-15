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
import Intro from '~/components/Intro/Intro'

const SettingIntro = memo(({ page, updateNews }) => {
	const SLUG = 'tiemcur'
	const [intro, setIntro] = useState({ ...page?.intro })
	const [id, setId] = useState({ _id: intro._id, pageId: intro.pageId, webId: intro.webId })
	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: intro.title,
			content: intro.content,
			thumb: intro.thumb
		}
	})

	const [openSettingIntro, setOpenSettingIntro] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)
	const inputImgRef = useRef(null)

	const handleCloseSettingIntro = () => {
		resetField('title')
		resetField('content')
		resetField('thumb')
		setOpenSettingIntro(false)
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview, intro.thumb])
	useEffect(() => {
		setValue('title', intro.title)
		setValue('content', intro.content)
		setValue('thumb', intro.thumb)
		setImgPreview(undefined)
	}, [openSettingIntro])

	useEffect(() => {
		return () => {
			setImgPreview(undefined)
			URL.revokeObjectURL(intro.thumb)
		}
	}, [intro.thumb])

	const handleUploadImg = () => {
		inputImgRef.current.click()
	}

	const submitSettingSlide = (data) => {
		const file = typeof data['thumb'] !== 'string' ? data['thumb'][0] : ''
		const formData = new FormData()
		formData.append('thumb', file)
		formData.append('title', data.title)
		formData.append('content', data.content)
		formData.append('isDark', false)
		formData.append('isCenter', true)
		formData.append('_id', id._id)
		formData.append('pageId', id.pageId)
		formData.append('webId', id.webId)
		updateNews(SLUG, formData)
		setIntro({
			...intro,
			title: data.title,
			content: data.content,
			thumb: typeof data.thumb !== 'string' ? URL.createObjectURL(file) : intro.thumb
		})
		toast('Đã chỉnh sửa')
		handleCloseSettingIntro()
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
				setOpenSettingIntro(true)
			}} >
				<Button startIcon={<EditIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '12px 20px', fontWeight: '700', transition: 'all linear .3s', }} >
					Chỉnh sửa
				</Button>
			</Box>
			{/* {
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
			} */}

			<Intro intro={intro} setting={openSettingIntro} />

			<Dialog
				open={openSettingIntro}
				onClose={handleCloseSettingIntro}
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
									objectFit: 'cover',
									objectPosition: 'center center',
									filter: 'brightness(64%)'
								}
							}}>

								<Box sx={{ position: 'relative' }}>

									{imgPreview && <img src={imgPreview} />}
									{!imgPreview && <img src={intro.thumb} />}

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
								label="Tiêu đề"
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

							<TextField
								fullWidth
								size='small'
								label="Nội dung"
								type="text"
								multiline
								minRows={5}
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


							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
								<Button
									variant="outlined"
									onClick={handleCloseSettingIntro}
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
export default SettingIntro