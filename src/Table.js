import React, { useContext } from "react";
import { SnacksContext } from "./contexts/SnacksContext";

function Table() {
  const { snacks, filters, dispatch } = useContext(SnacksContext);
  const activeStyle = {
    backgroundColor: filters.sorting.ascending ? "green" : "red",
    color: "white",
  };
  let sortedSnacks = snacks;
  let filteredSnacks = snacks;

  const findAnElementInArray = (element, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toLowerCase().includes(element)) {
        return true;
      }
    }
    return false;
  };

  if (filters.searchInput.length > 0) {
    filteredSnacks = snacks.filter(({ product_name, ingredients }) => {
      const findInIngredients = findAnElementInArray(
        filters.searchInput.toLowerCase(),
        ingredients
      );
      const findInProducts = product_name
        .toLowerCase()
        .includes(filters.searchInput.toLowerCase());
      return findInProducts || findInIngredients;
    });
  }

  if (filters.sorting.sortBy.length > 0) {
    if (["id", "price", "calories"].includes(filters.sorting.sortBy)) {
      sortedSnacks = filters.sorting.ascending
        ? [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1 - token2
          )
        : [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2 - token1
          );
    } else if (filters.sorting.sortBy === "product_name") {
      sortedSnacks = filters.sorting.ascending
        ? [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1.charCodeAt(0) - token2.charCodeAt(0)
          )
        : [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2.charCodeAt(0) - token1.charCodeAt(0)
          );
    } else if (filters.sorting.sortBy === "product_weight") {
      sortedSnacks = filters.sorting.ascending
        ? [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1.slice(0, -1) - token2.slice(0, -1)
          )
        : [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2.slice(0, -1) - token1.slice(0, -1)
          );
    } else {
      sortedSnacks = filters.sorting.ascending
        ? [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1[0].charCodeAt(0) - token2[0].charCodeAt(0)
          )
        : [...filteredSnacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2[0].charCodeAt(0) - token1[0].charCodeAt(0)
          );
    }
  } else {
    sortedSnacks = filteredSnacks;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input
        type="text"
        placeholder="Search with Products or Ingredients..."
        style={{ width: "15rem", padding: "0.5rem" }}
        onChange={(event) => {
          dispatch({ type: "SEARCH", payload: event.target.value });
        }}
      />
      <table>
        <thead>
          <tr key={0}>
            <th
              className="cursor-pointer"
              style={
                filters.sorting.sortBy === "id"
                  ? {
                      ...activeStyle,
                    }
                  : {}
              }
              onClick={() => {
                dispatch({
                  type: "SORT",
                  payload: {
                    sortBy: "id",
                    ascending: !filters.sorting.ascending,
                  },
                });
              }}
            >
              ID
            </th>
            <th
              className="cursor-pointer"
              style={
                filters.sorting.sortBy === "product_name"
                  ? {
                      ...activeStyle,
                    }
                  : {}
              }
              onClick={() => {
                dispatch({
                  type: "SORT",
                  payload: {
                    sortBy: "product_name",
                    ascending: !filters.sorting.ascending,
                  },
                });
              }}
            >
              Product Name
            </th>
            <th
              className="cursor-pointer"
              style={
                filters.sorting.sortBy === "product_weight"
                  ? {
                      ...activeStyle,
                    }
                  : {}
              }
              onClick={() => {
                dispatch({
                  type: "SORT",
                  payload: {
                    sortBy: "product_weight",
                    ascending: !filters.sorting.ascending,
                  },
                });
              }}
            >
              Product Weight
            </th>
            <th
              className="cursor-pointer"
              style={
                filters.sorting.sortBy === "price"
                  ? {
                      ...activeStyle,
                    }
                  : {}
              }
              onClick={() => {
                dispatch({
                  type: "SORT",
                  payload: {
                    sortBy: "price",
                    ascending: !filters.sorting.ascending,
                  },
                });
              }}
            >
              Price (INR)
            </th>
            <th
              className="cursor-pointer"
              style={
                filters.sorting.sortBy === "calories"
                  ? {
                      ...activeStyle,
                    }
                  : {}
              }
              onClick={() => {
                dispatch({
                  type: "SORT",
                  payload: {
                    sortBy: "calories",
                    ascending: !filters.sorting.ascending,
                  },
                });
              }}
            >
              Calories
            </th>
            <th
              className="cursor-pointer"
              style={
                filters.sorting.sortBy === "ingredients"
                  ? {
                      ...activeStyle,
                    }
                  : {}
              }
              onClick={() => {
                dispatch({
                  type: "SORT",
                  payload: {
                    sortBy: "ingredients",
                    ascending: !filters.sorting.ascending,
                  },
                });
              }}
            >
              Ingredients
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSnacks.map(
            ({
              id,
              product_name,
              product_weight,
              price,
              calories,
              ingredients,
            }) => (
              <tr key={id}>
                <th>{id}</th>
                <th>{product_name}</th>
                <th>{product_weight}</th>
                <th>{price}</th>
                <th>{calories}</th>
                <th>{ingredients.toString()}</th>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
