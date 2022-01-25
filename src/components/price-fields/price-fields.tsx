import { useState, useEffect, ChangeEvent, KeyboardEvent, FocusEvent} from 'react';
import {DEFAULT_PAGE_COUNT} from '../../const';
import { updateFilterParams } from '../../store/action';
import { updatePageCount } from '../../store/action';
import { getMaxMinPrices } from '../../store/guitars-data/selectors';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterParams} from '../../store/search-params/selectors';

function PriceFields(): JSX.Element {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const prices = useSelector(getMaxMinPrices);

  const filterParams = useSelector(getFilterParams);

  const priceGTE = searchParams.get('price_gte') ?? '';
  const priceLTE = searchParams.get('price_lte') ?? '';

  const [isChanged, setIsChanged] = useState(false);

  const [filterPriceFieldsValue, setFilterPriceFieldsValue] = useState({
    'price_gte': priceGTE,
    'price_lte': priceLTE,
  });


  const handleChangePriceField = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    e.preventDefault();
    setIsChanged(false);
    if (e.target.value !== '') {
      setFilterPriceFieldsValue({...filterPriceFieldsValue, [value] : e.target.value});
    }
    else {
      setFilterPriceFieldsValue({...filterPriceFieldsValue, [value] : ''});
    }
  };

  const hahdleOutMinField = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && +e.target.value < +prices.min) {
      setFilterPriceFieldsValue({...filterPriceFieldsValue, 'price_gte' : prices.min});
    } else {
      setFilterPriceFieldsValue({...filterPriceFieldsValue, 'price_gte' : e.target.value});
    }
    setIsChanged(true);
  };

  const hahdleOutMaxField = (e: FocusEvent<HTMLInputElement>) => {
    setIsChanged(false);
    if (e.target.value !== '' && +e.target.value > +prices.max) {
      setFilterPriceFieldsValue({...filterPriceFieldsValue, 'price_lte' : prices.max});
    }
    else {
      setFilterPriceFieldsValue({...filterPriceFieldsValue, 'price_lte' : e.target.value});
    }
    setIsChanged(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setIsChanged(false);
    if (e.keyCode === 13) {

      if (+filterPriceFieldsValue.price_gte < +prices.min) {
        setFilterPriceFieldsValue({...filterPriceFieldsValue, 'price_gte' : prices.min});
      }

      if (+filterPriceFieldsValue.price_lte > +prices.max) {
        setFilterPriceFieldsValue({...filterPriceFieldsValue, 'price_lte' : prices.max});
      }

      setIsChanged(true);
      dispatch(updatePageCount(DEFAULT_PAGE_COUNT));
    }
  };

  useEffect(() => {
    setFilterPriceFieldsValue({
      'price_gte': priceGTE,
      'price_lte': priceLTE,
    });
  }, []);

  useEffect(() => {
    if (isChanged) {
      dispatch(updateFilterParams(Object.assign(
        {},
        filterParams,
        filterPriceFieldsValue,
      )));
    }
  }, [filterPriceFieldsValue, isChanged]);

  return (
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
            placeholder={prices && prices.min}
            id="priceMin"
            name="от"
            min='1'
            onChange={(evt) => {
              handleChangePriceField(evt, 'price_gte');
            }}
            onKeyDown={handleKeyDown}
            onBlur={hahdleOutMinField}
            value={filterPriceFieldsValue.price_gte}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">
                        Максимальная цена
          </label>
          <input
            type="number"
            placeholder={prices && prices.max}
            id="priceMax"
            name="до"
            min='1'
            onChange={(evt) => {
              handleChangePriceField(evt, 'price_lte');
            }}
            onKeyDown={handleKeyDown}
            onBlur={hahdleOutMaxField}
            value={filterPriceFieldsValue.price_lte}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFields;
