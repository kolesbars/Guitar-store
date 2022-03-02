import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getGuitarsIDInCart = (state: State): number[] => state[NameSpace.cart].guitarsID;
