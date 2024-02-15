// Задача 1. Дан массив товаров:

productsData = [
    {
        id: 1,
        name: "Ноутбук",
        category: "Электроника",
    },
    {
        id: 2,
        name: "Смартфон",
        category: "Электроника",
    },
    {
        id: 3,
        name: "Кофемашина",
        category: "Бытовая техника",
    },
    {
        id: 4,
        name: "Фотокамера",
        category: "Электроника",
    },
    {
        id: 5,
        name: "Микроволновая печь",
        category: "Бытовая техника",
    },
    {
        id: 6,
        name: "Книга",
        category: "Книги",
    },
    {
        id: 7,
        name: "Футболка",
        category: "Одежда",
    },
    {
        id: 8,
        name: "Шапка",
        category: "Одежда",
    },
    {
        id: 9,
        name: "Стул",
        category: "Мебель",
    },
    {
        id: 10,
        name: "Стол",
        category: "Мебель",
    },
];

// Вы разрабатываете интернет-магазин и хотите добавить
// функциональность динамической фильтрации товаров по
// категориям. У вас есть форма с выпадающим списком (select), в
// котором пользователь может выбрать категорию товаров,
//     значения необходимо сформировать исходя их имеющихся товаров.
//     При выборе категории товаров, необходимо динамически обновлять
// список отображаемых товаров на странице, чтобы пользователь
// видел только товары из выбранной категории.
// 1. Создайте интерфейс веб-страницы, который включает в себя
// следующие элементы:
//     a. Выпадающий список (select) с категориями товаров.
//     b. Список товаров, который будет отображать товары в
// соответствии с выбранной категорией.
//     c. Каждый товар в списке должен содержать название и
// категорию.
//
//     При выборе категории товаров в выпадающем списке, форма
// должна следить за изменениями.
//     Динамически обновляйте список товаров на странице, чтобы
// отображать только товары из выбранной категории.
//     Стилизуйте элементы интерфейса с помощью CSS для улучшения
// внешнего вида.

const selectEl = document.querySelector("select");
const ulEl = document.querySelector(".list-product");

selectEl.addEventListener("change", function (event) {
    const category = event.target.value;
    ulEl.innerHTML = productsData
        .filter(product => product.category === category)
        .map(product => `<li><p>${product.name}</p><p>${product.category}</p></li>`)
        .join("");

})