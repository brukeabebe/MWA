const mongoose=require("mongoose");
require("./games-model");



const dbName="meanGamesDB";
const dbURL="mongodb://localhost:27017/"+dbName;

mongoose.connect(dbURL, {useNewUrlParser: true,  useUnifiedTopology: true });

mongoose.connection.on("connected", function()
{
    console.log("mongoose connected to " +dbURL);
});

mongoose.connection.on("disconnected", function()
{
    console.log("mongoose disconnected")
});

mongoose.connection.on("error", function(err)
{
    console.log("mongoose error", err)
});

process.on("SIGINT", function()
{
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    })
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("send disconnect to mongoose because of application termination.");
        process.exit(0);
        });
});

process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("send disconnect to mongoose because of application termination.");
        process.kill(process.pid, "SIGUSR2");
        });
});