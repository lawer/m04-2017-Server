var express = require('express');
var router = express.Router();

var fs = require("fs");
var XML = require('pixl-xml');

//Inicialitzem la bd
var knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: './db.db'
    }
});

/*
/api/characters	    GET	    Get all the characters.
/api/characters	    POST	Create a character.
/api/characters/:id	GET	    Get a single character.
/api/characters/:id	PUT	    Update a character with new info.
/api/characters/:id	DELETE	Delete a character.
*/

router.get('/populate', function (req, res) {
    var data = fs.readFileSync('comics_small.xml', 'utf8');
    var json = XML.parse(data);
    var characters = json["character"];

    for (var character of characters) {
        knex('character').insert(character)
            .then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    res.send("OK");

});

/*
 Funció que gestiona les crides a "/api/characters"	amb el métode GET.
 Retorna un JSON/XML amb les dades dels personatges.

 JSON: http://localhost:3000/api/characters
 XML:  http://localhost:3000/api/characters?format=xml
*/
router.get('/characters/', function (req, res) {
    //Executem
    knex.select().from('character').orderBy('name')
        .then(function (data) {
            if (req.query.format === "xml") {
                var xml = XML.stringify({"character": data}, 'characters');
                res.send(xml);
            } else {
                res.json({"characters": data});
            }
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);
        });
});

router.post('/characters/', function (req, res) {
    const data = req.body;

    console.log(data);

    knex('character').insert(data)
        .then(function (id) {
            res.send(id);
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);
        });
});

router.get('/characters/:id', function (req, res) {
    const id = req.param("id");

    knex.select().from('character').where('id', id)
        .then(function (data) {
            res.json(data[0]);
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);
        });
});

router.put('/characters/:id', function (req, res) {
    const id = req.param("id");
    const data = req.body;

    knex.select().from('character').where('id', id)
        .update(data)
        .then(function (data) {
            res.send(data[0]);
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);
        });

});

router.delete('/characters/:id', function (req, res) {
    const id = req.param("id");

    knex.select().from('character').where('id', id)
        .del()
        .then(function () {
            res.json(id);
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);
        });
});

module.exports = router;
