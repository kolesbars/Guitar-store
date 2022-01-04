import { GuitarType } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsList: GuitarType[]
}

export type State = RootState;
