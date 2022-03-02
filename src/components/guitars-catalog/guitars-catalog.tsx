import GuitarCard from '../guitar-card/guitar-card';
import {GuitarType} from '../../types/guitar';

type GuitarCatalogProps = {
  guitars: GuitarType[],
  onSetIsAddToCartModalHidden: (value: boolean) => void,
  onSetCurrentGuitarData: (value: GuitarType) => void,
}

function GuitarCatalog(props:GuitarCatalogProps):JSX.Element {

  const {guitars, onSetIsAddToCartModalHidden, onSetCurrentGuitarData} = props;

  return (
    <div className="cards catalog__cards" data-testid='guitars-catalog'>
      {guitars.map((guitar) => (
        <GuitarCard
          key={guitar.id}
          guitar={guitar}
          onSetIsAddToCartModalHidden={onSetIsAddToCartModalHidden}
          onSetCurrentGuitarData={onSetCurrentGuitarData}
        />),
      )}
    </div>
  );
}

export default GuitarCatalog;
