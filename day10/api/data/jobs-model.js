const mongoose=require("mongoose");



const locationSchema = new mongoose.Schema({

        address: String,
        // Store coordinates in order longitude (E/W), latitude (N/S)
        coordinates: {
                    type: [Number],
                    index: "2dsphere"
                  }
        

  });

  


const jobSchema= new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    
    salary: Number,
    //location:  locationSchema,
    description:String,
    experience: String,
    skills: [String],
    postDate: Date    

});

mongoose.model("Job", jobSchema, "jobs");
//compiling the model