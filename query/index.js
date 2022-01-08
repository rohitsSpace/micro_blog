const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, status, content });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({ status: "ok" });
});

app.listen(4002, async () => {
  console.log("listening on 4002");
  const res = await axios
    .get("http://localhost:4004/events")
    .catch((e) => console.log(e));
  for (const event of res.data) {
    console.log(`Process missed events ${event.type}`);
    handleEvents(event.type, event.data);
  }
});
