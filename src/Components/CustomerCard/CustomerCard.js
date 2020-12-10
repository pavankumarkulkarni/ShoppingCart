import React, { useState } from "react";
import style from "./CustomerCard.module.css";

export default function CustomerCard({
  addCard,
  card,
  editCard,
  cancelCardChange,
}) {
  const [cardName, setCardName] = useState(card ? card.cardName : null);
  const [cardNum, setCardNum] = useState(card ? card.number : null);
  const [cardExp, setCardExp] = useState(card ? card.expiry : null);
  const [cardCVV, setCardCVV] = useState(card ? card.CVV : null);

  const handleChange = (e) => {
    if (e.target.name === "number") {
      setCardNum(e.target.value);
    } else if (e.target.name === "expiry") {
      setCardExp(e.target.value);
    } else if (e.target.name === "cvv") {
      setCardCVV(e.target.value);
    } else if (e.target.name === "cardName") {
      setCardName(e.target.value);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    cancelCardChange();
  };
  const btnText = card ? "Edit Card" : "Add Card";

  const sendCard = (e) => {
    const input = {
      cardName: cardName,
      number: cardNum,
      expiry: cardExp,
      CVV: cardCVV,
    };
    e.preventDefault();
    card ? editCard({ ...input, _id: card._id }) : addCard(input);
  };
  return (
    <div>
      <form className={style.form} onSubmit={sendCard}>
        <p>Card Details</p>
        <label htmlFor='name'> Card Name : </label>
        {/* <p className={style.labelhint}>1234 1234 1234 1234</p> */}
        <input
          type='string'
          name='cardName'
          required
          value={cardName}
          onChange={handleChange}
        />
        <label htmlFor='number'> Number : </label>
        {/* <p className={style.labelhint}>1234 1234 1234 1234</p> */}
        <input
          type='number'
          name='number'
          required
          value={cardNum}
          onChange={handleChange}
        />
        <label htmlFor='expiry'> Expiry (mmyy): </label>
        {/* <p className={style.labelhint}>0922</p> */}
        <input
          type='number'
          name='expiry'
          required
          value={cardExp}
          onChange={handleChange}
        />
        <label htmlFor='cvv'> CVV: </label>
        {/* <p className={style.labelhint}>123</p> */}
        <input
          type='number'
          name='cvv'
          required
          value={cardCVV}
          onChange={handleChange}
        />
        <div className={style.btns}>
          <button type='submit'>{btnText}</button>
          <button
            type='button'
            onClick={(e) => handleCancel(e)}
            className={style.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
