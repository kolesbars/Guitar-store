import { NameSpace } from '../root-reducer';
import { GuitarPricesType, QuantityType } from '../../types/cart';
import { State } from '../../types/state';

export const getGuitarsIDInCart = (state: State): number[] => state[NameSpace.cart].guitarsID;
export const getTotalPrices = (state: State): GuitarPricesType[] => state[NameSpace.cart].totalPrices;
export const getGuitarsQuantity = (state: State): QuantityType[] => state[NameSpace.cart].guitarsQuantity;
