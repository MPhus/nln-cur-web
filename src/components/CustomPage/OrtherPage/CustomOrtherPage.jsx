import { memo, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { mapOrder } from '~/untils/format'
import {
	DndContext,
	useSensor,
	useSensors,
	closestCorners
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/dndKitSensors'

import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

import SettingOtherPage from './SettingOtherPage/SettingOtherPage'
import AddNewsOnOtherPage from './AddNewsOnOtherPage/AddNewsOnOtherPage'

const CustomOrtherPage = memo(({ page, addNews, moveNews, deleteNews, updateNews }) => {
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10
		},
		autoScrollEnabled: false
	})
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 250,
			tolerance: 500
		}
	})
	const sensors = useSensors(mouseSensor, touchSensor)
	const [newsList, setNewsList] = useState([])
	useEffect(() => {
		setNewsList(mapOrder(page.newsList, page.newListOderIds, '_id'))
	}, [page])

	const handleDragEnd = (e) => {

		const { active, over } = e
		if (!over) return
		if (active.id !== over.id) {

			const oldIndex = newsList.findIndex(n => n._id === active.id)
			const newIndex = newsList.findIndex(n => n._id === over.id)

			const newArr = arrayMove(newsList, oldIndex, newIndex)
			setNewsList(newArr)
			moveNews(newArr)
			// const newOrderIds = newArr.map(n => n._id)
		}
	}
	return (
		<Box>
			<DndContext collisionDetection={closestCorners} sensors={sensors} onDragEnd={handleDragEnd}>
				<SortableContext items={newsList.map(item => item._id)} strategy={verticalListSortingStrategy}>
					<Box>
						{newsList.map((item) => {
							return (
								<SettingOtherPage key={item._id} data={item} deleteNews={deleteNews} updateNews={updateNews} />
							)
						})}
					</Box>
				</SortableContext>
			</DndContext>
			<AddNewsOnOtherPage addNews={addNews} />
		</Box>
	)
})

export default CustomOrtherPage