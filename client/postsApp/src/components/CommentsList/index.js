import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentsList = ({ refetch = false, postId }) => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
    refetch = false;
  };

  useEffect(() => {
    getComments();
  }, [refetch]);

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
