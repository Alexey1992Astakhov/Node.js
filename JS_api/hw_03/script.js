// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.
// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочем then.


const ACCESS_KEY = "b081FEgpLH4ZJj_2uyhbhY-W-HPsNBweuKM7AattHpk";
const likeCountEl = document.getElementById('likeCount');
const likeBtnEl = document.getElementById('likeBtn');
const prevBtnEl = document.getElementById('prevBtn');
let liked = false;
let likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
let history = JSON.parse(localStorage.getItem('history')) || [];

async function getRandomImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`);
        const data = await response.json();
        const imageUrl = data.urls.regular;
        const photographerName = data.user.name;
        const photographerUserName = data.user.username;

        document.getElementById('image').src = imageUrl;
        document.getElementById('photographer').textContent = `Фотограф: ${photographerName} (@${photographerUserName})`;

        // Проверяем, понравилось ли изображение
        liked = likedImages.includes(imageUrl);
        updateLikeButton();

        // Добавляем изображение в историю
        history.unshift({imageUrl, photographerName});
        localStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
        console.error('Error fetching random image:', error);
    }
}

function updateLikeButton() {
    likeBtnEl.textContent = liked ? '💔' : '❤️';
}

likeBtnEl.addEventListener('click', () => {
    liked = !liked;
    updateLikeButton();
    if (liked) {
        likeCountEl.textContent = parseInt(likeCountEl.textContent) + 1;
        likedImages.push(document.getElementById('image').src);
    } else {
        likeCountEl.textContent = parseInt(likeCountEl.textContent) - 1;
        likedImages = likedImages.filter(image => image !== document.getElementById('image').src);       
    }
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
});

prevBtnEl.addEventListener('click', () => {
    if (history.length > 1) {
        history.shift();
        const prevImage = history[0];
        document.getElementById('image').src = prevImage.imageUrl;
        document.getElementById('photographer').textContent = `Фотограф: ${prevImage.photographerName}`;
    } else {
        alert('No previous images');
    }
});

window.onload = getRandomImage;