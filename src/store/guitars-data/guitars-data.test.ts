import { updateGuitarsList } from '../action';
import { emptyGuitar } from '../../const';
import { guitarsData} from './guitars-data';

describe('Reducer: guitarData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(guitarsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitarsList: []});
  });

  it('should update the list of guitars', () => {
    const state = { guitarsList: []};
    const data = [emptyGuitar];
    expect(guitarsData(state, updateGuitarsList(data)))
      .toEqual({guitarsList: [emptyGuitar]});
  });
});
