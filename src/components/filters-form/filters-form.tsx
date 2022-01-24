import { updateFilterParams } from '../../store/action';
import { updatePageCount } from '../../store/action';
import { getFilterParams} from '../../store/search-params/selectors';
import { useState, useEffect, ChangeEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import StringCheckbox from './string-checkbox';
import { loadMaxMinPrices } from '../../store/api-actions';
import {AxiosInstance} from 'axios';
import PriceFields from './price-fields';

const GUITARS_STRINGS = [4,6,7,12];
const DEFAULT_PAGE_COUNT = '1';

type FiltersFormProps = {
  api: AxiosInstance,
}

function FiltersForm({api}: FiltersFormProps):JSX.Element {
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
            checked={filters['type'].includes('acoustic')}
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
            checked={filters['type'].includes('electric')}
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
            checked={filters['type'].includes('ukulele')}
            onChange={handleChangeType}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
                    Количество струн
        </legend>
        {GUITARS_STRINGS.map((count) =>
          (
            <StringCheckbox
              key={`${count}-key`}
              handleStringCount={handleChangeStringCount}
              count={count}
              currentStrings={filters['stringCount']}
              currentTypes={filters['type']}
            />))}
      </fieldset>
    </form>
  );
}

export default FiltersForm;
