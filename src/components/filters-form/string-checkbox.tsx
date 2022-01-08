import {ChangeEvent} from 'react';

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
        case 4:
          return !currentTypes.includes('ukulele') && !currentTypes.includes('electric');
        case 6:
          return !currentTypes.includes('acoustic') && !currentTypes.includes('electric');
        case 7:
          return !currentTypes.includes('acoustic') && !currentTypes.includes('electric');
        case 12:
          return !currentTypes.includes('acoustic');
        default:
          return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div className="form-checkbox catalog-filter__block-item">
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
