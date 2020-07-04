const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/resume", (req, res) => {
    res.sendFile(path.join(__dirname, "db.json"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(9000);
