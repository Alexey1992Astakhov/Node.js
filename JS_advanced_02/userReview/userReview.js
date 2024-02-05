const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

// Переменные для выбора элементов DOM
let container = document.querySelector('.review-container');
const productInput = document.querySelector('#product');
const reviewInput = document.querySelector('#review');
let errorMsg = document.querySelector('.error');
const button = document.querySelector('#send');

function renderData() {
    initialData.forEach(element => {
        // Создаем элементы для каждого отзыва в цикле
        let reviewBox = document.createElement('div');
        let product = document.createElement('h3');
        let review = document.createElement('p');

        // Устанавливаем текст из данных
        product.textContent = element.product;
        review.textContent = element.reviews[0].text;

        // Добавляем элементы в блок отзыва
        reviewBox.appendChild(product);
        reviewBox.appendChild(review);

        // Добавляем блок отзыва в контейнер
        container.appendChild(reviewBox);
    });
}

button.addEventListener('click', () => {
    try {
        // Проверяем длину отзыва
        if (reviewInput.value.length < 50 || reviewInput.value.length > 500) {
            throw new Error('Длина отзыва должна быть не менее 50 символов и не более 500 символов');
        }

        // Создаем элементы для нового отзыва
        let reviewBox = document.createElement('div');
        let product = document.createElement('h3');
        let review = document.createElement('p');

        // Устанавливаем текст из введенных данных
        product.textContent = productInput.value;
        review.textContent = reviewInput.value;

        // Добавляем элементы в блок отзыва
        reviewBox.appendChild(product);
        reviewBox.appendChild(review);

        // Добавляем блок отзыва в контейнер
        container.appendChild(reviewBox);

        // Очищаем поле ввода отзыва
        productInput.value = '';
        reviewInput.value = '';

    } catch (error) {
        // Выводим сообщение об ошибке
        errorMsg.textContent = error.message;
    }
});

// Вызываем функцию для отображения начальных данных
renderData();