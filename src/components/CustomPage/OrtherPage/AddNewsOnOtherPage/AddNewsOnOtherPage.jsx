import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import AddIcon from '@mui/icons-material/Add'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import Switch from '@mui/material/Switch'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Tooltip from '@mui/material/Tooltip'

import { toast } from 'react-toastify'
import About from '~/components/AboutComponent/About'
import Intro from '~/components/Intro/Intro'
import { Alert, CircularProgress, FormControlLabel } from '@mui/material'

const AddNewsOnOtherPage = memo(({ addNews }) => {
	const SLUG = 'tiemcur'
	const [news, setNews] = useState({
		title: '',
		content: '',
		isDark: false,
		isCenter: false,
		thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1723884187/upload_wt1avg.jpg'
	})
	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: news.title,
			content: news.content,
			isDark: news.isDark,
			isCenter: news.isCenter,
			thumb: news.thumb
		}
	})
	const [openSettingAbout, setOpenSettingAbout] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)

	const [loading, setLoading] = useState(false)
	console.log('loading: ', loading)
	const inputImgRef = useRef(null)

	const handleCloseSettingAbout = () => {
		resetField('title')
		resetField('content')
		resetField('thumb')
		resetField('isDark')
		resetField('isCenter')
		setNews({ ...news, isCenter: false, isDark: false })
		setOpenSettingAbout(false)
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview, news.thumb])

	useEffect(() => {
		setValue('title', '')
		setValue('content', '')
		setValue('thumb', '')
		setValue('isDark', false)
		setValue('isCenter', false)
		setImgPreview(undefined)
	}, [openSettingAbout])

	useEffect(() => {
		return () => {
			setImgPreview(undefined)
			URL.revokeObjectURL(news.thumb)
		}
	}, [news.thumb])

	const handleUploadImg = () => {
		inputImgRef.current.click()
	}

	const submitSettingSlide = (data) => {
		const file = data['thumb'][0]
		const formData = new FormData()
		formData.append('thumb', file)
		formData.append('title', data.title)
		formData.append('content', data.content)
		formData.append('isDark', data.isDark)
		formData.append('isCenter', data.isCenter)
		setLoading(true)

		addNews(SLUG, formData)
			.then(data => {
				toast.success('Bài đăng đã được thêm', { position: 'top-center' })
			})
			.catch(error => {
				toast.error('Có lỗi đã xảy ra', { position: 'top-center' })
			})
			.finally(a => setLoading(false))
		handleCloseSettingAbout()
	}

	return (
		<Box sx={{ position: 'relative', mt: '20px', backgroundColor: 'primary.dark', height: '64px' }} >
			{loading &&
				<Box sx={{ backgroundColor: 'rgba(0,0,0,1)', zIndex: '99', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: '99' }}>
					<CircularProgress sx={{ color: 'secondary.main' }} size={80} />
				</Box>}
			<Box sx={{
				position: 'absolute',
				top: '0', bottom: '0', left: '0', right: '0',
				width: '100%',
				zIndex: '1',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				cursor: 'pointer',
				transition: 'all linear .3s',
				'&:hover': {
					backgroundColor: 'rgba(255,255,255,0.3)',
					'& .MuiButtonBase-root': {
						backgroundColor: 'transparent',
						'&:hover': {
							color: '#fff'
						}
					}
				}
			}} onClick={(e) => {
				setOpenSettingAbout(true)
			}} >

				<Button startIcon={<AddIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '12px 20px', fontWeight: '700', transition: 'all linear .3s', }} >
					Thêm nội dung
				</Button>
			</Box>
			{/* 
			{news.isCenter &&
				<Intro intro={news} setting={openSettingAbout} darkTheme={news.isDark} />
			}
			{!news.isCenter &&
				<About about={news} setting={openSettingAbout} darkTheme={news.isDark} />
			} */}

			<Dialog
				open={openSettingAbout}
				onClose={handleCloseSettingAbout}
				sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
			>
				<DialogTitle >
					Thêm nội dung
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(submitSettingSlide)}>
						<Box sx={{
							overflowX: 'hidden',
						}} >
							<Box onClick={handleUploadImg} sx={{
								cursor: 'pointer',
								'& img': {
									minWidth: '100%',
									maxWidth: '100%',
									objectFit: 'cover',
									objectPosition: 'center center',
									filter: 'brightness(64%)',
									'&.addImg': {
										maxHeight: '400px',
									}
								}
							}}>

								<Box sx={{ position: 'relative' }}>

									{imgPreview && <img src={imgPreview} />}
									{!imgPreview && <img className='addImg' src={news.thumb} />}

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
										required: 'Bạn hãy chọn hình ảnh.',
										onChange: (e) => {
											setImgPreview(URL.createObjectURL(e.target.files[0]))
										}
									})}
								/>
								{errors.thumb && (
									<Alert
										severity='error'
										sx={{
											marginTop: '0.7em',
											'.MuiAlert-message': { overflow: 'hidden' },
										}}
									>
										{errors.thumb.message}
									</Alert>
								)}
							</Box>

							<TextField
								fullWidth
								size='small'
								label="Tiêu đề"
								type="text"
								variant="outlined"
								{...register('title', {
									required: 'Bạn hãy nhập tiêu đề.'
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
							{errors.title && (
								<Alert
									severity='error'
									sx={{
										marginTop: '0.7em',
										'.MuiAlert-message': { overflow: 'hidden' },
									}}
								>
									{errors.title.message}
								</Alert>
							)}

							<TextField
								fullWidth
								size='small'
								label="Nội dung"
								type="text"
								multiline
								minRows={5}
								variant="outlined"
								{...register('content', {
									required: 'Bạn hãy nhập nội dung.',
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
							{errors.content && (
								<Alert
									severity='error'
									sx={{
										marginTop: '0.7em',
										'.MuiAlert-message': { overflow: 'hidden' },
									}}
								>
									{errors.content.message}
								</Alert>
							)}

							<FormControlLabel
								control={<Switch checked={news.isDark} color='secondary'
									{...register('isDark', {
										onChange: (e) => { setNews({ ...news, isDark: e.target.checked }) }
									})} />}
								label="Chủ đề tối" />

							<FormControlLabel
								control={<Switch checked={news.isCenter} color='secondary'
									{...register('isCenter', {
										onChange: (e) => { setNews({ ...news, isCenter: e.target.checked }) }
									})}
								/>}
								label="Trình bày trên dưới " />
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
								<Button
									variant="outlined"
									onClick={handleCloseSettingAbout}
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
					</form >
				</DialogContent>
			</Dialog>
		</Box >
	)
})

export default AddNewsOnOtherPage