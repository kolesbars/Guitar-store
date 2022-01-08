import { APIRoute } from '../../const';
import { updateGuitarsList } from '../../store/action';
import { getGuitars } from '../../store/guitars-data/selectors';
import {ChangeEvent} from 'react';
import {useSearchParams} from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarType } from '../../types/guitar';
import StringCheckbox from './string-checkbox';
import {AxiosInstance} from 'axios';

type FiltersFormProps = {
  api: AxiosInstance,
}
const guitarStrings = [4,6,7,12];

function FiltersForm({api}: FiltersFormProps):JSX.Element {
  const guitars = useSelector(getGuitars);

  const minPrice = Math.min(...guitars.map((guitar) => guitar.price)).toString();
  const maxPrice = Math.max(...guitars.map((guitar) => guitar.price)).toString();

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const loadGuitarList = async () => {
    const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}?${searchParams.toString()}`);
    dispatch(updateGuitarsList(data));
  };

  const guitarTypes = searchParams.getAll('type') || [''];
  const stringCount = searchParams.getAll('stringCount') || [''];

  const [currentTypes, setCurrentTypes] = useState(guitarTypes);
  const [currentStrings, setCurrentStrings] = useState(stringCount);

  const [params, setParams] = useState({
    type: currentTypes,
    stringCount: currentStrings,
  });

  useEffect(() => {
    setParams({...params, type: currentTypes, stringCount: currentStrings});
  }, [currentTypes, currentStrings]);

  const handleChangeType = (e: ChangeEvent<HTMLInputElement>) => {

    if(e.target.checked) {
      setCurrentTypes([...currentTypes, e.target.name]);
    } else {
      setCurrentTypes([...currentTypes.filter((type) => type !== e.target.name)]);
    }
    setSearchParams(params);
  };

  const handleStringCount = (e: ChangeEvent<HTMLInputElement>, count: string) => {

    if(e.target.checked) {
      setCurrentStrings([...currentStrings, count]);
    } else {
      setCurrentStrings([...currentStrings.filter((type) => type !== count)]);
    }
    setSearchParams(params);
  };

  useEffect(() => {
    setSearchParams(params);
    loadGuitarList();
  },  [params]);

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
            checked={currentTypes.includes('acoustic')}
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
            checked={currentTypes.includes('electric')}
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
            checked={currentTypes.includes('ukulele')}
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
              handleStringCount={handleStringCount}
              count={count}
              currentStrings={currentStrings}
              currentTypes={currentTypes}
            />))}
      </fieldset>
    </form>
  );
}

export default FiltersForm;
