const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(3000, () => {
  console.log("3000 portundan server çalıştı");
});

