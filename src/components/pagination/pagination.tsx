import {useEffect, useState, MouseEvent} from 'react';
import PageItem from './page-item';
import { useSelector, useDispatch } from 'react-redux';
import { updatePaginationParams } from '../../store/action';
import { updatePageCount } from '../../store/action';
import { getPaginationParams } from '../../store/search-params/selectors';
import { getSortParams, getFilterParams } from '../../store/search-params/selectors';
import { getTotalCount, getPageCount } from '../../store/page-count/selectors';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import {Link} from 'react-router-dom';

const RANGE_STEP = 9;
const DEFAULT_PAGE_COUNT = 1;

// type PageParams = {
//   page: string
// }

function Pagination(): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const {page} = useParams<PageParams>();

  const [searchParams, setSearchParams] = useSearchParams();

  const startValue = searchParams.get('_start') || '1';
  const endValue = searchParams.get('_end') || `${RANGE_STEP+1}`;

  const [range, setRange] = useState({
    '_start': startValue,
    '_end': endValue,
  });

  const page = useSelector(getPageCount);

  const [pageCount, setPageCount] = useState(DEFAULT_PAGE_COUNT);

  const [pages, setPages] = useState([1]);

  const totalCount = useSelector(getTotalCount);

  const sortParams = useSelector(getSortParams);
  const filterParams = useSelector(getFilterParams);
  const paginationParams = useSelector(getPaginationParams);

  // const getIsVisiblePage = (count: number) => {
  //   const item = count.toString();
  //   if(
  //     item === currentPage ||
  //     item === currentPage-1 ||
  //      item === currentPage+1 ||
  //     (item === currentPage-2 && currentPage === pages[pages.length-1]) ||
  //     (item === currentPage+2 && currentPage === 1)
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  useEffect(() => {
    const pagesArray = [];

    for (let i = 1; i <= Math.ceil(+totalCount/RANGE_STEP); i++) {
      pagesArray.push(i);
    }

    setPages(pagesArray);
  }, [totalCount]);

  useEffect(() => {

    if (page) {
      setPageCount(+page);
    }
  }, [page]);

  const handlePrevClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(updatePageCount((pageCount-1).toString()));
    navigate(`${AppRoute.Catalog}/${pageCount-1}`);
  };

  const handleNextClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(updatePageCount((pageCount+1).toString()));
    navigate(`${AppRoute.Catalog}/${pageCount+1}`);
  };

  useEffect(() => {
    setRange({
      '_start': ((pageCount-1)*RANGE_STEP+1).toString(),
      '_end': (pageCount*RANGE_STEP+1).toString(),
    });
  }, [pageCount]);

  useEffect(() => {
    dispatch(updatePaginationParams(Object.assign(
      {},
      paginationParams,
      range,
    )));
  }, [range]);

  useEffect(() => {
    setSearchParams({...sortParams, ...filterParams, ...paginationParams});
  }, [paginationParams]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {pageCount !== 1 &&
          <li
            className='pagination__page pagination__page--next'
            id="prev"
          >
            <Link
              className="link pagination__page-link"
              to='#'
              onClick={handlePrevClick}
            >
                      Назад
            </Link>
          </li>}
        {pages.map((count) =>
          (
            <PageItem
              page={count.toString()}
              key={`page-${count}`}
            />))}
        {pageCount !== pages[pages.length-1] &&
          <li
            className='pagination__page pagination__page--next'
            id="next"
          >
            <Link
              className="link pagination__page-link"
              to='#'
              onClick={handleNextClick}
            >
                      Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
