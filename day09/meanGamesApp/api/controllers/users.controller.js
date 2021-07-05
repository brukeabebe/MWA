const mongoose = require("mongoose");

const User = mongoose.model("User");


module.exports.register = function (req, res) {
    console.log("controller register");


    bcrypt.hash(req.body.password, 10, function(err, hashedPassword)

    {
    if (req.body) {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name
        };

        User.create(newUser, function (err, user) {

            const response = {
                status: 200,
                message: ""
            }
            if (err) {
                console.log();
                response.status(500);
                response.message("cannot create user");

            } else {

                console.log();
                response.status(204);
                response.message("User created ");

            }
        });

    }
}

module.exports.login= function(req, res)

{
    console.log("Controller Login");
    const username = req.body.username;
    const password= req.body.password;

    User.findOne({usename: username}).exec(function(err, user)
    {

        
        const response = {
            status: 200,
            message: ""
        }
        if(err)
        {
            console.log("Error", err);
            res.status(500).json(err)
        }
    })
}