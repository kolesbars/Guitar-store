import { updatePageCount, updateTotalCount} from '../action';
import { pageCount } from './page-count';

describe('Reducer: PageCount', () => {
  it('without additional parametrs should return initial state', () => {
    expect(pageCount(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({pageCount: '1', totalCount: ''});
  });

  it('should update the page number', () => {
    const state = { pageCount: '1', totalCount: ''};
    const data = '2';
    expect(pageCount(state, updatePageCount(data)))
      .toEqual({pageCount: '2', totalCount: ''});
  });

  it('should update the total count', () => {
    const state = { pageCount: '1', totalCount: ''};
    const data = '27';
    expect(pageCount(state, updateTotalCount(data)))
      .toEqual({pageCount: '1', totalCount: '27'});
  });
});
