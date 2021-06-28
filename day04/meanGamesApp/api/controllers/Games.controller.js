//const gamesData= require("../data/games.json");
//const dbConnection=  require("../data/dbconnection.js");

//const ObjectId= require("mongodb").ObjectId;

const mongoose = require("mongoose");

const Game = mongoose.model("Game");




module.exports.gamesGetAll = function (req, res) {

    let offset = 0;
    let count = 4;

    console.log("GET games");
    console.log(req.query);
  
        if (req.query && req.query.offset)  {
        offset= parseInt(req.query.offset,  10);
        }


    Game.find().skip(offset).limit(count).exec(function (err, games) {
        console.log("found games", games);
        res.status(200).json(games);
    });
}


module.exports.gamesGetOne = function (req, res) {

    
if(req.params)
{

    console.log("get game with ID", req.params.gamesId)
    const gameId= req.params.gamesId;
    Game.findById(gameId).exec(function(err,  game) {
    res.status(200).json(game);
});
}
}


