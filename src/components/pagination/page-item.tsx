import { MouseEvent } from 'react';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPageCount } from '../../store/page-count/selectors';
import { updatePageCount } from '../../store/action';
import {Link} from 'react-router-dom';

type PageItemProps = {
  page: string,
}

function PageItem ({page}: PageItemProps):JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPage = useSelector(getPageCount);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(updatePageCount(page));
    navigate(`${AppRoute.Catalog}/${page}`);
  };


  return (
    <li className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`}>
      <Link
        className="link pagination__page-link"
        to='#'
        onClick={handleClick}
      >
        {page}
      </Link>
    </li>);
}

export default PageItem;
