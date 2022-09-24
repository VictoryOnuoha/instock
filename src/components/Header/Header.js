import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <section className="header__image-container">
          <Link to={`/`}>
            <img className="header__image" src={Logo} alt="Instock logo" />
          </Link>
        </section>

        <nav className="header__navigation">
          <ul className="header__nav-list">
            <NavLink 
              className="header__nav-list-link" 
              to={`/warehouse`}
              activeClassName="header__nav-list-link--active"
            >  
              <li className="header__nav-list-item"> Warehouses</li>
            </NavLink>
            <NavLink 
              className="header__nav-list-link" 
              to={`/inventory`}
              activeClassName="header__nav-list-link--active"
            >
              <li className="header__nav-list-item"> Inventory</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
