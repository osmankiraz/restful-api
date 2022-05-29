const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ mesaj: "tüm kullanıcılar listenecek" });
});

router.get("/:id", (req, res) => {
  res.json({ mesaj: `id değeri ${req.params.id} olan kullanıcı listeleniyor` });
});

router.post("/",(req,res)=>{
    res.json(req.body)
})

router.patch("/:id",(req,res)=>{
    res.json({
        mesaj:"patch isteği|| id: "+ req.params.id ,
        isteginBodysi:req.body
    })
})

router.delete("/:id" ,(req,res)=>{
    res.json({
        "silinen kullanıcı id'si": req.params.id
    })
})


module.exports = router;
