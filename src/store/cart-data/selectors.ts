import { NameSpace } from '../root-reducer';
import { GuitarPricesType, QuantityType } from '../../types/cart';
import { State } from '../../types/state';

export const getGuitarsIDInCart = (state: State): number[] => state[NameSpace.cart].guitarsID;
export const getTotalPrices = (state: State): GuitarPricesType[] => state[NameSpace.cart].totalPrices;
export const getGuitarsQuantity = (state: State): QuantityType[] => state[NameSpace.cart].guitarsQuantity;
export const getDiscount = (state: State): number => state[NameSpace.cart].discount;
export const getIsSuccess = (state: State): boolean | null => state[NameSpace.cart].isSuccess;
export const getIsDeleteFromCartModalHidden = (state: State): boolean => state[NameSpace.cart].isDeleteFromCartModalHidden;
