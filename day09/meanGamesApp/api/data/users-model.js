


const userSchema= new mongoose.Schema({

    

    username: {
        type: String,
        required: true
    },
    

    password: {
        type: Number,
        required: true
      
    },
    name: {
        type: Number,
        required: true
        
    },
    

});

mongoose.model("User", userSchema, "users");
//compiling the model