const express=require("express");
const controllerSongs= require("../controllers/songsController.js");
//const controllerPublisher= require("../controllers/Publisher.controller.js");

const controllerArtist= require("../controllers/artistController");
const router= express.Router();

router.route("/songs")
.get(controllerSongs.songsGetAll)
.post(controllerSongs.songsAddOne);

router.route("/songs/:songId")
.get(controllerSongs.songsGetOne)
.put(controllerSongs.songsFullUpdateOne)
.patch(controllerSongs.songsPartialUpdateOne)
.delete(controllerSongs.songsDeleteOne);




router.route("/songs/:songId/artists")
.post(controllerArtist.addAnArtist)


router.route("/songs/:songId/artists/:artistId")
.get(controllerArtist.getOneArtist)
.put(controllerArtist.updateAnArtist)
.patch(controllerArtist.partiallyUpdateAnArtist)
.delete(controllerArtist.deleteAnArtist)


module.exports= router;
