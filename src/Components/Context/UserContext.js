import { createContext } from "react";

export default createContext({
  loggedInUser: undefined,
  setLoggedInUser: () => {},
});
