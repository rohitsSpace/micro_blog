const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("all ok");
});

app.post("/events", (req, res) => {
  const event = req.body;
  axios
    .post("http://localhost:4000/events", event)
    .catch((e) => console.log(e));
  axios
    .post("http://localhost:4001/events", event)
    .catch((e) => console.log(e));
  axios
    .post("http://localhost:4002/events", event)
    .catch((e) => console.log(e));

  res.send({ status: "ok" });
});

app.listen(4004, () => {
  console.log("listening on 4004");
});
