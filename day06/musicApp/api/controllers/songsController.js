//const songsData= require("../data/songs.json");
//const dbConnection=  require("../data/dbconnection.js");

//const ObjectId= require("mongodb").ObjectId;

const mongoose = require("mongoose");

const Song = mongoose.model("Song");




module.exports.songsGetAll = function (req, res) {

    var offset = 0;
    var count = 100;
    const maxCount = 100;

    console.log("GET songs");
    console.log(req.query);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);

    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);

    }
    console.log(count);

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({
            "message": "QueryString  Offset and Count should be numbers"
        });
        return;
    }




    if (count > maxCount) {
        res.status(400).json({
            "message": "Cannot exceed count of " + maxCount
        });
        return;
    }

    Song.find().skip(offset).limit(count).exec(function (err, songs) {
        if (err) {
            console.log("Error  finding songs");
            res.status(500).json(err);
        } else {
            console.log("eeFound songs");
            res.status(200).json(songs);
        }

        // console.log("found songs", songs);
        // res.status(200).json(songs);
    });
}


module.exports.songsGetOne = function (req, res) {
    const songId = req.params.songId;
    console.log("get song with ID", req.params.songId)

    Song.findById(songId).exec(function (err, song) {


        console.log(song);
        const response = {
            status: 200,
            message: song
        };

        if (err) {
            console.log("error finding song");
            response.status = 500;
            response.message = err;

        } else if (!song) {
            response.status = 404;
            response.message = {
                "message": "song ID not found"
            };
        }

        console.log("response", response.message)
        res.status(response.status).json(response.message);
    });
}

module.exports.songsFullUpdateOne = function (req, res) {
    const songId = req.params.songId;
    console.log("full update", songId)

    Song.findById(songId).exec(function (err, song) {

        const response = {
            status: 200,
            message: song
        };

        if (err) {
            console.log("error finding song");
            response.status = 500;
            response.message = err;

        } else if (!song) {
            response.status = 404;
            response.message = {
                "message": "song ID not found"
            };
        }


        if (response.status !== 200) {
            console.log("response", response.message);
            res.status(response.status).json(response.message);
        } else {

            song.title = req.body.title;
            song.year = parseInt(req.body.year);
            song.length = parseInt(req.body.length);
            song.rate = parseInt(req.body.rate);
            // song.designers= req.body.designers;
            song.artists = JSON.parse(req.body.artists)
            song.genre = req.body.genre
            song.save(function (err, updatedsong) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {

                    response.message = updatedsong;
                }
                console.log("fully updated", updatedsong);

                res.status(response.status).json(response.message);
                console.log(response.message);

            });

        }



    });


}

module.exports.songsPartialUpdateOne = function (req, res) {
    const songId = req.params.songId;
    console.log("partially update", songId)

    Song.findById(songId).exec(function (err, song) {

        const response = {
            status: 200,
            message: song
        };

        if (err) {
            console.log("error finding song");
            response.status = 500;
            response.message = err;

        } else if (!song) {
            response.status = 404;
            response.message = {
                "message": "song ID not found"
            };
        }


        if (response.status !== 200) {
            console.log("response", response.message);
            res.status(response.status).json(response.message);
        } else {
            if (req.body.title) {
                song.title = req.body.title;
            }

            if (req.body.year) {
                song.year = parseFloat(req.body.year);
            }


            if (req.body.length) {
                song.length = parseInt(req.body.length);
            }

            if (req.body.artists) {
                song.artists = JSON.parse(req.body.artist);
            }

            if (req.body.genre) {
                song.genre = req.body.genre;
            }

            if (req.body.rate) {
                song.rate = parseInt(req.body.rate);
            }

            /* if (req.body.designers) {
                    song.designers = req.body.designers;
                }
                song.publisher = {};
                */

            song.save(function (err, updatedsong) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {

                    response.message = updatedsong;

                }

                console.log(response.message);
                console.log("updated song");
                res.status(response.status).json(response.message);
            });

        }



    });
}


module.exports.songsAddOne = function (req, res) {
    console.log("POST new song)");
    console.log(req.body);

    console.log(req.body.artists);
    const newsong = {
        title: req.body.title,
        year: parseInt(req.body.year),
        artists: JSON.parse(req.body.artists),

        genre: req.body.genre,
        rate: parseInt(req.body.rate),
        length: parseInt(req.body.length)

    };

    Song.create(newsong, function (err, song) {
        if (err) {
            console.log("Error creating songs");
            res.status(400).json(err);
        } else {
            console.log("song Created", song);
            res.status(201).json(song);
        }
    });
}

module.exports.songsDeleteOne = function (req, res) {
    const songId = req.params.songId;
    console.log("get song with ID", req.params.songId)

    Song.findByIdAndRemove(songId).exec(function (err, deletedsong) {

        const response = {
            status: 200,
            message: "song deleted"
        };

        if (err) {
            console.log("error finding song");
            response.status = 500;
            response.message = err;

        } else if (!deletedsong) {
            response.status = 404;
            response.message = {
                "message": "song ID not found"
            };
        }

        console.log("response", response.message)
        res.status(response.status).json(response.message);
    });
}