import { Alert, Box, Button, CardActions, SvgIcon, TextField, Typography, Zoom } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ReactComponent as LogoIconBlack } from '~/assets/svgIcon/curlogob_black.svg'
import authorizedAxiosIntance from '~/untils/authorizedAxios'
import { useNavigate } from 'react-router-dom'
import { API_ROOT } from '~/untils/contant'
function Login() {
	const { register, handleSubmit, formState: { errors } } = useForm()
	const navigate = useNavigate()
	const submitLogIn = async (data) => {
		const res = await authorizedAxiosIntance.post(`${API_ROOT}/v1/web/tiemcur/users/login`, data)
		const userInfo = {
			id: res.data.id,
			email: res.data.email,
			isAdmin: res.data.isAdmin,
		}
		localStorage.setItem('userInfo', JSON.stringify(userInfo))
		let nati = '/employee'
		if (userInfo.isAdmin) {
			nati = '/admin'
		}
		navigate(nati)
	}
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			alignItems: 'center',
			justifyContent: 'flex-start',
			background: 'url("https://res.cloudinary.com/dwa6hiofs/image/upload/v1721793364/363417858_603236581923414_5881309368405447945_n_uuuk6c.jpg")',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.6)'
		}}>
			<form onSubmit={handleSubmit(submitLogIn)}>
				<Zoom in={true} >
					<MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
						<Box sx={{ textAlign: 'center' }}>
							<SvgIcon component={LogoIconBlack} inheritViewBox sx={{
								height: '100%',
								width: '200px'
							}} />
						</Box>
						<Box sx={{ padding: '0 1em 1em 1em' }}>
							<Box sx={{
								marginTop: '1.2em',
								'& .MuiFormLabel-root': {
									fontSize: '16px',
									right: 'auto',
									left: '0'
								},
								'&  .MuiOutlinedInput-root ': {
									fontSize: '16px',
									' & .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #000 !important'
									},
								},
							}}>
								<TextField
									// autoFocus
									fullWidth
									label="Enter Email..."
									type="text"
									variant="outlined"
									error={!!errors.email}
									{...register('email', {
										required: 'Vui lòng nhập trường này.',
										pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g
									})}
								/>
								{errors.email && errors.email.type !== 'pattern' &&
									<Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.email.message}
									</Alert>
								}
								{errors?.email?.type === 'pattern' && (
									<Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
										Vui lòng nhập đúng định dạng email
									</Alert>
								)}
							</Box>

							<Box sx={{
								marginTop: '1.2em',
								'& .MuiFormLabel-root': {
									fontSize: '16px',
									right: 'auto',
									left: '0'
								},
								'&  .MuiOutlinedInput-root ': {
									fontSize: '16px',
									' & .MuiOutlinedInput-notchedOutline': {
										border: '1px solid #000 !important'
									},
								},
							}}>
								<TextField
									fullWidth
									label="Enter Password..."
									type="password"
									variant="outlined"
									error={!!errors.password}
									{...register('password', {
										required: 'Vui lòng nhập trường này.', minLength: 8
									})}
								/>
								{errors.password && errors.password?.type !== 'minLength' &&
									<Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
										{errors.password.message}
									</Alert>
								}
								{errors.password?.type === 'minLength' &&
									<Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
										Mật khẩu phải có tối thiểu 8 ký tự
									</Alert>
								}
							</Box>

						</Box>

						<CardActions sx={{ padding: '0.5em 1em 1em 1em' }}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								fullWidth
								sx={{
									backgroundColor: 'primary.dark',
									color: 'primary.main',
									transition: 'all linear .3s',
									'&:hover': {
										backgroundColor: 'primary.dark',
										opacity: '0.9'
									}
								}}
							>
								Login
							</Button>
						</CardActions>

					</MuiCard>
				</Zoom>

			</form>
		</Box>
	)
}

export default Login