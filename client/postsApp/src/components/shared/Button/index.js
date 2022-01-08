import React from "react";

const Button = ({ text = "submit", ...rest }) => {
  return (
    <button className="btn btn-primary" {...rest}>
      {text}
    </button>
  );
};

export default Button;
