import { MouseEvent } from 'react';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom';

type PageItemProps = {
  page: string,
  currentPage: string,
  setCurrentPage : (page: string) => void
}

function PageItem ({page, currentPage, setCurrentPage}: PageItemProps):JSX.Element {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentPage(page);
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
