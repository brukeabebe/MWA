const mongoose = require("mongoose");

const User = mongoose.model("User");

var bcrypt = require("bcrypt-nodejs");
var jwt= require("jsonwebtoken");


module.exports.register = function (req, res) {
    console.log("Registering user");
    var username = req.body.username;
    var name = req.body.name || null;
    var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create({
        username: username,
        name: name,
        password: password
    }, function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log("user created", user);
            res.status(200).json(user);
        }
    });
};

module.exports.login = function (req, res) {

    console.log("controller Login");
    const username = req.body.username;
    const password = req.body.password;
  

    User.findOne({ username: username }).exec(function (err, user) {
        if (err) {
            res.status(500).json(err);
        }
        console.log("er", err)
        console.log("user", user)
        if (user) {
           
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log("Err", err)
                    res.status(400).json({ "message": "unauthorized" });
                } else {
                    if (result) {
                        console.log("User found", user);
                        const token = jwt.sign({ name: user.name }, "cs572", { expiresIn: 3600 })
                        res.status(200).json({ success: "true", token: token });
                    }
                }
            })
        } else {
            res.status(400).json({ "message": "unauthorized 2" });
        }
    })
}

module.exports.authenticate = function (req, res, next) {
    const headerExists = req.headers.authorization;

    if (headerExists) {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        jwt.verify(token, "cs572", function(err, decodedToken) {
            if(err) {
                console.log("JWT verify error ", err);
                res.status(401).json({message: "Unauthorized"})
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({message: "Token Missing"})
    }
}


/*

module.exports.login = function (req, res) {
    console.log("Logging in user");
    let username = req.body.username;
    let password = req.body.password;

    console.log(username);
    User.findOne({
        username: username
    }).exec(function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        if (user) {
            if (bcrypt.compareSync( req.body.password, user.password)) {
                console.log("user found", user);
                var token = jwt.sign({
                    username: user.username
                }, "cs572", {
                    expiresIn: 3600
                });
                res.status(200).json({
                    success: true,
                    token: token
                });
            } else {
                res.status(401).json("Unauthorized");
            }
        } else {
            console.log("user not found", user);
            res.status(400).json("Unauthorized");
        }

    });
};
*/
module.exports.authenticate = function (req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split("  ")[1];
        jwt.verify(token, "cs572", function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json("Unauthorized")
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json("No  token provided");
    }
};