const http = require("http");
let counter = 0;
let counterAbout = 0;
let counter404 = 0;

const server = http.createServer((req, res) => {
  console.log("Запрос получен");

  if (req.url === "/") {
    ++counter;
    res.writeHead(200, {
      "Content-type": "text/html; charset=UTF-8",
    });
    res.end(
      `<h1>Welcome to the home page</h1><br><p>You have been here ${counter} times</p><br><a href="http://127.0.0.1:3000/about">Go to about page →</a>`
    );
  } else if (req.url === "/about") {
    ++counterAbout;
    res.writeHead(200, {
      "Content-type": "text/html; charset=UTF-8",
    });
    res.end(
      `<h1>About page</h1><br><p>You have been here ${counterAbout} times</p><br><a href="http://127.0.0.1:3000/">Go to home page →</a>`
    );
  } else {
    ++counter404;
    res.writeHead(404, {
      "Content-type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>404 not found</h1><br><p>You have been here ${counter404} times</p>`);
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});