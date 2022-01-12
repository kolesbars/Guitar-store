import { NameSpace } from '../root-reducer';
import {SearchFormParamsType, SortParamsType, FilterParamsType} from '../../types/search-params';
import { State } from '../../types/state';

export const getSortParams = (state: State): SortParamsType => state[NameSpace.params].sortParams;
export const getFilterParams = (state: State): FilterParamsType => state[NameSpace.params].filterParams;
export const getSearchFormParams = (state: State): SearchFormParamsType => state[NameSpace.params].searchFormParams;
