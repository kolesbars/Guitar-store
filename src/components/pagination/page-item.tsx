import { MouseEvent } from 'react';
import { AppRoute } from '../../const';
import { useDispatch} from 'react-redux';
//import { getPageCount } from '../../store/page-count/selectors';
import { useParams, useNavigate } from 'react-router';
import { updatePageCount } from '../../store/action';
import {Link} from 'react-router-dom';

type PageParams = {
  pageParam: string
}

type PageItemProps = {
  page: string,
}

function PageItem ({page}: PageItemProps):JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const currentPage = useSelector(getPageCount);
  const {pageParam} = useParams<PageParams>();


  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(updatePageCount(page));
    navigate(`${AppRoute.Catalog}/${page}`);
  };


  return (
    <li className={`pagination__page ${page === pageParam ? 'pagination__page--active' : ''}`}>
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
