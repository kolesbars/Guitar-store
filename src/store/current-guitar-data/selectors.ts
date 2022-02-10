import { NameSpace } from '../root-reducer';
import { GuitarType, CommentType } from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitarData = (state: State): GuitarType => state[NameSpace.guitar].guitarData;
export const getComments = (state: State): CommentType[] => state[NameSpace.guitar].comments;
export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.guitar].isDataLoaded;
export const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.guitar].isCommentsLoaded;
export const getCommentSendingStatus = (state: State): boolean => state[NameSpace.guitar].isCommentSent;
