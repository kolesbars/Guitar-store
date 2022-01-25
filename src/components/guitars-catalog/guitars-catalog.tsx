import GuitarCard from '../guitar-card/guitar-card';
import {GuitarType} from '../../types/guitar';

type GuitarCatalogProps = {
  guitars: GuitarType[]
}

function GuitarCatalog({guitars}:GuitarCatalogProps):JSX.Element {

  return (
    <div className="cards catalog__cards" data-testid='guitars-catalog'>
      {guitars.map((guitar) => (
        <GuitarCard
          key={guitar.id}
          guitar={guitar}
        />),
      )}
    </div>
  );
}

export default GuitarCatalog;
