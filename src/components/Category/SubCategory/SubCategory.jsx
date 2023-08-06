import m from "./SubCategory.module.scss";
import notFound from "../../../assets/images/image-lineWhite.svg";

function SubCategory({ items, onClickCard, close }) {
  return (
    <div className={m.wrapper} onClick={() => {close(true); onClickCard(items.id)}}>
      <img
        className={m.image}
        src={items.picture_url ? items.picture_url : notFound}
        alt=""
      />
      <h3 className={m.title}>{items.title}</h3>
    </div>
  );
}

export default SubCategory;
