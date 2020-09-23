import React from "react";
import style from "./Modal.module.css";

export function WithModal(component) {
  const Component = component;
  // const overlay = {}
  return function (props) {
    const { closeModal } = props;
    const handleClick = (e) => {
      if (e.target.className === style.overlay) {
        closeModal();
      }
    };
    return (
      <div className={style.overlay} onClick={handleClick}>
        <div className={style.modal}>
          <Component {...props} />
          <button className="btnClose" onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    );
  };
}
