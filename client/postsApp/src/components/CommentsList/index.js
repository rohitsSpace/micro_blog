import React from "react";

const CommentsList = ({ comments }) => {
  const commentsToRender = comments.map((comment) => {
    return (
      <div className="me-1 mb-1" style={{ width: "33%" }} key={comment.id}>
        {comment.content}
      </div>
    );
  });
  return <div className="d-flex flex-row flex-wrap">{commentsToRender}</div>;
};

export default CommentsList;
