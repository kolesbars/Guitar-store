import GuitarCard from './guitar-card';
import {GuitarType} from '../../types/guitar';

type GuitarCatalogProps = {
  guitars: GuitarType[]
}

function GuitarCatalog({guitars}:GuitarCatalogProps):JSX.Element {

  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => {
        const key = guitar.id;
        return (
          <GuitarCard
            key={key}
            guitar={guitar}
          />);
      },

      )}
    </div>
  );
}

export default GuitarCatalog;
