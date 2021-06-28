const mongoose=require("mongoose");



const courseSchema= new mongoose.Schema({

title:{
    type: String,
    required: true
    
},


courseNo:{
    type: String,
    required: true
}

});



const studentSchema= new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    gpa:{
        type: Number,
        required: true
    },
  courses :[courseSchema]
    

});

mongoose.model("Student", studentSchema, "Students");
