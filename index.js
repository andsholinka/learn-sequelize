const express = require('express');
const app = express();

const db = require("./config/db");
const User = require('./models/user');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("respon nodejs berhasil");
});

db.authenticate().then(() => console.log("Connection to db success"));

app.post('/user', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save();

        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get('/user', async (req, res) => {
    try {
        const getAllUser = await User.findAll({})
        res.json(getAllUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const getUser = await User.findOne({
            where: {
                id: id
            }
        });

        res.json(getUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.put('/user/:id', async (req, res) => {
    try {

        const {
            username,
            email,
            password
        } = req.body;
        const id = req.params.id

        const updateUser = await User.update({
            username,
            email,
            password
        }, {
            where: {
                id: id
            }
        })

        await updateUser;

        res.json("Updated");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const deletUser = await User.destroy({
            where: {
                id: id
            }
        })

        await deletUser;

        res.json(("Berhasil hapus data"));
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.listen(7000, () => {
    console.log(`Server started on 7000`);
});