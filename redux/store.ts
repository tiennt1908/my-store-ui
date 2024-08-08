import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/auth.slice';
import NotifyReducer from './slices/notify.slice';
import UserReducer from './slices/user.slice';
import CartReducer from './slices/cart.slice';
import OrderReducer from './slices/order.slice';
import ProductReducer from './slices/product.slice';
import CategoryReducer from './slices/category.slice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    notify: NotifyReducer,
    user: UserReducer,
    cart: CartReducer,
    order: OrderReducer,
    product: ProductReducer,
    category: CategoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
