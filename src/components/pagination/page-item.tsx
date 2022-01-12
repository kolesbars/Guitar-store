import {Link} from 'react-router-dom';

type PageItemProps = {
  page: string,
  currentPage: string,
}

// const handleClick = () => {

// }

function PageItem ({page, currentPage}: PageItemProps):JSX.Element {
  return (
    <li className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`}>
      <Link
        className="link pagination__page-link"
        to={page.toString()}
      >
        {page}
      </Link>
    </li>
  );
}

export default PageItem;
