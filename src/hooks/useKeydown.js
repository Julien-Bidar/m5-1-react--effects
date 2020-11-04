import React, { useEffect } from "react";

const UseKeydown = (code, callback) => {
  useEffect(() => {
    const spaceHandler = (ev) => {
      ev.preventDefault();
      if (ev.code === "Space") {
        callback();
      }
    };
    window.addEventListener("keydown", spaceHandler);
    return () => {
      window.removeEventListener("keydown", spaceHandler);
    };
  });
  return;
};

export default UseKeydown;
