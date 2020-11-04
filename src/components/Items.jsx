import React, { useEffect, useRef } from "react";

const Items = ({ name, cost, value, numOwned, handleClick, id, firstName }) => {
  const ref = useRef(null);

  const focusBtn = () => {
    if (firstName === true) ref.current.focus();
  };

  useEffect(() => {
    focusBtn();
  }, []);

  return (
    <div>
      <button ref={ref} value={name} onClick={() => handleClick(id, cost)}>
        {name}
      </button>
      {name !== "Clicker" && (
        <p>
          Cost: {cost} cookies. Produces {value} cookie(s) per second.{" "}
          {numOwned}{" "}
        </p>
      )}
      {name === "Clicker" && (
        <p>
          Cost: {cost} cookies. Produces 3 cookies per click. {numOwned}{" "}
        </p>
      )}
      <hr />
    </div>
  );
};

export default Items;
