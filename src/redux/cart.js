import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	items: []
}
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const index = state.items.findIndex(item => item.id === action.payload.id)
			if (index >= 0) {
				state.items[index].quantity += action.payload.quantity
				if (state.items[index].quantity >= action.payload.totalQuantity) {
					state.items[index].quantity = action.payload.totalQuantity
				}
			} else {
				state.items.push(action.payload)
			}
			localStorage.setItem('cartItems', JSON.stringify(state.items)); // Lưu vào localStorage
		},

		changeQuantity: (state, action) => {
			const index = state.items.findIndex(item => item.id === action.payload.id);
			if (action.payload.quantity > 0) {
				state.items[index].quantity = action.payload.quantity;
			} else {
				state.items = state.items.filter(item => item.id !== action.payload.id);
			}
			localStorage.setItem('cartItems', JSON.stringify(state.items)); // Lưu vào localStorage
		},

		removeItem: (state, action) => {
			const index = state.items.findIndex(item => item.id === action.payload.id);
			state.items = state.items.filter(item => item.id !== action.payload.id);
			localStorage.setItem('cartItems', JSON.stringify(state.items)); // Lưu vào localStorage
		},
		removeAllItem: (state, action) => {
			state.items = [];
			localStorage.setItem('cartItems', JSON.stringify(state.items));
		}
	}
})

export const { addToCart, changeQuantity, removeItem, removeAllItem } = cartSlice.actions
export default cartSlice.reducer