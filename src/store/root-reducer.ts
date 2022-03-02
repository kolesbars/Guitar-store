import { combineReducers } from '@reduxjs/toolkit';
import { pageCount } from './page-count/page-count';
import { searchParams } from './search-params/search-params';
import { currentGuitarData} from './current-guitar-data/current-guitar-data';
import { cartData } from './cart-data/cart-data';
import { guitarsData } from './guitars-data/guitars-data';

export enum NameSpace {
  guitars = 'GUITARS',
  guitar = 'GUITAR',
  params = 'PARAMS',
  page = 'PAGE',
  cart = 'CART',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
  [NameSpace.guitar]: currentGuitarData,
  [NameSpace.params]: searchParams,
  [NameSpace.page]: pageCount,
  [NameSpace.cart]: cartData,
});

export type RootState = ReturnType<typeof rootReducer>;

