import { configureStore, Tuple } from '@reduxjs/toolkit';
import cartReducer from './cartSlices';

const localStorageMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	const { cart } = store.getState();
	localStorage.setItem('eventCart', JSON.stringify(cart.cart, null, 2));
	return result;
};

export const store = configureStore({
	reducer: {
		cart: cartReducer,
	},
	middleware: () => new Tuple(localStorageMiddleware),
});
