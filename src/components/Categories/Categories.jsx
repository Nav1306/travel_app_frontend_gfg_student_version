import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { useCategory } from "../../context";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategoriesToShow, setnumberOfCategoriesToShow] = useState(0);
  const { hotelCategory , setHotelCategory} = useCategory();

  const handleShowMoreRightClick = () => {
    setnumberOfCategoriesToShow((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setnumberOfCategoriesToShow((prev) => prev - 10);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://navtravelapp.cyclic.app/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfCategoriesToShow+10 > data.length ? data.length - 10 : numberOfCategoriesToShow,
          numberOfCategoriesToShow > data.length ? data.length : numberOfCategoriesToShow+10
        );
        setCategories(categoriesToShow);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfCategoriesToShow]);

  const handleCategoryClick = (category) => {
    console.log({category});
    setHotelCategory(category);
  };


  console.log({"Hotel Category":hotelCategory});

  return (
    <section className="categories d-flex align-center gap-large cursor-pointer">
      {numberOfCategoriesToShow >= 10 && (
        <button className="button btn-category btn-left fixed cursor-pointer"
        onClick={handleShowMoreLeftClick}>
          <span class="material-icons-outlined">chevron_left</span>
        </button>
      )}
      {categories &&
        categories.map(({ _id, category }) => (
          <span className={`${category === hotelCategory ? "border-bottom" : ""}`} key={_id} onClick={() => handleCategoryClick(category)} >{category}</span>
        ))}
      ;
      {numberOfCategoriesToShow-10 < categories.length && (
        <button  className="button btn-category btn-right fixed cursor-pointer" 
        onClick={handleShowMoreRightClick}>
          <span class="material-icons-outlined">chevron_right</span>
        </button>
      )}
    </section>
  );
};
