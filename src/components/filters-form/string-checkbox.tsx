import {ChangeEvent} from 'react';

const FOUR_STRING_COUNT = 4;
const SIX_STRING_COUNT = 6;
const SEVEN_STRING_COUNT = 7;
const TWELVE_STRING_COUNT = 12;

type StringCheckboxProps = {
  count: number,
  handleStringCount: (e: ChangeEvent<HTMLInputElement>, count: string) => void,
  currentStrings: string[],
  currentTypes: string[],
}

function StringCheckbox(props: StringCheckboxProps): JSX.Element {

  const {count, handleStringCount, currentStrings, currentTypes} = props;

  const isDisabled = (): boolean => {
    if (currentTypes.length) {
      switch (count) {
        case FOUR_STRING_COUNT:
          return !currentTypes.includes('ukulele') && !currentTypes.includes('electric');
        case SIX_STRING_COUNT:
          return !currentTypes.includes('acoustic') && !currentTypes.includes('electric');
        case SEVEN_STRING_COUNT:
          return !currentTypes.includes('acoustic') && !currentTypes.includes('electric');
        case TWELVE_STRING_COUNT:
          return !currentTypes.includes('acoustic');
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
