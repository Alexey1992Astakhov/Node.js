const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    
    const pathToFileHome = path.join(__dirname, "userCountHomeJson.json");
    const userCountHomeData = JSON.parse(fs.readFileSync(pathToFileHome, 'utf-8'));

    userCountHomeData.count = userCountHomeData.count + 1;

    fs.writeFileSync(pathToFileHome, JSON.stringify(userCountHomeData, null, 2));

    res.send(`<h1>Home page</h1><p>Visiting page ${userCountHomeData.count}</p><a href="/about">Link to the About page</a>`);
});

app.get('/about', (req, res) => {

    const pathToFileAbout = path.join(__dirname, "userCountAboutJson.json");
    const userCountAboutData = JSON.parse(fs.readFileSync(pathToFileAbout, 'utf-8'));

    userCountAboutData.count = userCountAboutData.count + 1;

    fs.writeFileSync(pathToFileAbout, JSON.stringify(userCountAboutData, null, 2));

    res.send(`<h1>About page</h1><p>Visiting page: ${userCountAboutData.count}</p><a href="/">Link to the Home page</a>`);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});