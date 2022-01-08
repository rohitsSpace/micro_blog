import React, { useState } from "react";
import Button from "./shared/button";
import InputBox from "./shared/InputBox";
import axios from "axios";
import PostList from "./PostList/Index";

const Landing = () => {
  const [title, setTitle] = useState("");
  const [refetch, setRefetch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTitle("");
    setRefetch(true);
  };

  return (
    <div>
      <h1> Create a post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <InputBox value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <Button />
      </form>
      <hr />
      <PostList refetch={refetch} />
    </div>
  );
};

export default Landing;
