const router = require('express').Router();
const dbJson = require("../../db/db.json");
const fs = require("fs");

router.get("/api/notes",function(req,res){
    dbJson = JSON.parse(fs.readFileSync("./db/db.json","utf-8")) || []
    console.log("Get Route",dbJson)
    res.json(dbJson)
});

router.post("/api/notes",function(req,res){
    let  userNode = {
        id: Math.floor(Math.random() * 100),
        title: req.body.title,
        text: req.body.text
    }
    dbJson.push(userNode)
  fs.writeFileSync("./db/db.json",JSON.stringify(dbJson),function(err){
      if(err) throw err;
  })
    console.log("POST Route",dbJson)
    res.json(dbJson)
});

module.exports = router;