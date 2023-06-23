import { createContext, useReducer, useState } from "react";
import { snacks_data } from "../db/SnacksData";

export const SnacksContext = createContext();

function SnacksContextProvider({ children }) {
  const [snacks] = useState(snacks_data);

  const reducerFunction = (filters, action) => {
    switch (action.type) {
      case "SEARCH":
        return { ...filters, searchInput: action.payload };
      case "SORT": {
        // if(filters.sorting.sortBy === action.payload.sortBy){
        //   const sortByModified = !filters.sorting.sortBy
        // }
        return { ...filters, sorting: { ...action.payload } };
      }
      default: {
        return filters;
      }
    }
  };

  const [filters, dispatch] = useReducer(reducerFunction, {
    searchInput: "",
    sorting: { sortBy: "", ascending: true },
  });

  return (
    <SnacksContext.Provider value={{ filters, snacks, dispatch }}>
      {children}
    </SnacksContext.Provider>
  );
}

export default SnacksContextProvider;
