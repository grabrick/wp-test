import m from "./Header.module.scss";
import searchImg from "../../assets/images/search-line.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import SearchPopup from "../Popup/SearchPopup/SearchPopup";

function Header() {
  const { catalogData } = useSelector((state) => state.catalogSlice);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  
  return (
    <header className={m.header}>
      <div className={m.headerWrapper}>
        <div className={m.leftPostiton}>
          <h1 className={m.logo}>WPPay</h1>
          <div className={m.buttonWrapper}>
            <NavLink to="/" className={({ isActive }) => (isActive ? m.activeLink : m.link)}>
              Главная
            </NavLink>
            <NavLink to="/category" className={({ isActive }) => (isActive ? m.activeLink : m.link)}>
              Категории
            </NavLink>
          </div>
        </div>
        {pathname === '/category' && catalogData?.length > 0 ? (
          <div className={m.searchWrapper}>
            <img onClick={() => setIsVisible(!isVisible)} className={m.searchImg} src={searchImg} alt="" />
          </div>
        ) : ('')}
      </div>
      {isVisible ? <SearchPopup close={setIsVisible} /> : null}
    </header>
  );
}

export default Header;
