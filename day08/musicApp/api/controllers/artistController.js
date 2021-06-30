const mongoose = require("mongoose");

const Song = mongoose.model("Song");



module.exports.getAllArtists = function (req, res) {

    const songId = req.params.songId;
    Song.findById(songId).exec(function (err, song) {
        const response = {
            status: 200,
            message: song
        }

        if (err) {
            response.status = 500
            response.message = 'error obtaining data from database'
        } else if (!song) {

            response.status = 404;
            response.message = 'No song found with the given ID';
        } else if (!song.artists) {
            response.status = 404;
            response.message = 'No reviews found for the given song'
        } else {

            response.status = 200;
            response.message = song.artists;

        }

        res.status(response.status).json(response.message)
    })
}


module.exports.getOneArtist = function (req, res) {
    const songId = req.params.songId;
    console.log("aa")
    Song.findById(songId).exec(function (err, song) {
        const response = {
            status: 200,
            message: song
        }

        if (err) {
            response.status = 500;
            response.message = 'error obtainig song from database';
        } else if (!song) {
            response.status = 404
            response.message = 'song with given Id is not found'
        } else if (response.status !== 200) {

            res.status(response.status).json(response.message)
            return;
        }

        if (song.artists.length) {
            console.log(song.artists.length)
            const artistId = req.params.artistId;
            let artists = song.artists;
            let artist = artists.find(art => art._id == artistId);

            if (artist) {

                console.log(song.artists);
                response.message = artist;
                res.status(response.status).json(response.message)


            } else {
                response.status = 404
                response.message = 'no artist with the given ID'
                res.status(response.status).json(response.message)
            }

        } else {

            response.status = 404
            response.message = 'no artists listed for the song'
            res.status(response.status).json(response.message)

        }
    })
}


module.exports.addAnArtist = function (req, res) {

    const songId = req.params.songId;


    Song.findById(songId).exec(function (err, song) {
        const response = {
            status: 201,
            message: song
        }
        if (err) {
            response.status = 500;
            response.message = 'error obtainig song from database'
        } else if (!song) {
            response.status = 400;
            response.message = 'song id is not found'
        }

        if (song) {
            let artist = {
                name: req.body.name,
                roleInSong: req.body.roleInSong,

            }

            song.artists.push(artist)

            song.save(function (err, song) {

                if (err) {

                    response.message = err
                    response.status = 500;

                } else {

                    response.message = song.artists
                    response.status = 201
                }
                res.status(response.status).json(response.message);
            })
        } else {
            res.status(response.status).json(response.message);
        }
    })


}




module.exports.updateAnArtist = function (req, res) {

    const songId = req.params.songId;
    console.log("aa")
    Song.findById(songId).exec(function (err, song) {
        const response = {
            status: 200,
            message: song
        }

        if (err) {
            response.status = 500;
            response.message = 'error obtainig song from database';
        } else if (!song) {
            response.status = 404
            response.message = 'song with given Id is not found'
        } else if (response.status !== 200) {

            res.status(response.status).json(response.message)
            return;
        }

        if (song.artists.length) {
            console.log(song.artists.length)
            const artistId = req.params.artistId;
            let artists = song.artists;
            let artist = artists.find(art => art._id == artistId);

            if (artist) {
                const i = artists.indexOf(artist);

                song.artists[i].name = req.body.name;
                song.artists[i].roleInSong = req.body.roleInSong;

                console.log(song.artists);


                song.save(function (err, updatedsong) {
                    if (err) {
                        response.status = 500
                        response.message = err
                    } else {

                        response.message = updatedsong
                    }
                    res.status(response.status).json(response.message)
                })
            } else {
                response.status = 404
                response.message = 'no artist with the given ID'
                res.status(response.status).json(response.message)
            }

        } else {

            response.status = 404
            response.message = 'no artists listed for the song'
            res.status(response.status).json(response.message)

        }
    })

}

module.exports.partiallyUpdateAnArtist = function (req, res) {

    const songId = req.params.songId;

    Song.findById(songId).exec(function (err, song) {
        const response = {
            status: 200,
            message: song
        }
         console.log(song);
        if (err) {
            response.status = 500;
            response.message = 'error obtainig song from database';
        } else if (!song) {
            response.status = 404
            response.message = 'song with given Id is not found'
        } else if (response.status !== 200) {

            res.status(response.status).json(response.message)
            return;
        }

        if (song.artists.length) {
            console.log(song.artists.length)
            const artistId = req.params.artistId;
            let artists = song.artists;
            let artist = artists.find(art => art._id == artistId);

            if (artist) {
                const i = artists.indexOf(artist);


                if(req.body.name)
                {
                song.artists[i].name = req.body.name;
                }


                if(req.body.name)
                {
                    song.artists[i].roleInSong = req.body.roleInSong;
                }

               

                console.log(song.artists);


                song.save(function (err, updatedsong) {
                    if (err) {
                        response.status = 500
                        response.message = err
                    } else {

                        response.message = updatedsong
                    }
                    res.status(response.status).json(response.message)
                })
            } else {
                response.status = 404
                response.message = 'no artist with the given ID'
                res.status(response.status).json(response.message)
            }

        } else {

            response.status = 404
            response.message = 'no artists listed for the song'
            res.status(response.status).json(response.message)

        }
    })

}




module.exports.deleteAnArtist = function (req, res) {



    const songId = req.params.songId;

    Song.findById(songId).exec(function (err, song) {

        const response = {
            status: 204,
            message: song
        }
        if (err) {
            console.log("error finding song");
            response.status = 500;
            response.message = err;

        } else if (!song) {
            response.status = 404;
            response.message = {
                "message": "song is not found"
            };
        } else if (!song.artists) {
            response.status = 404
            response.message = 'no artist listed for this song'
        } else if (song.artists) {
            const artistId = req.params.artistId;

            let artist = song.artists.find(art => art._id == artistId);
            console.log("artist:", artist)



            console.log("artist:", song.artists)
            if (artist) {
                const index = song.artists.indexOf(artist);
                if (index > -1) {
                    song.artists.splice(index, 1);
                }
                song.save(function (err, updatedsong) {
                    if (err) {
                        response.status = 500
                        response.message = err
                    }

                    res.status(response.status).json(response.message)

                })


            } else {
                response.status = 404
                response.message = 'no artist with the given ID'
                res.status(response.status).json(response.message)
            }




        }


        console.log(response.message);

    })

}