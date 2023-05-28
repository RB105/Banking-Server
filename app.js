const express = require('express');

const app = express();

const HOST = '192.168.1.85';
const PORT = 3000;

app.use(express.json());

var users = [];
app.post('/auth', (req, res) => {
    var isRegistered = false;
    for (let index = 0; index < users.length; index++) {
        if (users[index]['phone'] === req.body.phone) {
            isRegistered = true;
            res.send({
                "status": false,
                "message": "This phone number already in use"
            })
        } else {
            isRegistered = false;
        }

    }
    if (!isRegistered) {
        users.push(req.body);
        res.status(201).send({
            "status": true,
            "message": "User successfully registered"
        });
    }
});

app.get('/users', (req, res) => {
    res.status(200).send(users);
});
app.post('/users', (req, res) => {
    var isExist = false;
    for (let index = 0; index < users.length; index++) {
        if (users[index]['password'] === req.body.password && users[index]['phone'] === req.body.phone) {
            res.send({
                "status": true,
                "message": "User exists"
            });
        }
        else {
            isExist = false;
        }
    }
    if (!isExist) {
        res.send({
            "status": false,
            "message": "User not found"
        });
    }
});


var cards = [];
app.post('/card/add', (req, res) => {
    var isCardRegisterd = false;
    for (let index = 0; index < cards.length; index++) {
        if (cards[index]['number'] === req.body.number) {
            isCardRegisterd = true;
        }
        else {
            isCardRegisterd = false;
        }
    }
    if (isCardRegisterd) {
        res.send({
            "status": false,
            "message": "This card already in use"
        })
    } else {
        cards.push(req.body);
        res.status(201).send({
            "status": true,
            "message": "Card successfully registered"
        });
    }
});

app.get('/card/get', (req, res) => {
    res.status(200).send(cards);
});

app.listen(PORT, HOST, (req, res) => {
    console.log(`http://${HOST}:${PORT}`)
});