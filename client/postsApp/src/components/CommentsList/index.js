import React from "react";

const CommentsList = ({ comments }) => {
  const commentsToRender = comments.map((comment) => {
    if (comment.status === "pending") {
      return <li>Awaiting for moderation</li>;
    }

    return (
      <li className="mb-1" key={comment.id}>
        {comment.status === "approved"
          ? comment.content
          : "Comment got rejected"}
      </li>
    );
  });
  return <ul>{commentsToRender}</ul>;
};

export default CommentsList;
