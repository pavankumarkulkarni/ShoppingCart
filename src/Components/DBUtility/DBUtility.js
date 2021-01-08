export const setFavAddress = (id, addid) => {
  return fetch(`/api/users/${id}/addresses/${addid}/fav`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((address) => address);
};
export const setFavCard = (id, cardid) => {
  return fetch(`/api/users/${id}/cards/${cardid}/fav`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((card) => card);
};
export const editAddressMain = (id, address) => {
  return fetch(`/api/users/${id}/addresses/${address._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((res) => res.json())
    .then((address) => address);
};
export const editCardMain = (id, card) => {
  return fetch(`/api/users/${id}/cards/${card._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  })
    .then((res) => res.json())
    .then((card) => card);
};
export const addAddress = (address, id) => {
  return fetch(`/api/users/${id}/addresses`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((res) => res.json())
    .then((address) => address);
};
export const addCard = (card, id) => {
  return fetch(`/api/users/${id}/cards`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  })
    .then((res) => res.json())
    .then((card) => card);
};
export const deleteAddress = (clientId, addID) => {
  return fetch(`/api/users/${clientId}/addresses/${addID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((address) => address);
};
export const deleteCard = (clientId, addID) => {
  return fetch(`/api/users/${clientId}/cards/${addID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((card) => card);
};
