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
import Switch from '@mui/material/Switch'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import CloseIcon from '@mui/icons-material/Close'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


import { toast } from 'react-toastify'
import About from '~/components/AboutComponent/About'
import Intro from '~/components/Intro/Intro'
import { DialogActions, FormControlLabel } from '@mui/material'


const SettingOtherPage = memo(({ data, deleteNews, updateNews }) => {
	const SLUG = 'tiemcur'
	const [news, setNews] = useState({ ...data })
	const [id, setId] = useState({ webId: data.webId, pageId: data.pageId })
	const [testtt, setTesttt] = useState(false)
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: data._id, data: { ...data } })

	const DndStyle = {
		transform: CSS.Translate.toString(transform),
		transition,
	}

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
	const inputImgRef = useRef(null)

	const handleCloseSettingAbout = () => {
		resetField('title')
		resetField('content')
		resetField('thumb')
		resetField('isDark')
		resetField('isCenter')
		setOpenSettingAbout(false)
	}

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(imgPreview)
		}
	}, [imgPreview, news.thumb])

	useEffect(() => {
		setValue('title', news.title)
		setValue('content', news.content)
		setValue('thumb', news.thumb)
		setValue('isDark', news.isDark)
		setValue('isCenter', news.isCenter)
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
		const file = typeof data['thumb'] !== 'string' ? data['thumb'][0] : ''
		const formData = new FormData()
		formData.append('thumb', file)
		formData.append('title', data.title)
		formData.append('content', data.content)
		formData.append('isDark', data.isDark)
		formData.append('isCenter', data.isCenter)
		formData.append('_id', news._id)
		formData.append('pageId', id.pageId)
		formData.append('webId', id.webId)

		updateNews(SLUG, formData)
		setNews({
			...news,
			title: data.title,
			content: data.content,
			isDark: data.isDark,
			isCenter: data.isCenter,
			thumb: typeof data.thumb !== 'string' ? URL.createObjectURL(file) : news.thumb
		})
		toast('Đã chỉnh sửa')
		handleCloseSettingAbout()
	}
	const handleDeletenews = () => {
		setTesttt(news._id)
		handleCloseSettingAbout()
	}
	const handleDeletenews2 = () => {
		deleteNews(news._id)
	}
	return (
		<Box
			ref={setNodeRef} style={DndStyle} {...attributes}
			sx={{ position: 'relative', mt: '20px' }} >
			<Dialog
				open={testtt}
				onClose={() => setTesttt(false)}
				sx={{ '& .MuiPaper-root': { minWidth: '800px', maxWidth: '800px' } }}
			>
				<DialogTitle sx={{ backgroundColor: 'error.main', color: '#fff' }}>
					Xác nhận xóa bài viết
					<Tooltip title="Đóng ">
						<CloseIcon onClick={() => setTesttt(false)} sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }} />
					</Tooltip>
				</DialogTitle>
				<DialogContent sx={{
					mt: '20px',
					padding: ' 8px 20px',
				}}>
					Bài viết này sẽ vĩnh viễn bị xóa khỏi hệ thống của bạn, bạn có chắc chắn muốn xóa
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => { handleDeletenews2(testtt) }}
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
			<Tooltip
				title="Kéo để di chuyển"
				{...listeners}
				sx={{
					position: 'absolute',
					maxWidth: '200px',
					maxHeight: '32px',
					minHeight: '32px',
					top: '0', right: '0',
					backgroundColor: 'secondary.main',
					color: 'primary.main',
					display: 'flex',
					alignItems: 'center',
					cursor: 'pointer',
					zIndex: 2
				}} >
				<DragHandleIcon />
			</Tooltip>
			<Box sx={{
				position: 'absolute',
				top: '0', bottom: '0', left: '0', right: '0',
				// backgroundColor: 'rgba(255,255,255,0.1)',
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
			}} onClick={(e) => {
				setOpenSettingAbout(true)
			}} >

				<Button startIcon={<EditIcon />} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '12px 20px', fontWeight: '700', transition: 'all linear .3s', }} >
					Chỉnh sửa
				</Button>
			</Box>

			{news.isCenter &&
				<Intro intro={news} setting={openSettingAbout} darkTheme={news.isDark} />
			}
			{!news.isCenter &&
				<About about={news} setting={openSettingAbout} darkTheme={news.isDark} />
			}

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
									{!imgPreview && <img src={news.thumb} />}

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
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: '20px' }}>
								<Button
									variant="outlined"
									onClick={() => { handleDeletenews() }}
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
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
									<Button
										variant="outlined"
										onClick={() => { handleCloseSettingAbout() }}
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

						</Box>
					</form >
				</DialogContent>
			</Dialog>
		</Box >
	)
})

export default SettingOtherPage