const express=require("express");
const controllerGames= require("../controllers/Games.controller.js");
const controllerPublisher= require("../controllers/Publisher.controller.js");

const controllerReveiw= require("../controllers/Reveiw.controller");
const router= express.Router();

router.route("/games").get(controllerGames.gamesGetAll).post(controllerGames.gamesAddOne);

router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesFullUpdateOne)
.patch(controllerGames.gamesPartialUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publisher")
.get(controllerPublisher.getPublisher)
.post(controllerPublisher.addPublisher)
.put(controllerPublisher.PublisherFullUpdate )
.delete(controllerPublisher.publisherDelete );


router.route("/games/:gameId/reveiws")
.get(controllerReveiw.getAllReveiws)
.post(controllerReveiw.AddAReveiw)

router.route("/games/:gameId/reveiws/:reveiwId")
.put(controllerReveiw.updateAReveiw)
.delete(controllerReveiw.deleteAReveiw)


//user routes
router.route("/users")
        .post();


module.exports= router;
