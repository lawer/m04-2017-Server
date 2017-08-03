var express = require('express');
var router = express.Router();
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

router.route('/')
    .get(function (req, res) {
        knex.select().from('character')
            .then(function (data) {
                res.json(data);
            })
            .catch(function (error) {
                console.log(error);
                res.send(error);
            });
    })
    .post(function (req, res) {
        const data = req.body;

        knex('character')
            .insert(data)
            .then(function (id) {
                res.send(id);
            })
            .catch(function (error) {
                console.log(error);
                res.send(error);
            });
    });

router.route('/:id')
    .get(function (req, res) {
        const id = req.param("id");

        knex.select().from('character').where('id', id)
            .then(function (data) {
                res.json(data[0]);
            })
            .catch(function (error) {
                console.log(error);
                res.send(error);
            });
    })
    .put(function (req, res) {
        const id = req.param("id");
        const data = req.body;

        knex.select().from('character').where('id', id)
            .update(data)
            .then(function (data) {
                res.json(data[0]);
            })
            .catch(function (error) {
                console.log(error);
                res.send(error);
            });

    })

    .delete(function (req, res) {
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
