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

function UpdateUser({ userDetail, closeTest, updateDetailUser, DeleteUser }) {
	const inputImgRef = useRef(null)
	const [newUser, setNewUser] = useState({ ...userDetail })
	const [imgUserPreview, setImgUserPreview] = useState(undefined)
	const { register, handleSubmit, resetField, formState: { errors }, watch } = useForm({
		mode: 'onChange',
		defaultValues: {
			...newUser,
			password: '',
			confirmPassword: ''
		}
	})
	const password = useRef({})
	password.current = watch('password', '')
	const submitSettingSlide = async (data) => {
		const { email, name, isAdmin, phone, password } = data
		const dataSubmit = { email, name, isAdmin, phone, webId: newUser.webId, _id: newUser._id, password }
		toast('Đã cập nhập người dùng', { position: 'top-center' })
		updateDetailUser(dataSubmit)

		handleCloseAddUser()
	}

	const handleCloseAddUser = () => {
		resetField('name')
		resetField('email')
		resetField('isAdmin')
		resetField('phone')
		closeTest()
	}

	const handleDeleteUser = () => {
		toast('Đã xóa sản phẩm', { position: 'top-center' })
		DeleteUser(userDetail._id)
		handleCloseAddUser()
	}
	return (
		<Box>
			<form onSubmit={handleSubmit(submitSettingSlide)} encType="multipart/form-data">
				<Box  >
					<Box sx={{ padding: '0 20px' }}>
						<TextField
							select
							label="Vai trò"
							size='small'
							defaultValue={newUser.isAdmin}
							{...register('isAdmin')}
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
							<MenuItem value={false}>Nhân viên</MenuItem>
							<MenuItem value={true}>Quản lý</MenuItem>
						</TextField>

						<TextField
							label='Tên người dùng'
							fullWidth
							type="text"
							variant="outlined"
							{...register('name', {
								required: 'Vui lòng nhập tên người dùng.'
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
						{errors.name &&
							<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
								{errors.name.message}
							</Alert>
						}

						<TextField
							label='Email'
							fullWidth
							type="text"
							variant="outlined"
							{...register('email', {
								required: 'Vui lòng nhập trường này.'
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
						{errors.email &&
							<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
								{errors.email.message}
							</Alert>
						}
						<TextField
							label="Password"
							fullWidth
							type="password"
							autoComplete='off'
							variant="outlined"
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
							error={!!errors.password}
							{...register('password', {
								required: 'Please enter password.',
								minLength: {
									value: 8,
									message: 'Password must have at least 8 characters.'
								}
							})}
						/>
						{errors.password &&
							<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
								{errors.password.message}
							</Alert>
						}

						<TextField
							label="Confirm Password"
							fullWidth
							autoComplete='off'
							type="password"
							variant="outlined"
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
							error={!!errors.confirmPassword}
							{...register('confirmPassword', {
								validate: value =>
									value === password.current || 'The passwords do not match.'
							})}
						/>
						{errors.confirmPassword &&
							<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
								{errors.confirmPassword.message}
							</Alert>
						}

						<TextField
							label='Số điện thoại'
							fullWidth
							type="text"
							variant="outlined"
							{...register('phone', {
								required: 'Vui lòng nhập trường này.'
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
						{errors.phone &&
							<Alert severity="error" sx={{ mt: '8px', py: '0', maxWidth: '100% !important', minWidth: '100% !important', '.MuiAlert-message': { overflow: 'hidden' } }}>
								{errors.phone.message}
							</Alert>
						}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', pt: '20px' }}>
						<Button
							variant="outlined"
							onClick={() => { handleDeleteUser() }}
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
							onClick={() => handleCloseAddUser()}
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
			</form >
		</Box>
	)
}

export default memo(UpdateUser)