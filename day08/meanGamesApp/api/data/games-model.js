const mongoose=require("mongoose");


const publisherSchema= new mongoose.Schema({

name:  String,

country: String,


});


const reviewSchema = new mongoose.Schema({
    name: String,
    date: Date,
    reveiw: String

});



const gameSchema= new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    
    price: Number,
    year:  Number,
    minPlayers: {
        type: Number,
        min:1,
        max:10
    },
    maxPlayers: {
        type: Number,
        min:1,
        max:10
    },
    minAge: Number,
    rate: 
    {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    reveiws :[reviewSchema],
    designers: [String],
    publisher:publisherSchema

});

mongoose.model("Game", gameSchema, "games");
//compiling the model