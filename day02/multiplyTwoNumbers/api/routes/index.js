const express=require("express");
const controllerMultiply= require("../controllers/Multiply.controller.js");
const router= express.Router();


router.route("/multiply/:multiplicand").get(controllerMultiply.multiply);

module.exports= router;
