const mongoose = require("mongoose");
const connection = mongoose
  .connect("mongodb://localhost/restful_api_nodejs", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("veritabanına bağlanıldı"))
  .catch((hata) => console.log("db bağlantısında hata! => ", hata));

exports.connection = connection;
