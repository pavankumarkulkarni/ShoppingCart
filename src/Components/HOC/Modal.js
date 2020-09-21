import React from "react";

export function WithModal(component) {
  const Component = component;
  return function (props) {
    return (
      <div className="overlay">
        <div className="Modal">
          <Component {...props} />
          <button className="btnClose">X</button>
        </div>
      </div>
    );
  };
}
