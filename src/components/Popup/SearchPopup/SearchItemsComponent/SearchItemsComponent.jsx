import m from "./SearchItemsComponent.module.scss";
import notFound from "../../../../assets/images/image-line.svg";

function SearchItemsComponent({ items, currentClick }) {
  return (
    <div className={m.container} onClick={() => currentClick()}>
      <div className={m.wrapper}>
        <img
          className={m.img}
          src={items.picture_url ? items.picture_url : notFound}
          alt=""
        />
        <div className={m.textWrapper}>
          <h3 className={m.title}>{items.title}</h3>
          <p className={m.desc}>{items.description}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchItemsComponent;
