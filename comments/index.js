const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// just to save all the data in this json object
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const comment = { id: commentId, content, status: "pending" };
  comments.push(comment);

  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://localhost:4004/events", {
      type: "CommentCreated",
      data: { postId: req.params.id, ...comment },
    })
    .catch((e) => console.log(e));

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  const { id, content, postId, status } = data;
  if (type === "CommentModerated") {
    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);
    comment.status = status;
    await axios.post("http://localhost:4004/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.send({ status: "Comment Updated" });
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
