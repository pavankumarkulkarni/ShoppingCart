import React from "react";
import style from "./Filterbar.module.css";

export default function Filterbar({ count, size, sort, filterBy, sortBy }) {
  return (
    <>
      <div className="result-count">Product count : {count}</div>
      <div className="product-sort">
        Sort By :{" "}
        <select
          className={style.filterselect}
          name="sort"
          value={sort}
          onChange={(e) => sortBy(e)}
        >
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="product-filter">
        Filter By :{" "}
        <select
          className={style.filterselect}
          name="filter"
          value={size}
          onChange={(e) => filterBy(e)}
        >
          <option value="">All</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </>
  );
}
