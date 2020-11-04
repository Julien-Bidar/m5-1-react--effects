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
      <p>
        Cost: {cost} cookie(s). Produces {value} cookie(s) per second.{" "}
        {numOwned}{" "}
      </p>
      <hr />
    </div>
  );
};

export default Items;
