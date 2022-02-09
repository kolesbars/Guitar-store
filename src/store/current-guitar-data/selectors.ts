import { NameSpace } from '../root-reducer';
import { GuitarType, CommentType } from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitarData = (state: State): GuitarType => state[NameSpace.guitar].guitarData;
export const getComments = (state: State): CommentType[] => state[NameSpace.guitar].comments;
