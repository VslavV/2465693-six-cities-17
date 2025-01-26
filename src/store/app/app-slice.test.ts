import { DEFAULT_CITY, SortOption } from '../../const';
import { appSlice, setCity, setCurrentSort } from './app-slice';

describe ('App Slice', ()=>{
  it('should change current city', ()=>{
    const city = 'Moscow';
    const state = {city: DEFAULT_CITY, currentSort: SortOption.Popular,};
    const expectedState = {city: 'Moscow', currentSort: SortOption.Popular};

    const result = appSlice.reducer(state, setCity(city));
    expect(result).toEqual(expectedState);
  });

  it('should change current sort option to "Price: low to high"', () => {
    const state = {city: DEFAULT_CITY, currentSort: SortOption.Popular,};
    const expectedState = {city: DEFAULT_CITY, currentSort: SortOption.LowToHigh};
    const Option = SortOption.LowToHigh;

    const result = appSlice.reducer(state, setCurrentSort(Option));
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', ()=> {
    const expectedState = {city: DEFAULT_CITY, currentSort: SortOption.Popular,};
    const emptyAction = {type: ''};

    const result = appSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});


