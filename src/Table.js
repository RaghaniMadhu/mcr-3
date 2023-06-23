import React, { useContext } from "react";
import { SnacksContext } from "./contexts/SnacksContext";

function Table() {
  const { snacks, filters, dispatch } = useContext(SnacksContext);
  // console.log(filters);
  // console.log(filters.sorting.sortBy);
  let sortedSnacks;

  if (filters.sorting.sortBy.length > 0) {
    if (["id", "price", "calories"].includes(filters.sorting.sortBy)) {
      sortedSnacks = filters.sorting.ascending
        ? [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1 - token2
          )
        : [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2 - token1
          );
    } else if (filters.sorting.sortBy === "product_name") {
      sortedSnacks = filters.sorting.ascending
        ? [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1.charCodeAt(0) - token2.charCodeAt(0)
          )
        : [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2.charCodeAt(0) - token1.charCodeAt(0)
          );
    } else if (filters.sorting.sortBy === "product_weight") {
      sortedSnacks = filters.sorting.ascending
        ? [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1.slice(0, -1) - token2.slice(0, -1)
          )
        : [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2.slice(0, -1) - token1.slice(0, -1)
          );
    } else {
      sortedSnacks = filters.sorting.ascending
        ? [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token1[0].charCodeAt(0) - token2[0].charCodeAt(0)
          )
        : [...snacks].sort(
            (
              { [filters.sorting.sortBy]: token1 },
              { [filters.sorting.sortBy]: token2 }
            ) => token2[0].charCodeAt(0) - token1[0].charCodeAt(0)
          );
    }
  } else {
    sortedSnacks = snacks;
  }

  return (
    <div>
      <table>
        <thead>
          <tr key={0}>
            <th
              className="cursor-pointer"
              style={{
                backgroundColor: filters.sorting.sortBy === "id" && "green",
                color: filters.sorting.sortBy === "id" && "white",
              }}
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
              style={{
                backgroundColor:
                  filters.sorting.sortBy === "product_name" && "green",
                color: filters.sorting.sortBy === "product_name" && "white",
              }}
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
              style={{
                backgroundColor:
                  filters.sorting.sortBy === "product_weight" && "green",
                color: filters.sorting.sortBy === "product_weight" && "white",
              }}
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
              style={{
                backgroundColor: filters.sorting.sortBy === "price" && "green",
                color: filters.sorting.sortBy === "price" && "white",
              }}
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
              style={{
                backgroundColor:
                  filters.sorting.sortBy === "calories" && "green",
                color: filters.sorting.sortBy === "calories" && "white",
              }}
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
              style={{
                backgroundColor:
                  filters.sorting.sortBy === "ingredients" && "green",
                color: filters.sorting.sortBy === "ingredients" && "white",
              }}
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
