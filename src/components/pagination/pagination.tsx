import {useEffect, useState, MouseEvent} from 'react';
import {RANGE_STEP, DEFAULT_PAGE_COUNT, DEFAULT_START_VALUE} from '../../const';
import PageItem from '../page-item/page-item';
import { useSelector, useDispatch } from 'react-redux';
import { updatePaginationParams } from '../../store/action';
import { updatePageCount } from '../../store/action';
import { getPaginationParams } from '../../store/search-params/selectors';
import { getTotalCount, getPageCount} from '../../store/page-count/selectors';
import { getGuitars } from '../../store/guitars-data/selectors';
import { useSearchParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Pagination(): JSX.Element {

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const startValue = searchParams.get('_start') || DEFAULT_START_VALUE;
  const endValue = searchParams.get('_end') || `${RANGE_STEP+1}`;

  const guitars = useSelector(getGuitars);
  const page = useSelector(getPageCount);

  const [range, setRange] = useState({
    '_start': startValue,
    '_end': endValue,
  });

  const [pageCount, setPageCount] = useState(+DEFAULT_PAGE_COUNT);

  const [pages, setPages] = useState([+DEFAULT_PAGE_COUNT]);

  const totalCount = useSelector(getTotalCount);

  const paginationParams = useSelector(getPaginationParams);

  useEffect(() => {
    const pagesArray = [];

    for (let i = 1; i <= Math.ceil(+totalCount/RANGE_STEP); i++) {
      pagesArray.push(i);
    }

    setPages(pagesArray);
  }, [totalCount]);

  useEffect(() => {
    if (page) {
      dispatch(updatePageCount(page));
      setPageCount(+page);
    }
  }, [page]);

  const handlePrevClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(updatePageCount((pageCount-1).toString()));
  };

  const handleNextClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(updatePageCount((pageCount+1).toString()));
  };

  useEffect(() => {
    setRange({
      '_start': ((pageCount-1)*RANGE_STEP).toString(),
      '_end': (pageCount*RANGE_STEP).toString(),
    });
  }, [pageCount]);

  useEffect(() => {
    dispatch(updatePaginationParams(Object.assign(
      {},
      paginationParams,
      range,
      {
        'page': pageCount,
      },
    )));
  }, [range, pageCount]);

  return (
    <div className="pagination page-content__pagination" data-testid='pagination-list'>
      <ul className="pagination__list">
        {pageCount !== 1 && guitars.length !== 0 &&
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
        {+totalCount > RANGE_STEP &&
         pages.map((count) =>
           (
             <PageItem
               pageCount={pageCount.toString()}
               page={count.toString()}
               key={`page-${count}`}
             />))}
        {pageCount !== pages[pages.length-1] && guitars.length !== 0 &&
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
