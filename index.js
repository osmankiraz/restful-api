const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost/restful_api_nodejs", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("veritabanına bağlanıldı"))
  .catch((hata) => console.log("db bağlantısında hata! => ",hata));

app.listen(3000, () => {
  console.log("3000 portundan server çalıştı");
});
