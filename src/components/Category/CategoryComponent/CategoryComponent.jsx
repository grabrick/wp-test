import m from "./CategoryComponent.module.scss";
import notFound from "../../../assets/images/image-lineWhite.svg";

function CategoryComponent({ items, activeCategoryId, handleCategoryClick }) {
  const CategoryClick = () => {
    handleCategoryClick(items.id);
  };
  return (
    <button className={m.container}>
      <div className={activeCategoryId === items.id ? m.active : m.wrapper} onClick={CategoryClick}>
        <img
          className={m.image}
          src={items.picture_url ? items.picture_url : notFound}
          alt=""
        />
        <h3 className={m.title}>{items.title}</h3>
      </div>
    </button>
  );
}

export default CategoryComponent;
