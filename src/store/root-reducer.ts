import { combineReducers } from '@reduxjs/toolkit';
import { guitarsData } from './guitars-data/guitars-data';

export enum NameSpace {
  guitars = 'GUITARS',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
});

export type RootState = ReturnType<typeof rootReducer>;

