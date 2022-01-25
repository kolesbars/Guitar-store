import { MouseEvent } from 'react';
import { AppRoute } from '../../const';
import { useDispatch} from 'react-redux';
import { updatePageCount } from '../../store/action';
import {Link} from 'react-router-dom';

type PageItemProps = {
  page: string,
  pageCount: string,
}

function PageItem ({page, pageCount}: PageItemProps):JSX.Element {
  const dispatch = useDispatch();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(updatePageCount(page));
  };

  return (
    <li className={`pagination__page ${page === pageCount ? 'pagination__page--active' : ''}`}>
      <Link
        className="link pagination__page-link"
        to={`${AppRoute.Catalog}/${page}`}
        onClick={handleClick}
      >
        {page}
      </Link>
    </li>);
}

export default PageItem;
