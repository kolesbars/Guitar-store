import { combineReducers } from '@reduxjs/toolkit';
import { searchParams } from './search-params/search-params';
import { guitarsData } from './guitars-data/guitars-data';

export enum NameSpace {
  guitars = 'GUITARS',
  params = 'PARAMS',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
  [NameSpace.params]: searchParams,
});

export type RootState = ReturnType<typeof rootReducer>;

