import React from "react";

export function WithModal(component) {
  const Component = component;
  return function (props) {
    const { closeModal } = props;
    const handleClick = (e) => {
      if (e.target.className === "overlay") {
        closeModal();
      }
    };
    return (
      <div className="overlay" onClick={handleClick}>
        <div className="Modal">
          <Component {...props} />
          <button className="btnClose" onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    );
  };
}
