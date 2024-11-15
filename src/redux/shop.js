import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	items: []
}
const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		addToShop: (state, action) => {
			const index = state.items.findIndex(item => {
				return item.oldProduct._id === action.payload.oldProduct._id
			})
			if (index >= 0) {
				state.items[index].quantity += action.payload.quantity
				if (state.items[index].quantity >= action.payload.totalQuantity) {
					state.items[index].quantity = action.payload.totalQuantity
				}
			} else {
				state.items.push(action.payload)
			}
		},

		changeQuantityInShop: (state, action) => {
			const index = state.items.findIndex(item => item.oldProduct._id === action.payload.oldProduct._id);
			if (action.payload.quantity > 0) {
				state.items[index].quantity = action.payload.quantity
			} else {
				state.items = state.items.filter(item => item.oldProduct._id !== action.payload.oldProduct._id);
			}
		},

		removeItemInShop: (state, action) => {
			const index = state.items.findIndex(item => item.oldProduct._id === action.payload.oldProduct._id);
			state.items = state.items.filter(item => item.oldProduct._id !== action.payload.oldProduct._id);
		},
		removeAllItem: (state, action) => {
			state.items = []
		}
	}
})

export const { addToShop, changeQuantityInShop, removeItemInShop, removeAllItem } = shopSlice.actions
export default shopSlice.reducer