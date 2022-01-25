import { StringCount, GuitarType } from '../../const';
import { ChangeEvent } from 'react';

type StringCheckboxProps = {
  count: number,
  onHandleStringCount: (e: ChangeEvent<HTMLInputElement>, count: string) => void,
  currentStrings: string[],
  currentTypes: string[],
}

function StringCheckbox(props: StringCheckboxProps): JSX.Element {

  const {count, onHandleStringCount: handleStringCount, currentStrings, currentTypes} = props;

  const isDisabled = (): boolean => {
    if (currentTypes.length) {
      switch (count) {
        case StringCount.Four:
          return !currentTypes.includes(GuitarType.Ukulele) && !currentTypes.includes(GuitarType.Electric);
        case StringCount.Six:
          return !currentTypes.includes(GuitarType.Acoustic) && !currentTypes.includes(GuitarType.Electric);
        case StringCount.Seven:
          return !currentTypes.includes(GuitarType.Acoustic) && !currentTypes.includes(GuitarType.Electric);
        case StringCount.Twelve:
          return !currentTypes.includes(GuitarType.Acoustic);
        default:
          return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div className="form-checkbox catalog-filter__block-item" data-testid='string-checkbox'>
      <input
        className="visually-hidden"
        type="checkbox"
        id={`${count}-strings`}
        name={`${count}-strings`}
        onChange={(evt) => {
          handleStringCount(evt, count.toString());
        }}
        checked={currentStrings.includes(`${count}`)}
        disabled={isDisabled()}
      />
      <label htmlFor={`${count}-strings`}>{count}</label>
    </div>
  );
}

export default StringCheckbox;
