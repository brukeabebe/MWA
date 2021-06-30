//const gamesData= require("../data/games.json");
//const dbConnection=  require("../data/dbconnection.js");

//const ObjectId= require("mongodb").ObjectId;

const mongoose = require("mongoose");

const Game = mongoose.model("Game");




module.exports.gamesGetAll = function (req, res) {

    var offset= 0;
    var count=5;
    const maxCount= 8;

    console.log("GET games");
    console.log(req.query);

    if (req.query && req.query.offset)  {
        offset= parseInt(req.query.offset,  10);

        }

        if (req.query && req.query.count)  {
            count= parseInt(req.query.count,  10);
            
         }
console.log(count);

    if (isNaN(offset)  || isNaN(count))  {
        res.status(400).json({"message":  "QueryString  Offset and Count should be numbers"});
        return;
        }

        


  if (count > maxCount) {
         res.status(400).json({"message":  "Cannot exceed count of "+   maxCount});
        return;
          }

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        if (err)  {
            console.log("Error  finding games");
            res.status(500).json(err);
            } else {
            console.log("Found games");
            res.status(200).json(games);
            }

       // console.log("found games", games);
       // res.status(200).json(games);
    });
}


module.exports.gamesGetOne = function (req, res) {
    const  gameId=  req.params.gameId;
    console.log("get game with ID", req.params.gameId)
   
    Game.findById(gameId).exec(function(err,  game) {


        console.log(game);
        const response={
            status: 200,
            message: game
        };
        
        if(err){
            console.log("error finding game");
            response.status=500;
            response.message=err;
            
        }
        else if(!game)
        {
            response.status=404;
            response.message= {"message"  : "Game ID not found"};
        }
        
            console.log("response" , response.message)
            res.status(response.status).json(response.message);
});
}

module.exports.gamesFullUpdateOne = function (req, res) {
    const  gameId=  req.params.gameId;
    console.log("full update", req.params.gameId)
   
    Game.findById(gameId).exec(function(err,  game) {

        const response={
            status: 204,  
            message: game
        };
        
        if(err){
            console.log("error finding game");
            response.status=500;
            response.message=err;
            
        }
        else if(!game)
        {
            response.status=404;
            response.message= {"message"  : "Game ID not found"};
        }


        if(response.status!==204){
            console.log("response" , response.message);
            res.status(response.status).json(response.message);
    }

    else{

        game.title= req.body.title;
        game.price=parseFloat(req.body.price);
        game.year= parseInt(req.body.year);
        game.minPlayers= parseInt(req.body.minPlayers);
        game.maxPlayers= parseInt(req.body.maxPlayers);
        game.minAge= parseInt(req.body.minAge);
        game.rate= parseInt(req.body.rate);
       // game.designers= req.body.designers;
        game.publisher= req.body.publisher

        game.save(function(err, updatedGame)
        {
            if(err)
            {
                response.status=500;
                response.message=err;
            }
            else{
               
                response.message=updatedGame;
        }
        console.log("fully updated", updatedGame);

        res.status(response.status).json(response.message);
        console.log(response.message);
       
    });
  
    }
    

           
});


}

module.exports.gamesPartialUpdateOne = function (req, res) {
    const  gameId=  req.params.gameId;
    console.log("full update", req.params.gameId)
   
    Game.findById(gameId).exec(function(err,  game) {

        const response={
            status: 204,  
            message: game
        };
        
        if(err){
            console.log("error finding game");
            response.status=500;
            response.message=err;
            
        }
        else if(!game)
        {
            response.status=404;
            response.message= {"message"  : "Game ID not found"};
        }


        if(response.status!==204){
            console.log("response" , response.message);
            res.status(response.status).json(response.message);
    }

    else{
        if (req.body.title) {
             game.title = req.body.title;
        }

        if (req.body.price) {
            game.price = parseFloat(req.body.price);
        }

        if (req.body.year) {
            game.year = parseInt(req.body.year);
        }

        if (req.body.miniPlayers) {
            game.minPlayers = parseInt(req.body.miniPlayers);
        }

        if (req.body.maxPlayers) {
            game.maxPlayers = parseInt(req.body.maxPlayers);
        }

        if (req.body.minAge) {
            game.minAge = parseInt(req.body.minAge);
        }

        if (req.body.rate) {
            game.rate = parseInt(req.body.rate);
        }

    /* if (req.body.designers) {
            game.designers = req.body.designers;
        }
        game.publisher = {};
        */

        game.save(function(err, updatedGame)
        {
            if(err)
            {
                response.status=500;
                response.message=err;
            }
            else{
               
                response.message=updatedGame;
        }
        console.log(response.message);
        console.log("updated game");
        res.status(response.status).json(response.message);
    });

    }
    

           
});
}


module.exports.gamesAddOne= function(req, res)
{
    console.log("POST new Game)");
    console.log(req.body);
        const newGame={
            title: req.body.title,
            price: parseFloat(req.body.price),
            year: parseInt(req.body.year),
            minPlayers: parseInt(req.body.minPlayers),
            maxPlayers: parseInt(req.body.maxPlayers),
            minAge: parseInt(req.body.minAge),
            rate: parseInt(req.body.rate),
           // designers: req.body.designers,
           publisher: {name:"",country: ""}

        };

        Game.create(newGame, function(err, game)
        {
           if(err)
           {
               console.log("Error creating games");
               res.status(400).json(err);
           } 
           else{
               console.log("Game Created", game);
                res.status(201).json(game);          }
        });
}

module.exports.gamesDeleteOne = function (req, res) {
    const  gameId=  req.params.gameId;
    console.log("get game with ID", req.params.gameId)
   
    Game.findByIdAndRemove(gameId).exec(function(err,  deletedgame) {

        const response={
            status: 200,
            message: "game deleted"
        };
        
        if(err){
            console.log("error finding game");
            response.status=500;
            response.message=err;
            
        }
        else if(!deletedgame)
        {
            response.status=404;
            response.message= {"message"  : "Game ID not found"};
        }

            console.log("response" , response.message)
            res.status(response.status).json(response.message);
});
}
