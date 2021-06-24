
//const gamesData= require("../data/games.json");
const dbConnection=  require("../data/dbconnection.js");

const ObjectId= require("mongodb").ObjectId;


module.exports.gamesGetAll= function(req,res)
{

    let offset=0;
    let count=4;

    console.log("GET games");
    console.log(req.query);

    const db=dbConnection.get();
    console.log("db", db);


    const collection= db.collection("games");



    if(req.query && req.query.offset)
    {
        offset=parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.count)
    {
        count=parseInt(req.query.count, 10);
    }

    if(count<8)
    {
    collection.find().skip(offset).limit(count).toArray(function(err, docs)
    {
        console.log("games", docs);
        res.status(200).json(docs);
    })
    }

    if(count>=8)
    {
        collection.find().skip(offset).limit(8).toArray(function(err, docs)
    {
        console.log("games", docs);
        res.status(200).json(docs);
    })
    }
    }

    module.exports.gamesGetOne= function(req,res)
    {

        const db= dbConnection.get();
        const collection= db.collection("games");
        const id= req.params.gamesId;
     

        collection.findOne({_id: ObjectId(id)}, function(err, doc)
        {
            console.log("game", doc);
            res.status(200).json(doc);
        })
    }

module.exports.gamesAddOne= function(req, res)
{

    let game={};
    const db= dbConnection.get();
    const collection= db.collection("games");
    console.log("POST new game");
    if(req.body && req.body.title && req.body.price)
    {
        game.title= req.body.title;
        game.price=parseFloat(req.body.price);
        collection.insertOne(game, function(err, response)
        {
            console.log(response.ops);
            res.status(201).json(response.ops);
        });


    }

    else  {
        console.log("Data  missing  from POST  body");
        res.status(400).json({error  : "Required  data missing  from  POST"});
        }

    
}


