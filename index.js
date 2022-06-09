const express = require("express");
require("./db/db-connection");
const errorMiddleware = require("./middleware/error-middeware");

// Routes
const userRouter = require("./router/user-router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

/* app.get("/", (req, res) => {
  res.status(200).json({ mesaj: "hoşgeldin" });
});
 */
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("3000 portundan server çalıştı");
});
