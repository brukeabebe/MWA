const mongoose = require("mongoose");

const Game = mongoose.model("Game");



module.exports.getAllReveiws = function(req, res){
   
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game)  {
        const response = {
            status: 200,
            message: game
        }

        if (err) {
            response.status = 500
            response.message = 'error obtaining data from database'
        }
        else if (!game) {

            response.status = 404;
            response.message = 'No Game found with the given ID';
        }
        else if (!game.reveiws) {
            response.status = 404;
            response.message = 'No reviews found for the given game'
        } else {

            response.status = 200;
            response.message = game.reveiws;

        }

        res.status(response.status).json(response.message)
    })
}

module.exports.AddAReveiw = function(req, res) {

    const gameId = req.params.gameId;
    

        Game.findById(gameId).exec(function(err, game) {
            const response = {
                status: 201,
                message: game
            }
            if (err) {
                response.status = 500;
                response.message = 'error obtainig game from database'
            } 
            else if (!game) {
                response.status = 400;
                response.message = 'Game id is not foung'
            } 
            
            if(game)
            {
                let reveiw = {
                    name:req.body.name,
                    reveiw :req.body.reveiw,
                    date :req.body.date
                }
                
                 game.reveiws.push(reveiw)
               
                game.save(function(err, game){

                    if (err) {
                       
                        response.message = err
                        response.status = 500;
                        
                    }              
                    else {
                    
                        response.message = game.reveiws
                        response.status = 201
                    }
                    res.status(response.status).json(response.message);
                })
            }

            else{
                res.status(response.status).json(response.message);
            }
        })
     
    
    }




module.exports.updateAReveiw =function (req, res){

    const gameId = req.params.gameId;
    
        Game.findById(gameId ).exec(function(err, game) {
            const response = {
                status: 201,
                message: "reveiw deleted"
            }

            if (err) 
            {
                response.status = 500;
                response.message = 'error obtainig game from database';
            }
            else if (!game) {
                response.status = 404
                response.message = 'Game with given Id is not found'
            }
            else if (response.status !== 201) 
            {
                
                res.status(response.status).json(response.message)
                return;
            }     
                    
            if (game.reveiws.length) {
                const reveiwId = req.params.reveiwId;
               let reveiws=game.reveiws;
                let reveiw = reveiws.find(rev => rev._id == reveiwId);

                if(reveiw)
                {
                const i = reveiws.indexOf(reveiw);
              
                 game.reveiws[i]=
                {
                        reveiw :req.body.reveiw,
                        name: req.body.name,
                        date: req.body.date

                }
                        

                 game.save(function(err, updatedGame) {
                    if (err) {
                          response.status = 500
                         response.message = err
                         } 
                         else 
                         {
                                
                         response.message = updatedGame
                             }
                                
                            })
              }
                    
                        else 
                        {
                            res.status(response.status).json(response.message)
                        }

                    } 

            
            else
            {
                res.status(response.status).json(response.message)

            }
            })
    
    }




module.exports.deleteAReveiw = function(req, res)  {

    const response = {
        status: 204,
        message: "reveiw is removed"
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
        
        else if (!game.reveiws) {
            response.status = 404
            response.message = 'no reveiw for this game'
        }
        else if(game.reveiws){
            const reveiwId = req.params.reveiwId;
            
             let reveiw = game.reveiws.find(rev => rev._id == reveiwId);

             if(reveiw)
             {
             const index = game.reveiws.indexOf(reveiw);

           
            if (index > -1) {
                game.reveiws.splice(index, 1);
            }
             game.save(function(err, updatedGame) {
                if (err) {
                      response.status = 500
                     response.message = err
                     } 
                     else 
                     {
                            
                     response.message = updatedGame
                         }
                         res.status(response.status).json(response.message)
                        })
          
            
        } 
        
    }

    if(response.status!==204)
    {
         res.status(response.status).json(response.message)
    }
        console.log(response.message);
    
    })

}
