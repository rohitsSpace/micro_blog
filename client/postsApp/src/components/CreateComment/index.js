import React, { useState } from "react";
import axios from "axios";
import InputBox from "../shared/InputBox";
import Button from "../shared/button";

const CreateComment = ({ postId }) => {
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: commentContent,
    });
    setCommentContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <InputBox
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            title="New Comment"
          />
        </div>
        <Button text="Add" />
      </form>
    </div>
  );
};
export default CreateComment;
