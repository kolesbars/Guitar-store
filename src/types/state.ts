import { GuitarType } from './guitar';
import { SearchParamsType } from './search-params';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsList: GuitarType[]
}

export type SearchParams = {
  params: SearchParamsType
}

export type State = RootState;
