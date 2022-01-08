import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "../CreateComment";
import CommentsList from "../CommentsList";

const PostList = ({ refetch = false }) => {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    console.log("res", res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, [refetch]);
  const postsToRender = Object.values(posts).map((post) => {
    return (
      <div className="card me-1 mb-1" style={{ width: "33%" }} key={post.id}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <hr />
          <CreateComment postId={post.id} />
          <CommentsList comments={post.comments} />
        </div>
      </div>
    );
  });
  return <div className="d-flex flex-row flex-wrap">{postsToRender}</div>;
};

export default PostList;
