import { GuitarType } from '../const';

const PERCENTS = 100;

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

export const calculateDiscount = (price: number, discount: number) => price*discount/PERCENTS;
