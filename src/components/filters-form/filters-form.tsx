import {DEFAULT_PAGE_COUNT, GuitarType} from '../../const';
import { updateFilterParams } from '../../store/action';
import { updatePageCount } from '../../store/action';
import { getFilterParams} from '../../store/search-params/selectors';
import { useState, useEffect, ChangeEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import StringCheckbox from '../string-checkbox/string-checkbox';
import { loadMaxMinPrices } from '../../store/api-actions';
import PriceFields from '../price-fields/price-fields';

function FiltersForm():JSX.Element {
  const guitarsStrings = [4,6,7,12];
  const filterParams = useSelector(getFilterParams);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const guitarTypes = searchParams.getAll('type') ?? [''];
  const stringCount = searchParams.getAll('stringCount') ?? [''];

  const [filters, setFilters] = useState({
    'type': guitarTypes,
    'stringCount': stringCount,
  });

  const handleChangeType = (e: ChangeEvent<HTMLInputElement>) => {

    if(e.target.checked) {
      setFilters({...filters, 'type': [...filters['type'], e.target.name]});
    } else {
      setFilters({...filters, 'type' : filters['type'].filter((type) => type !== e.target.name)});
    }
  };

  const handleChangeStringCount = (e: ChangeEvent<HTMLInputElement>, count: string) => {

    if(e.target.checked) {
      setFilters({...filters, 'stringCount': [...filters['stringCount'], count]});
    } else {
      setFilters({...filters, 'stringCount': filters['stringCount'].filter((value) => value !== count)});
    }
  };

  useEffect(() => {
    dispatch(loadMaxMinPrices());
  }, []);

  useEffect(() => {
    dispatch(updateFilterParams(Object.assign(
      {},
      filterParams,
      filters,
    )));
    dispatch(updatePageCount(DEFAULT_PAGE_COUNT));
  }, [filters]);

  return (
    <form className="catalog-filter" onSubmit={(e) => {e.preventDefault();}}>
      <h2 className="title title--bigger catalog-filter__title">
                  Фильтр
      </h2>
      <PriceFields/>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
                    Тип гитар
        </legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            checked={filters['type'].includes(GuitarType.Acoustic)}
            onChange={handleChangeType}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            checked={filters['type'].includes(GuitarType.Electric)}
            onChange={handleChangeType}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            checked={filters['type'].includes(GuitarType.Ukulele)}
            onChange={handleChangeType}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
                    Количество струн
        </legend>
        {guitarsStrings.map((count) =>
          (
            <StringCheckbox
              key={`${count}-key`}
              onHandleStringCount={handleChangeStringCount}
              count={count}
              currentStrings={filters['stringCount']}
              currentTypes={filters['type']}
            />))}
      </fieldset>
    </form>
  );
}

export default FiltersForm;
