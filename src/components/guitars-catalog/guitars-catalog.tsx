import { AxiosInstance } from 'axios';
import GuitarCard from './guitar-card';
import {GuitarType} from '../../types/guitar';

type GuitarCatalogProps = {
  api: AxiosInstance
  guitars: GuitarType[]
}

function GuitarCatalog({guitars, api}:GuitarCatalogProps):JSX.Element {

  return (
    <div className="cards catalog__cards" data-testid='guitars-catalog'>
      {guitars.map((guitar) => (
        <GuitarCard
          key={guitar.id}
          api={api}
          guitar={guitar}
        />),

      )}
    </div>
  );
}

export default GuitarCatalog;
