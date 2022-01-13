import {useEffect, useState, MouseEvent} from 'react';
import PageItem from './page-item';
import { useSelector, useDispatch } from 'react-redux';
import { updatePaginationParams } from '../../store/action';
import { getPaginationParams } from '../../store/search-params/selectors';
import { getSortParams, getFilterParams } from '../../store/search-params/selectors';
import { useParams, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AxiosInstance } from 'axios';
import { GuitarType } from '../../types/guitar';
import { APIRoute } from '../../const';
import {Link} from 'react-router-dom';

const RANGE_STEP = 9;

type PaginationProps = {
  api: AxiosInstance,
}

function Pagination({api}: PaginationProps): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {page} = useParams<{page: string}>();

  const [XTotalCount, setXTotalCount] = useState(RANGE_STEP);

  const pages = [];

  for (let i = 1; i <= Math.ceil(XTotalCount/RANGE_STEP); i++) {
    pages.push(i);
  }

  const [currentPage, setCurrentPage] = useState(page || '1');

  const [searchParams, setSearchParams] = useSearchParams();

  const startValue = searchParams.get('_start') || '1';
  const endValue = searchParams.get('_end') || `${RANGE_STEP+1}`;

  const [range, setRange] = useState({
    '_start': startValue,
    '_end': endValue,
  });

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

  const loadTotalCount = async () => {
    const totalCount = await api.get<GuitarType[]>(
      `${APIRoute.Guitars}?${searchParams.toString()}`).then((resp) => resp.headers);
    // eslint-disable-next-line no-console
    console.log(totalCount);
    setXTotalCount(totalCount['x-total-count']);
  };

  useEffect(() => {
    loadTotalCount();
  }, [searchParams]);

  const handlePrevClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentPage((+currentPage-1).toString());
    navigate(`${AppRoute.Catalog}/${+currentPage-1}`);
  };

  const handleNextClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentPage((+currentPage+1).toString());
    navigate(`${AppRoute.Catalog}/${+currentPage+1}`);
  };

  useEffect(() => {
    setRange({
      '_start': ((+currentPage-1)*RANGE_STEP+1).toString(),
      '_end': (+currentPage*RANGE_STEP+1).toString(),
    });
  }, [currentPage]);

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
        {+currentPage !== 1 &&
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />))}
        {+currentPage !== pages[pages.length-1] &&
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
