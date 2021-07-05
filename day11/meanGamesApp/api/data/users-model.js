const mongoose=require("mongoose");


const userSchema= new mongoose.Schema({

    

    username: {
        type: String,
        required: true,
        unique: true
    },
    

    password: {
        type: String,
        required: true
      
    },
    name: {
        type: String
       
        
    },
    

});

mongoose.model("User", userSchema, "users");
//compiling the model