import React from "react";
import style from "./DropdownMenu.module.css";

export default function DropdownMenu({ title, items }) {
  return (
    <div className={style.menu}>
      <span> {title}</span>
      <div className={style.dropdownmenu}>
        {items.map((item) => {
          return item;
        })}
      </div>
    </div>
  );
}
