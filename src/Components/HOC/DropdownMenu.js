import React from "react";
import style from "./DropdownMenu.module.css";

export default function DropdownMenu(component) {
  const Component = component;
  return function (props) {
    return (
      <div className={style.menu}>
        <span> {props.title}</span>
        <div className={style.dropdownmenu}>
          <Component {...props} />
        </div>
      </div>
    );
  };
}
