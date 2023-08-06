import m from "./Category.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../../redux/slices/catalogSlice";
import {
  clearData,
  fetchCurrentData,
} from "../../redux/slices/currentCategorySlice";
import { useServerError } from "../../assets/extra/ServerErrorProvider/ServerErrorProvider";
import CategoryComponent from "./CategoryComponent/CategoryComponent";
import SubCategory from "./SubCategory/SubCategory";
import { NavLink } from "react-router-dom";
import PreLoader from "../../assets/extra/PreLoader/PreLoader";
import Pagination from "../../assets/extra/Pagination/Pagination";
import CategoryFieldsPopup from "../Popup/CategoryFieldsPopup/CategoryFieldsPopup";

function Category() {
  const dispatch = useDispatch();
  const { addError } = useServerError();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [showTimerMessage, setShowTimerMessage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [onClickCard, setOnClickCard] = useState();
  const { catalogData } = useSelector((state) => state.catalogSlice);
  const { currentCategoryData, currentCategoryLoading, currentCategoryError } =
    useSelector((state) => state.currentCategorySlice);

  useEffect(() => {
    dispatch(fetchData("/v1/service-category"));
  }, [dispatch]);

  useEffect(() => {
    if (currentCategoryError !== null) {
      addError(currentCategoryError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategoryError]);

  useEffect(() => {
    if (activeCategoryId !== null) {
      dispatch(fetchCurrentData(`/v1/service?category_id=${activeCategoryId}`));
      setShowTimerMessage(false);
    }
  }, [activeCategoryId, dispatch]);

  useEffect(() => {
    let timer;
    if (showTimerMessage) {
      timer = setTimeout(() => {
        setShowTimerMessage(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showTimerMessage]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    setShowTimerMessage(true);
    dispatch(clearData([]));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const SubCategoryPerPage = 10;
  const SubCategoryOnCurrentPage = currentCategoryData?.slice(
    (currentPage - 1) * SubCategoryPerPage,
    currentPage * SubCategoryPerPage
  );

  return (
    <section className={m.container}>
      <div className={m.wrapper}>
        {catalogData?.length > 0 ? (
          <>
            <div className={m.navigate}>
              {catalogData.map((items) => (
                <CategoryComponent
                  key={items.id}
                  activeCategoryId={activeCategoryId}
                  handleCategoryClick={handleCategoryClick}
                  items={items}
                />
              ))}
            </div>
            {currentCategoryLoading ? (
              <div className={m.loader}>
                <div className={m.loaderWrapper}>
                  <PreLoader h="80" w="200" color="black" ariaLabel="loading" />
                </div>
              </div>
            ) : currentCategoryData?.length > 0 ? (
              <div className={m.category}>
                <div className={m.categoryWrapper}>
                  {SubCategoryOnCurrentPage.map((items) => (
                    <SubCategory
                      key={items.id}
                      close={setIsVisible}
                      onClickCard={setOnClickCard}
                      items={items}
                    />
                  ))}
                  {currentCategoryData?.length > 10 && (
                    <Pagination
                      totalPages={Math.ceil(
                        currentCategoryData.length / SubCategoryPerPage
                      )}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className={m.warningCategory}>
                {activeCategoryId === null ? (
                  <p className={m.warningCategoryText}>
                    Выберите нужную категорию
                  </p>
                ) : (
                  <p className={m.warningCategoryText}>
                    {showTimerMessage
                      ? "В данный момент услуг нет, попробуйте позже"
                      : currentCategoryData
                      ? "В этой категории услуг нет, попробуйте позже"
                      : ""}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={m.warningCategory}>
            <p className={m.warningCategoryText}>Сервис временно не работает</p>
            <NavLink to="/" className={m.link}>
              Главная
            </NavLink>
          </div>
        )}
      </div>
      {isVisible ? (
        <CategoryFieldsPopup close={setIsVisible} items={onClickCard} />
      ) : null}
    </section>
  );
}

export default Category;
