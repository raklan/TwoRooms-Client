const express = require("express");
const path = require("path");

const UserAPI = require('./services/userapi')

const app = express();
const PORT = 3000;

//Set view engine template system
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static")));

app.get("/", (req, res) => {
    res.render("pages/index", {pageTitle: 'Home'});
});

//GET REQUESTS
app.get("/services/login", async (req, res) => {//TODO: Make this a post to hide their login credentials from the query string
    //console.log(req.query);
    try{
        const login = await UserAPI.login(req.query.accountName, req.query.accountPassword);
        res.status(200).send(login.data);
    }catch(err){
        res.status(409).send(err);
    }
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Error message goes here...");
});

//ANY AND ALL GET/POST/PUT ETC. METHODS MUST COME BEFORE THIS ONE. Learned that the hard way...
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is now running on port ${PORT}`);
});

