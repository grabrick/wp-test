import { useState } from "react";
import m from "./SearchPopup.module.scss";
import searchImg from "../../../assets/images/search-line.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData } from "../../../redux/slices/searchSlice";
import SearchItemsComponent from "./SearchItemsComponent/SearchItemsComponent";
import PreLoader from "../../../assets/extra/PreLoader/PreLoader";
import { useServerError } from "../../../assets/extra/ServerErrorProvider/ServerErrorProvider";

function SearchPopup({ close }) {
  const [isVisible] = useState(false);
  const { addError } = useServerError();
  const dispatch = useDispatch();
  const { searchData, searchLoading, searchError } = useSelector(
    (state) => state.searchSlice
  );
  const [searchInput, setSearchInput] = useState({ search: "" });
  const [isSearch, setIsSearch] = useState(false);
  const changeHandler = (event) => {
    setSearchInput({ ...searchInput, [event.target.name]: event.target.value });
  };
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let value = searchInput.search;
    dispatch(fetchSearchData(`/v1/service/search?name=${value}`));
    setIsSearch(!isSearch);
    if (!value.trim()) return;

    if (searchError !== null) {
      addError(searchError);
    }
  };

  const clickSearch = () => {
    if (!searchInput.search?.trim()) return;
    let value = searchInput.search;
    dispatch(fetchSearchData(`/v1/service/search?name=${value}`));
    setIsSearch(!isSearch);

    if (searchError !== null) {
      addError(searchError);
    }
  };

  return (
    <div
      onClick={() => close(false)}
      className={isVisible ? m.notVisible : m.visible}
    >
      <div onClick={(e) => e.stopPropagation()} className={m.wrapper}>
        <div className={m.inputWrapper}>
          <input
            type="text"
            name="search"
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={changeHandler}
            value={searchInput.search}
            className={m.input}
          />
          <img
            className={m.img}
            onClick={() => clickSearch()}
            src={searchImg}
            alt=""
          />
        </div>
        {isSearch === false ? (
          <div className={m.responseData}>
            <p className={m.warningText}>
              Для поиска необходимо заполнить поле
            </p>
          </div>
        ) : (
          <>
            {searchLoading ? (
              <div className={m.responseData}>
                <div className={m.loader}>
                  <PreLoader h="80" w="200" color="black" ariaLabel="loading" />
                </div>
              </div>
            ) : searchData !== null && searchData.length !== 0 ? (
              <div className={m.responseData}>
                <div className={m.itemsWrapper}>
                  {searchData.map((items) => (
                    <SearchItemsComponent key={items.id} items={items} currentClick={close} />
                  ))}
                </div>
              </div>
            ) : (
              <div className={m.responseData}>
                <p className={m.warningText}>Ничего нет.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPopup;
