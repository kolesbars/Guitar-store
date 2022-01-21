import { emptyGuitar } from '../../const';
import { guitarsData} from './guitars-data';
import {
  updateGuitarsList,
  updateSimilarGuitarsList,
  setLoadedStatusFalse,
  updateGuitarsPrices
} from '../action';

describe('Reducer: guitarData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(guitarsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitarsList: [],
        similarGuitars: [],
        isLoaded: false,
        prices: {
          min: '',
          max: '',
        }});
  });

  it('should update the list of guitars', () => {
    const state = {
      guitarsList: [],
      similarGuitars: [],
      isLoaded: false,
      prices: {
        min: '',
        max: '',
      }};

    const data = [emptyGuitar];

    expect(guitarsData(state, updateGuitarsList(data)))
      .toEqual({
        guitarsList: [emptyGuitar],
        similarGuitars: [],
        isLoaded: true,
        prices: {
          min: '',
          max: '',
        }});
  });

  it('should set loaded status false', () => {
    const state = {
      guitarsList: [],
      similarGuitars: [],
      isLoaded: true,
      prices: {
        min: '',
        max: '',
      }};

    const data = [emptyGuitar];

    expect(guitarsData(state, updateSimilarGuitarsList(data)))
      .toEqual({
        guitarsList: [],
        similarGuitars: [emptyGuitar],
        isLoaded: true,
        prices: {
          min: '',
          max: '',
        }});
  });

  it('should update the list of similar guitars', () => {
    const state = {
      guitarsList: [],
      similarGuitars: [],
      isLoaded: false,
      prices: {
        min: '',
        max: '',
      }};

    expect(guitarsData(state, setLoadedStatusFalse()))
      .toEqual({
        guitarsList: [],
        similarGuitars: [],
        isLoaded: false,
        prices: {
          min: '',
          max: '',
        }});
  });
  it('should update guitars max and min prices', () => {
    const state = {
      guitarsList: [],
      similarGuitars: [],
      isLoaded: false,
      prices: {
        min: '',
        max: '',
      }};

    expect(guitarsData(state, updateGuitarsPrices({
      min: '1700',
      max: '35000',
    })))
      .toEqual({
        guitarsList: [],
        similarGuitars: [],
        isLoaded: false,
        prices: {
          min: '1700',
          max: '35000',
        }});
  });
});
