const express= require("express");
const path =require("path");
const routes= require("./api/routes");

const app= express();

app.set("port", 5050);

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});


app.use(express.urlencoded({extended: false}));
app.use("/api", routes);

const server =app.listen(app.get("port"), function(){
    const port= server.address().port;
    console.log("Listening to port "+ port);


});