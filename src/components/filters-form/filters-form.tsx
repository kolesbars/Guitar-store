import { APIRoute } from '../../const';
import { updateGuitarsList } from '../../store/action';
//import { updateSearchParams } from '../../store/action';
import { getGuitars } from '../../store/guitars-data/selectors';
import { getSearchParams } from '../../store/search-params/selectors';
import {ChangeEvent} from 'react';
import {useSearchParams} from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import useDebounce from '../../hooks/use-debounce';
import { GuitarType } from '../../types/guitar';
import StringCheckbox from './string-checkbox';
import {AxiosInstance} from 'axios';

//const DELAY = 500;

type FiltersFormProps = {
  api: AxiosInstance,
}
const guitarStrings = [4,6,7,12];

function FiltersForm({api}: FiltersFormProps):JSX.Element {
  const guitars = useSelector(getGuitars);
  const params = useSelector(getSearchParams);

  // eslint-disable-next-line no-console
  console.log(params);

  const minPrice = Math.min(...guitars.map((guitar) => guitar.price)).toString();
  const maxPrice = Math.max(...guitars.map((guitar) => guitar.price)).toString();

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const guitarTypes = searchParams.getAll('type') ?? [''];
  const stringCount = searchParams.getAll('stringCount') ?? [''];
  const priceGTE = searchParams.get('price_gte') ?? '1700';
  const priceLTE = searchParams.get('price_lte') ?? '35000';

  const [filters, setFilters] = useState({
    'type': guitarTypes,
    'stringCount': stringCount,
    'price_gte': priceGTE,
    'price_lte': priceLTE,
  });

  // const debouncePriceMinValue = useDebounce(priceMinValue, DELAY);
  // const debouncePriceMaxValue = useDebounce(priceMaxValue, DELAY);

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

  const handleChangePriceField = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    if (e.target.value !== '') {
      setFilters({...filters, [value] : e.target.value});
    }
  };

  const loadGuitarList = async () => {
    const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams.toString()}`);
    dispatch(updateGuitarsList(data));
  };

  useEffect(() => {
    setSearchParams(filters);
  }, [filters]);

  useEffect(() => {
    loadGuitarList();
  }, [searchParams]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">
                  Фильтр
      </h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
                    Цена, ₽
        </legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">
                        Минимальная цена
            </label>
            <input
              type="number"
              placeholder={minPrice}
              id="priceMin"
              name="от"
              min='0'
              onChange={(evt) => handleChangePriceField(evt, 'price_gte')}
              value={priceGTE}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">
                        Максимальная цена
            </label>
            <input
              type="number"
              placeholder={maxPrice}
              id="priceMax"
              name="до"
              min='0'
              onChange={(evt) => handleChangePriceField(evt, 'price_lte')}
              value={priceLTE}
            />
          </div>
        </div>
      </fieldset>
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
        {guitarStrings.map((count) =>
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
