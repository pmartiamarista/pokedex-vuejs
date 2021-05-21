import express from "express";

const serveStatic = require("serve-static");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use("/", serveStatic(path.join(__dirname, "/dist")));
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`App is listening on port: ${port}`);
