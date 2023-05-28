import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => {
  console.log("Vikas = ", children);
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
