const express=require("express");
const controllerGames= require("../controllers/Games.controller.js");
const router= express.Router();

router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gamesId").get(controllerGames.gamesGetOne)
router.route("/games/new").post(controllerGames.gamesAddOne);
module.exports= router;
