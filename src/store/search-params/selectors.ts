import { NameSpace } from '../root-reducer';
import {SearchParamsType} from '../../types/search-params';
import { State } from '../../types/state';

export const getSearchParams = (state: State): SearchParamsType => state[NameSpace.params].params;
