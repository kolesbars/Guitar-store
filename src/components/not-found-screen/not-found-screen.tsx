import {Link} from 'react-router-dom';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can not be found</h2>
        </div>
        <Link to="/">Go TO Homepage</Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
