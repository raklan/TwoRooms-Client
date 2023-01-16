const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

//Set view engine template system
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static")));

app.get("/", (req, res) => {
    res.render("pages/index", {pageTitle: 'Home'});
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Error message goes here...");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is now running on port ${PORT}`);
});