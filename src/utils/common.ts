import { GuitarType } from '../const';

export const getGuitarType = (value: string | undefined) => {
  switch (value) {
    case GuitarType.Acoustic:
      return 'Акустическая гитара';
    case GuitarType.Electric:
      return 'Электрогитара';
    case GuitarType.Ukulele:
      return 'Укулеле';
    default:
      break;
  }
};
