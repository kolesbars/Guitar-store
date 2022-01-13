import { Link } from 'react-router-dom';
import { getPageCount } from '../../store/page-count/selectors';
import {useSelector} from 'react-redux';

function Navigation(): JSX.Element {
  const pageCount = useSelector(getPageCount);

  return (
    <div className="container main-index">
      <img src="./img/svg/logo.svg" width="300" alt="Логотип проекта"/>
      <h1>Список страниц</h1>
      <ol>
        <li><Link to="ui-kit.html">UI-kit — ui-kit.html</Link></li>
        <li><Link to={`/catalog/${pageCount}`}>Каталог — main.html</Link></li>
        <li><Link to="cart.html">Корзина — cart.html</Link></li>
        <li><Link to="guitar/:id">Товар — product.html</Link></li>
      </ol>
    </div>
  );
}

export default Navigation;
