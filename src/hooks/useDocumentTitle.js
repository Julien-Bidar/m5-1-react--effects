import React, { useEffect } from "react";

const UseDocumentTitle = (title, fallbackTitle) => {
  useEffect(() => {
    {
      document.title = title;
      return () => (document.title = fallbackTitle);
    }
  }, [title]);
  return;
};

export default UseDocumentTitle;
