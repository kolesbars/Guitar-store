import {useState} from 'react';
import PageItem from './page-item';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/guitars-data/selectors';
//import { useParams } from 'react-router';
import {Link} from 'react-router-dom';

const GUITARS_QUANTITY = 6;

function Pagination(): JSX.Element {
  const pageParam = '1';
  const pages = [];

  const guitars = useSelector(getGuitars);

  const pagesCount = Math.floor(guitars.length/GUITARS_QUANTITY)+1;

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i.toString());
  }
  // eslint-disable-next-line no-console
  console.log(pages);

  const [currentPage] = useState(pageParam);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {pages.map((page) =>
          (
            <PageItem
              page={page}
              key={`page-${page}`}
              currentPage={currentPage}
            />))}
        <li
          className="pagination__page pagination__page--next"
          id="next"
        >
          <Link className="link pagination__page-link" to="2">
                      Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
