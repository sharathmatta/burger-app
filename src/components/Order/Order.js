import React from "react";

import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients)].map((_, i) => {
        return (
          <span
            key={igKey}
            style={{
              textTransform: "capitalize",
              fontWeight: "600",
              display: "inline-block",
              margin: "0 8px",
              border: "1px solid #ccc",
            }}
          >
            {igKey}({props.ingredients[igKey]})
          </span>
        );
      });
    })
    .reduce((ar, el) => {
      return ar.concat(el);
    });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredients}</p>

      <p>
        Price: <strong> USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
