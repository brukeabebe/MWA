const mongoose = require("mongoose");

const Game = mongoose.model("Game");



module.exports.getPublisher = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        const response = {
            status: 200,
            message: game
        };

        if (err) {
            console.log("error finding game");
            response.status = 500;
            response.message = err;

        } else if (!game) {
            response.status = 404;
            response.message = {
                "message": "Game ID not found"
            };
        } 
        
        else {
                    
            response.status = 204;
            response.message= game.publisher;
        }
         
            console.log(response.message)
            res.status(response.status).json(response.message);

        

       
    });
}


module.exports.addPublisher = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game)  {
        const response = {
            status: 201,
            message: game
        }

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = "game does not exist"
        }

        if (game) 
        {
            game.publisher={name: req.body.name,
                            country: req.body.country
                        };
       
       // game.publisher.country = req.body.country
        //game.publisher.name = req.body.name;
       
        game.save(function(err, updatedGame) {
            if (err) {
                response.status = 500;
                response.message = err;
            } else 
            {
                response.message = updatedGame
            }
    
            res.status(response.status).json(response.message)
        })
    }
    
        else
        {
            res.status(response.status).json(response.message);
        }
        
    })
}




module.exports.PublisherFullUpdate = function (req, res) {
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


        if(response.status!=204){
            console.log("response" , response.message);
            res.status(response.status).json(response.message);
            return;
    }

    else{

        game.publisher.name= req.body.name;
        game.publisher.country=req.body.country;
       

        game.save(function(err, updatedPublisher)
        {
            if(err)
            {
                response.status=500;
                response.message=err;
            }
            else{     
                response.message=updatedPublisher;
                 }
        console.log("fully updated", updatedPublisher);
        res.status(response.status).json(response.message);
 
    })
 

    }

           
})
}



module.exports.publisherDelete = function(req, res)  {


    const response = {
        status: 204,
        message: "Publisher is removed"
    }

    const  gameId=  req.params.gameId;

    Game.findById(gameId).exec(function(err, game) {
        if(err){
            console.log("error finding game");
            response.status=500;
            response.message=err;
            
        }
        else if(!game)
        {
            response.status=404;
            response.message= {"message"  : "game is not found"};
        }
        
        else if (!game.publisher) {
            response.status = 404
            response.message = 'no publisher for this game'
        }
        else if(game.publisher){
            game.publisher.remove()
            game.save(function(err, game)  {
                res.status(response.status).json(response.message)
            })
        } 
        
        else{
         res.status(response.status).json(response.message)
        }
        console.log(response.message);
    });
}

