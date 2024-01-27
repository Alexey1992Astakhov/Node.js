const express = require("express");
const fs = require("fs");
const path = require("path");
const { checkParams } = require("./validation/validator");
const { idScheme } = require("./validation/scheme");
const pathToDB = path.join(__dirname, 'users.json');
// const { checkBody, checkParams } = require('./validation/validator');
// const { idScheme, userScheme } = require('./validation/scheme');

const app = express();
let uniqueID = 1;
const users = [];

app.use(express.json());

/**
 * Получить всех пользователей
 */
app.get('/users', (req, res) => {
    res.send(fs.readFileSync(pathToDB));
})

/**
 * Получить определенного пользователя
 */
app.get('/users/:id',(req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToDB));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});

/**
 * Создание нового пользователя
 */

app.post('/users',(req, res) => {
    uniqueID += 1;
    const users = JSON.parse(fs.readFileSync(pathToDB));
    users.push({
        id: uniqueID,
        ...req.body
    });
    fs.writeFileSync(pathToDB, JSON.stringify(users, null , 2));
    res.send({
        id: uniqueID,
    });
});

/**
 * Обновить данные пользователя
 */

app.put('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToDB));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        fs.writeFileSync(pathToDB, JSON.stringify(users, null , 2));

        res.send({user});
    } else {
        res.status(404);
        res.send({user: null})
    }
});

/**
 * Удаление пользователя
 */

app.delete('/users/:id',(req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToDB));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync(pathToDB, JSON.stringify(users, null , 2));
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});

/** 
 * Обработка несуществующих роутов
 */
app.use((req, res) => {
    res.status(404).send({message: 'URL not found!'})
});

app.listen(3000);