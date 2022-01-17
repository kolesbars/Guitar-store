import {
  updateFilterParams,
  updateSortParams,
  updatePaginationParams,
  updateSearchFormParams
} from '../action';
import {searchParams} from './search-params';

describe('Reducer: SearchParams', () => {
  it('without additional parametrs should return initial state', () => {
    expect(searchParams(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(
        {
          sortParams: {},
          filterParams: {},
          searchFormParams: {},
          paginationParams: {},
        });
  });

  it('should update sorting parametrs', () => {
    const state = {
      sortParams: {},
      filterParams: {},
      searchFormParams: {},
      paginationParams: {},
    };
    const data = {
      '_order': 'price',
      '_sort': 'asc',
    };
    expect(searchParams(state, updateSortParams(data)))
      .toEqual({
        sortParams: {
          '_order': 'price',
          '_sort': 'asc',
        },
        filterParams: {},
        searchFormParams: {},
        paginationParams: {},
      });
  });

  it('should update filtering parametrs', () => {
    const state = {
      sortParams: {},
      filterParams: {},
      searchFormParams: {},
      paginationParams: {},
    };
    const data = {
      'type': ['ukulele'],
      'stringCount': ['4'],
    };
    expect(searchParams(state, updateFilterParams(data)))
      .toEqual({
        sortParams: {},
        filterParams: {
          'type': ['ukulele'],
          'stringCount': ['4'],
        },
        searchFormParams: {},
        paginationParams: {},
      });
  });

  it('should update search form parametrs', () => {
    const state = {
      sortParams: {},
      filterParams: {},
      searchFormParams: {},
      paginationParams: {},
    };
    const data = {
      'name_like': 'вио',
    };
    expect(searchParams(state, updateSearchFormParams(data)))
      .toEqual({
        sortParams: {},
        filterParams: {},
        searchFormParams: {
          'name_like': 'вио',
        },
        paginationParams: {},
      });
  });

  it('should update pagination parametrs', () => {
    const state = {
      sortParams: {},
      filterParams: {},
      searchFormParams: {},
      paginationParams: {},
    };
    const data = {
      '_start': '0',
      '_end': '9',
    };
    expect(searchParams(state, updatePaginationParams(data)))
      .toEqual({
        sortParams: {},
        filterParams: {},
        searchFormParams: {},
        paginationParams: {
          '_start': '0',
          '_end': '9',
        },
      });
  });

});
