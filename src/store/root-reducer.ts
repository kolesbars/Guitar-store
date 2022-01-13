import { combineReducers } from '@reduxjs/toolkit';
import { pageCount } from './page-count/page-count';
import { searchParams } from './search-params/search-params';
import { guitarsData } from './guitars-data/guitars-data';

export enum NameSpace {
  guitars = 'GUITARS',
  params = 'PARAMS',
  page = 'PAGE'
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
  [NameSpace.params]: searchParams,
  [NameSpace.page]: pageCount,
});

export type RootState = ReturnType<typeof rootReducer>;

