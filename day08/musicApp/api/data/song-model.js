const mongoose=require("mongoose");





const artistSchema = new mongoose.Schema({
    name: String,
    roleInSong: String
    

});



const songSchema= new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    
  
    year:  Number,
   
    length: Number,
    rate: 
    {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },

    artists :[artistSchema],
    
    genre:String

});

mongoose.model("Song", songSchema, "songs");
//compiling the model