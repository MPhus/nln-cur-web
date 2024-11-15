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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// import { getUser } from '~/apis/mock'
import { addNewUser_API, DeleteUser_API, fetchUser_API, getUserById_API, updateDetailUser_API } from '~/apis/index'
import { Alert } from '@mui/material'
import { formatDate } from '~/untils/format'
import UpdateUser from './UpdateUser'

function UserListStatistic() {
	const currentUser = JSON.parse(localStorage.getItem('userInfo'))
	const [userList, setUserList] = useState(undefined)
	const userView = userList?.data?.find(u => u.email === currentUser.email)
	const [closeIcon, setCloseIcon] = useState('')
	const [test, setTest] = useState({})
	const [searchText, setSearchText] = useState('')
	const [numberOfPage, setNumberOfPage] = useState(1)
	const [openDetail, setOpenDetail] = useState(false)
	const [userDetail, setUserDetail] = useState({})
	const [isAdminFilter, setIsAdminFilter] = useState(false)
	const [openAddUser, setOpenAddUser] = useState(false)
	const totalPage = userList?.totalPage
	const totalUser = userList?.totalUser

	const [newUser, setNewUser] = useState({
		email: '',
		name: '',
		isAdmin: false,
		phone: '',
		password: '',
		confirmPassword: '',
	})

	const { register, handleSubmit, resetField, formState: { errors }, watch } = useForm({
		mode: 'onChange',
		defaultValues: {
			...newUser
		}
	})


	const password = useRef({})
	password.current = watch('password', '')
	useEffect(() => {
		const filter = { name: '', email: '', page: numberOfPage, limit: 10, searchtext: searchText, isAdmin: isAdminFilter }
		fetchUser_API('tiemcur', filter).then(data => setUserList(data))

	}, [numberOfPage, searchText, test, isAdminFilter])

	const handlePageShowUser = (e, v) => {
		setNumberOfPage(v)
	}
	useEffect(() => {
		return () => {
			setNumberOfPage(1)
		}
	}, [])

	const handleViewDetail = (id) => {
		getUserById_API('tiemcur', id)
			.then(product => {
				setUserDetail(product)
				setOpenDetail(true)
			}
			)
	}
	const handleCloseViewDetail = () => {
		setOpenDetail(false)

	}

	const submitSettingAddUser = async (data) => {
		const { email, name, isAdmin, password, phone } = data
		const dataSubmit = { email, name, isAdmin, password, phone }
		try {
			const newssss = await addNewUser_API('tiemcur', dataSubmit)
			toast('Đang thêm người dùng....', { position: 'top-center' })
			setTest(newssss)

			handleCloseAddUser()
		} catch (error) {
			toast.error(error?.response.data.message, { position: 'top-center' })
		}

	}

	const handleCloseAddUser = () => {
		resetField('name')
		resetField('email')
		resetField('isAdmin')
		resetField('phone')
		resetField('password')
		resetField('confirmPassword')
		setOpenAddUser(false)
		setTimeout(() => {
			setTest({})
		}, 5000);
	}

	const updateDetailUser = (data) => {
		console.log('data: ', data)

		updateDetailUser_API('tiemcur', data).then(pro => setTest(pro))
	}
	const DeleteUser = (id) => {
		DeleteUser_API('tiemcur', id).then(pro => setTest(pro))
	}

	return (
		<Box sx={{ maxWidth: '1200px', minWidth: '1200px', m: '40px auto', }}>
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
					<Typography variant='h4' sx={{ color: 'secondary.main', fontWeight: '700' }} >Tổng người dùng: {totalUser}</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>

						<Button variant='outlined' sx={{
							color: '#000',
							border: '1px solid #000',
							'&:hover': {
								border: '1px solid #000',
								opacity: '0.8'
							}
						}} startIcon={<AddToPhotosIcon />} onClick={() => setOpenAddUser(true)}>Thêm người dùng</Button>

						<Dialog
							open={openAddUser}
							onClose={handleCloseAddUser}
							sx={{ '& .MuiPaper-root': { minWidth: '1200px', maxWidth: '1200px' } }}
						>
							<DialogTitle >
								Thêm người dùng
							</DialogTitle>
							<DialogContent>
								<form onSubmit={handleSubmit(submitSettingAddUser)} encType="multipart/form-data">
									<Box  >
										<Box sx={{ padding: '0 20px' }}>
											<TextField
												select
												label="Vai trò"
												size='small'
												defaultValue={false}
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
												Thêm
											</Button>
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
					backgroundColor: '#fff',
					padding: '20px 0',
					borderRadius: '8px'
				}}>
					<Box>
						<Box sx={{
							display: 'flex',
							padding: '0 20px',
							justifyContent: 'flex-end',
							mb: '20px'
						}}>
							<TextField
								select
								label="Vai trò"
								size='small'
								value={isAdminFilter}
								onChange={(e) => setIsAdminFilter(e.target.value)}
								defaultValue={false}
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
						</Box>
					</Box>
					<Box sx={{
						display: 'flex',
						borderBottom: '1px solid #000',
						justifyContent: 'space-between',
						'& .MuiButtonBase-root ': {
							fontWeight: '700',
							color: 'primary.dark',
							minWidth: '200px',
							maxWidth: '200px',
						}
					}}>
						<Button variant='text' sx={{ flex: '1' }} endIcon={null}>Tên người dùng</Button>
						<Button variant='text' sx={{ flex: '1' }} endIcon={null}>Email</Button>
						<Button variant='text' sx={{ flex: '1' }} endIcon={null}>Số điện thoại</Button>
						<Button variant='text' sx={{ flex: '1' }} endIcon={null}>Vai trò</Button>
						<Button variant='text' sx={{ flex: '1' }} endIcon={null}>Xóa / Chỉnh sửa</Button>
					</Box>

					<Box sx={{}} >
						{userList && userList?.data?.map((user, index) => {
							return (
								<Box key={index} sx={{
									display: 'flex',
									position: 'relative',
									justifyContent: 'space-between',
									backgroundColor: '#fff',
									alignItems: 'center',
									boxShadow: '0px 0px 1px #888888',
									padding: '12px 0',
									textAlign: 'center',
									'& .MuiButtonBase-root, & .MuiTypography-body1  ': {
										color: 'primary.dark',
										minWidth: '200px',
										maxWidth: '200px',
									},
									'&:hover': {
										backgroundColor: 'rgba(0,0,0,0.03)',
									}
								}}>
									<Box sx={{
										position: 'absolute',
										top: '0',
										left: '0',
										backgroundColor: 'secondary.main',
										color: '#fff',
										fontSize: '12px',
										userSelect: 'none',
										display: userView?._id === user._id ? 'block' : 'none',

									}}>Tài khoản của bạn</Box>
									<Typography sx={{ flex: '1' }}>{user.name}</Typography>
									<Typography sx={{ flex: '1' }}>{user.email}</Typography>
									<Typography sx={{ flex: '1' }}>{user.phone}</Typography>
									{userView?._id !== user._id &&
										<TextField
											select
											size='small'
											value={user.isAdmin}
											onChange={(e) => updateDetailUser({ isAdmin: e.target.value, _id: user._id, webId: user.webId })}
											defaultValue={user.isAdmin}
											sx={{
												minWidth: '200px',
												maxWidth: '200px',
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
									}
									{userView?._id === user._id &&
										<Typography sx={{ flex: '1' }}>{user.isAdmin ? 'Quản lý' : 'Nhân viên'}</Typography>
									}

									{userView?._id !== user._id &&
										<Button
											sx={{ flex: '1' }}
											variant='text'
											onClick={() => { DeleteUser(user._id) }} >
											<DeleteForeverIcon sx={{ color: '#888' }} />
										</Button>
									}
									{userView?._id === user._id &&
										<Button
											sx={{ flex: '1' }}
											variant='text'
											onClick={() => { handleViewDetail(user._id) }} >
											<MoreHorizIcon sx={{ color: '#888' }} />
										</Button>

									}
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
											<UpdateUser userDetail={userDetail} closeTest={handleCloseViewDetail} updateDetailUser={updateDetailUser} DeleteUser={DeleteUser} />
										</DialogContent>

									</Dialog>
								</Box>
							)
						})}
					</Box>
					<Box>
						{userList &&
							<Pagination
								onChange={handlePageShowUser}
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

export default memo(UserListStatistic)