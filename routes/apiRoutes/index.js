const router = require('express').Router();
let dbJson = require("../../db/db.json");
const fs = require("fs");

router.get("/api/notes", function (req, res) {
    dbJson = JSON.parse(fs.readFileSync("./db/db.json", "utf-8")) || []
    console.log("Get Route", dbJson)
    res.json(dbJson)
});

router.post("/api/notes", function (req, res) {
    let userNode = {
        id: Math.floor(Math.random() * 100),
        title: req.body.title,
        text: req.body.text
    }
    console.log(userNode)
    dbJson.push(userNode)
    fs.writeFileSync("./db/db.json", JSON.stringify(dbJson), function (err) {
        if (err) throw err;
    })
    console.log("POST Route", dbJson)
    res.json(dbJson)
});

router.delete("/api/notes/:id", function (req, res) {
    //let updatedNotsList = dbJson.forEach(Element => Element.id !== req.params.id)
    let updatedNotsList = []
    for (let i = 0; i < dbJson.length; i++) {
        if (req.params.id != dbJson[i].id) {
            updatedNotsList.push(dbJson[i])
        }
    }
    console.log(updatedNotsList)
    dbJson = updatedNotsList
    fs.writeFileSync("./db/db.json", JSON.stringify(dbJson), function (err) {
        if (err) throw err;
    })
    console.log("Delete Route", dbJson)
    res.json(dbJson)
})

module.exports = router;