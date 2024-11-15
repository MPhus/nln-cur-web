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

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import SearchIcon from '@mui/icons-material/Search'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { getProduct } from '~/apis/mock'
import { addNewProduct_API, fetchProduct_API } from '~/apis/index'
import { Alert } from '@mui/material'
import { formatDate } from '~/untils/format'
import ProductListStatistic from './ProductListStatistic'
import CustomerListStatistic from './CustomerListStatistic'
import UserListStatistic from './UserListStatistic'
const Statistic = ({ type }) => {
	console.log('type: ', type)


	return (
		<Box>
			{type === 'Sản phẩm' && <ProductListStatistic />}
			{type === 'Khách hàng' && <CustomerListStatistic />}
			{type === 'Người dùng' && <UserListStatistic />}
		</Box>
	)
}

export default memo(Statistic)