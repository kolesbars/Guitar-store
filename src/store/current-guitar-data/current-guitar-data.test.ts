import { emptyGuitar, emptyComment } from '../../const';
import { currentGuitarData } from './current-guitar-data';
import {
  updateGuitarData,
  updateCurrentGuitarComments,
  addNewGuitarComment,
  setCommentSendigStatusFalse
} from '../action';

describe('Reducer: currentGuitarData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(currentGuitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitarData: emptyGuitar,
        isDataLoaded: false,
        isCommentsLoaded: false,
        isCommentSent: false,
        comments: [],
      });
  });

  it('should update guitar data', () => {
    const state = {
      guitarData: emptyGuitar,
      isDataLoaded: false,
      isCommentsLoaded: false,
      isCommentSent: false,
      comments: [],
    };

    const data = emptyGuitar;

    expect(currentGuitarData(state, updateGuitarData(data)))
      .toEqual({
        guitarData: emptyGuitar,
        isDataLoaded: true,
        isCommentsLoaded: false,
        isCommentSent: false,
        comments: [],
      });
  });

  it('should set comment sendig status false', () => {
    const state = {
      guitarData: emptyGuitar,
      isDataLoaded: false,
      isCommentsLoaded: false,
      isCommentSent: true,
      comments: [],
    };

    expect(currentGuitarData(state, setCommentSendigStatusFalse()))
      .toEqual({
        guitarData: emptyGuitar,
        isDataLoaded: false,
        isCommentsLoaded: false,
        isCommentSent: false,
        comments: [],
      });
  });

  it('should update guitar`s comments', () => {
    const state = {
      guitarData: emptyGuitar,
      isDataLoaded: false,
      isCommentsLoaded: false,
      isCommentSent: false,
      comments: [],
    };

    const data = [emptyComment];

    expect(currentGuitarData(state, updateCurrentGuitarComments(data)))
      .toEqual({
        guitarData: emptyGuitar,
        isDataLoaded: false,
        isCommentsLoaded: true,
        isCommentSent: false,
        comments: [emptyComment],
      });
  });

  it('should add new comment', () => {
    const state = {
      guitarData: emptyGuitar,
      isDataLoaded: false,
      isCommentsLoaded: false,
      isCommentSent: false,
      comments: [],
    };

    const data = emptyComment;

    expect(currentGuitarData(state, addNewGuitarComment(data)))
      .toEqual({
        guitarData: emptyGuitar,
        isDataLoaded: false,
        isCommentsLoaded: false,
        isCommentSent: true,
        comments: [emptyComment],
      });
  });
});
