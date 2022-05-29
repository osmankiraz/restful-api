const express = require("express");
require("./db/db-connection");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.status(200).json({'mesaj':"hoşgeldin"})
})

app.post("/",(req,res)=>{
  res.status(200).json(req.body)
})

app.listen(3000, () => {
  console.log("3000 portundan server çalıştı");
});
