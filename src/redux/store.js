import { configureStore } from '@reduxjs/toolkit'

import cartReducer from '~/redux/cart'
import shopReducer from '~/redux/shop'
const loadCartStateFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('cartItems')
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};
export const store = configureStore({
	reducer: {
		cart: cartReducer,
		shop: shopReducer
	},
	preloadedState: {
		cart: {
			items: loadCartStateFromLocalStorage() || []
		}
	}
})