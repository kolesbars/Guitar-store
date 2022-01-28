import {GuitarType, StringCount} from '../../const';
import { ChangeEvent } from 'react';

type TypeCheckboxProps = {
  type: string,
  onHandleChangeType: (e: ChangeEvent<HTMLInputElement>) => void,
  currentStrings: string[],
  currentTypes: string[],
}

function TypeCheckbox (props: TypeCheckboxProps ): JSX.Element  {
  const {type, onHandleChangeType, currentStrings, currentTypes} = props;

  const isDisabled = (): boolean => {
    if (currentStrings.length) {
      switch (type) {
        case GuitarType.Acoustic:
          return !currentStrings.includes(StringCount.Six.toString())
          && !currentStrings.includes(StringCount.Seven.toString())
          && !currentStrings.includes(StringCount.Twelve.toString());
        case GuitarType.Electric:
          return !currentStrings.includes(StringCount.Six.toString())
          && !currentStrings.includes(StringCount.Seven.toString())
          && !currentStrings.includes(StringCount.Four.toString());
        case GuitarType.Ukulele:
          return !currentStrings.includes(StringCount.Four.toString());
        default:
          return false;
      }
    } else {
      return false;
    }
  };

  const getTypeTitle = (value: string): string => {
    switch (value) {
      case GuitarType.Acoustic:
        return 'Акустические гитары';
      case GuitarType.Electric:
        return 'Электрогитары';
      case GuitarType.Ukulele:
        return 'Укулеле';
      default:
        return '';
    }
  };

  return(
    <div className="form-checkbox catalog-filter__block-item">
      <input
        data-testid='type-checkbox'
        className="visually-hidden"
        type="checkbox"
        id={type}
        name={type}
        checked={currentTypes.includes(type)}
        onChange={onHandleChangeType}
        disabled={isDisabled()}
      />
      <label htmlFor={type}>{getTypeTitle(type)}</label>
    </div>
  );
}

export default(TypeCheckbox);
