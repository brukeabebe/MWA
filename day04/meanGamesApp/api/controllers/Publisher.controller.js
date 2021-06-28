const mongoose=require("mongoose");

const Game=mongoose.model("Game");



module.exports.getPublisher=  function(req,  res) {
const gameId= req.params.gamesId;
Game.findById(gameId).select("publisher").exec(function(err,  publisher) {
res.status(200).json(publisher);
});
}
    