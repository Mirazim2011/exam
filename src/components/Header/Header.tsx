import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <h2>
            <Link className="header-title" to={"/"}>
              Exams
            </Link>
          </h2>
          <nav>
            <Link to="/history" className="button">Ishlanganlar</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
