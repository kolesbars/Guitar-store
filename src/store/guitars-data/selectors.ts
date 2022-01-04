import { NameSpace } from '../root-reducer';
import { GuitarType } from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitars = (state: State): GuitarType[] => state[NameSpace.guitars].guitarsList;
