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
        </div>
      </div>
    </header>
  );
};

export default Header;
