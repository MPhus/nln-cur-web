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
import About from '~/components/AboutComponent/About'

const SettingAbout = memo(({ page, updateNews }) => {
	const SLUG = 'tiemcur'
	const [about, setAbout] = useState({ ...page?.about })
	const [id, setId] = useState({ _id: about._id, pageId: about.pageId, webId: about.webId })
	const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: about.title,
			content: about.content,
			thumb: about.thumb
		}
	})

	const [openSettingAbout, setOpenSettingAbout] = useState(false)

	const [imgPreview, setImgPreview] = useState(undefined)
	const inputImgRef = useRef(null)

	const handleCloseSettingAbout = () => {
		resetField('title')
		resetField('content')
		resetField('thumb')
		setOpenSettingAbout(false)
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview, about.thumb])
	useEffect(() => {
		setValue('title', about.title)
		setValue('content', about.content)
		setValue('thumb', about.thumb)
		setImgPreview(undefined)
	}, [openSettingAbout])

	useEffect(() => {
		return () => {
			setImgPreview(undefined)
			URL.revokeObjectURL(about.thumb)
		}
	}, [about.thumb])

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
		formData.append('isCenter', false)
		formData.append('_id', id._id)
		formData.append('pageId', id.pageId)
		formData.append('webId', id.webId)
		updateNews(SLUG, formData)
		setAbout({
			...about,
			title: data.title,
			content: data.content,
			thumb: typeof data.thumb !== 'string' ? URL.createObjectURL(file) : about.thumb
		})
		toast('Đã chỉnh sửa')
		handleCloseSettingAbout()
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
				setOpenSettingAbout(true)
			}} >
				<Button startIcon={<EditIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '12px 20px', fontWeight: '700', transition: 'all linear .3s', }} >
					Chỉnh sửa
				</Button>
			</Box>


			<About about={about} setting={openSettingAbout} />

			<Dialog
				open={openSettingAbout}
				onClose={handleCloseSettingAbout}
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
									{!imgPreview && <img src={about.thumb} />}

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
export default SettingAbout