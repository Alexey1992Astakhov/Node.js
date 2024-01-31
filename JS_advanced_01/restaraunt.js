// Повара и их специализации
const cookSpecialization = new Map([
    ['Виктор', 'Пицца'],
    ['Ольга', 'Суши'],
    ['Дмитрий', 'Десерты']
]);

// Блюда и их повара
const cooksDish = new Map([
    ['Пицца "Маргарита"', 'Виктор'],
    ['Пицца "Пепперони"', 'Виктор'],
    ['Суши "Филадельфия"', 'Ольга'],
    ['Суши "Калифорния"', 'Ольга'],
    ['Тирамису', 'Дмитрий'],
    ['Чизкейк', 'Дмитрий']
]);

// Заказы клиентов
const orders = new Map();

// Заказ клиента по имени Алексей
const orderAlexey = new Map([
    ['Пицца "Пепперони"', 1],
    ['Тирамису', 1]
]);
orders.set({ name: 'Алексей'}, orderAlexey);

// Заказ клиента по имени Мария
const orderMaria = new Map([
    ['Суши "Калифорния"', 1],
    ['Пицца "Маргарита"', 1]
]);
orders.set({ name: 'Мария'}, orderMaria);

// Заказ клиента по имени Ирина
const orderIrina = new Map([
    ['Чизкейк', 1]
]);
orders.set({ name: 'Дмитрий'}, orderIrina);

// Выводим информацию о каждом заказе
orders.forEach((order, client) => {
    console.log(`${client.name} заказал(а):`);
    order.forEach((quantity, dish) => {
        const cook = cooksDish.get(dish);
        console.log(`${dish} (${cookSpecialization.get(cook)}) - Повар: ${cook}`);
    });
    console.log();
});

