import React from "react";

const InputBox = ({ title = "Title", ...rest }) => {
  return (
    <>
      <label htmlFor="title" className="form-label">
        {title}
      </label>
      <input type="type" className="form-control" {...rest} />
    </>
  );
};

export default InputBox;
