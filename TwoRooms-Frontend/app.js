const express = require("express");
const path = require("path");
const ProgressBar = require('progressbar.js');

const UserAPI = require('./services/userapi');
const GameAPI = require('./services/gameapi.js');

const app = express();
const PORT = 3000;

//Set view engine template system
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("pages/index", {pageTitle: 'Two Rooms Online'});
});

//#region GET REQUESTS
app.get("/services/joinGame", async (req, res) => {
    //console.log(req.query);
    try{
        const joinReq = await GameAPI.joinGame(req.query.username, req.query.roomCode);
        res.status(200).send(joinReq.data);
    }catch(err){
        res.status(409).send(err);
    }

});
app.get("/services/leaveGame", async (req, res) => {
    //console.log(req.query);
    try{
        const leaveReq = await GameAPI.leaveGame(req.query.username, req.query.gameId);
        res.status(200).send(leaveReq.data);
    }catch(err){
        res.status(409).send(err);
    }
});
app.get("/services/listPlayers", async (req, res) => {
    try{
        const playersReq = await GameAPI.listPlayersInGame(req.query.gameId);
        res.status(200).send(playersReq.data);
    }catch(err){
        res.status(409).send(err);
    }
});
//#endregion

//#region POST REQUESTS
app.post("/services/login", async (req, res) => {
    //console.log(req.body);
    try{
        const login = await UserAPI.login(req.body.accountName, req.body.accountPassword);
        res.status(200).send(login.data);
    }catch(err){
        res.status(409).send(err);
    }
});

app.post("/services/createGame", async (req, res) => {
    //console.log(req.body);
    try{
        const game = await GameAPI.createGame(req.body.username);
        res.status(200).send(game.data);
    }catch(err){
        res.status(409).send(err);
    }
});
//#endregion

//#region Resources
app.get('/progressbar', async (req, res) => {
    //console.log('requesting progressbar');
    res.sendFile(__dirname + '/node_modules/progressbar.js/dist/progressbar.min.js');
});
//#endregion

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Error message goes here...");
});

//ANY AND ALL GET/POST/PUT ETC. METHODS MUST COME BEFORE THIS ONE. Learned that the hard way...
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is now running on port ${PORT}`);
});

