var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
    console.log(req.body);
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    })
});

// GET /todos to read todos or todos/2423234234 to get specific todo 
app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    // res.send(req.params)
    if (!ObjectID.isValid(id)) {
        res.status(404).send('Id is not valid');
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(400).send());
})

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};