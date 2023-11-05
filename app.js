const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http").createServer(app);

const assemblyRoutes = require("./server/assemblyRoutes/assemblyReq");
const gptRoutes = require("./server/gptRoutes/gptReq");

dotenv.config();

app.use(express.json());

let linkUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.websitename.com"
    : "http://localhost:3000";

app.use(
  cors({
    origin: linkUrl,
    credentials: true,
  })
);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/transcribe", assemblyRoutes);
app.use("/api/minutes", gptRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use("*", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

http.listen(port, () => {
  console.log(`- Successfully connected to server at port ${port}`);
});
