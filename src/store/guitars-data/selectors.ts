import { NameSpace } from '../root-reducer';
import { GuitarType, PricesType, GuitarComment } from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitars = (state: State): GuitarType[] => state[NameSpace.guitars].guitarsList;
export const getSimilarGuitars = (state: State): GuitarType[] => state[NameSpace.guitars].similarGuitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.guitars].isLoaded;
export const getMaxMinPrices = (state: State): PricesType  => state[NameSpace.guitars].prices;
export const getCommentsCounts = (state: State): GuitarComment[]  => state[NameSpace.guitars].commentsCounts;
