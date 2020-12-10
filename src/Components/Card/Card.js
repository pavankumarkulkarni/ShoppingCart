import React from "react";
import style from "./Card.module.css";

export default function Card({ card, delCard, editCard, setFavCard }) {
  return (
    <div className={card.fav === "true" ? style.favCard : style.card}>
      <h5>Name : {card.cardName}</h5>
      <p>Num : {card.number}</p>
      <p>Exp : {card.expiry}</p>
      <p>CVV : {card.CVV}</p>
      <div className={style.icons}>
        <button
          className={`iconButton ${style.tooltip} ${style.tooltipRight}`}
          data-tooltiptext='Click to edit the card.'
          onClick={(e) => {
            editCard(card);
          }}>
          <i>
            <i className='fas fa-edit'></i>
          </i>
        </button>

        <button
          className={`iconButton ${style.tooltip} ${style.tooltipTop}`}
          data-tooltiptext='Click to save as favorite card.'
          onClick={(e) => {
            setFavCard(card._id);
          }}>
          {card.fav === "true" ? (
            <i className='fas fa-heart'></i>
          ) : (
            <i className='far fa-heart'></i>
          )}
        </button>

        <button
          className={`iconButton ${style.tooltip} ${style.tooltipLeft}`}
          data-tooltiptext='Click to delete the card.'
          onClick={(e) => {
            delCard(card._id);
          }}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </div>
  );
}
