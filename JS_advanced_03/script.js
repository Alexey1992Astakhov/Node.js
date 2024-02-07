let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

let reviewList = document.querySelector('.reviews-box');
let productNameInput = document.getElementById('productName');
let productReviewInput = document.getElementById('productReview');
let addButton = document.querySelector('.btn');

const updateReviewList = () => {
    reviewList.innerHTML = '';

    reviews.forEach((item, index) => {
        let listItem = document.createElement('div')
        let listProduct = document.createElement('h3');
        let listReview = document.createElement('p');
        let deleteButton = document.createElement('button');

        listProduct.textContent = item.product;
        listReview.textContent = item.review;
        deleteButton.textContent = '×';

        deleteButton.addEventListener('click', () => {
            reviews.splice(index, 1);
            updateReviewList();
        })

        listItem.appendChild(listProduct);
        listItem.appendChild(listReview);
        listItem.appendChild(deleteButton);
        listItem.setAttribute('class', 'review-item');
        reviewList.appendChild(listItem);

        // Добавляем обработчик клика на название продукта для отображения отзывов по нему

        listProduct.addEventListener('click', () => {
            const productReviews = reviews.filter(review => review.product === item.product);
            alert(`Отзывы по продукту "${item.product}":\n${productReviews.map(review => review.review).join('\n')}`);
        });
    });

    localStorage.setItem('reviews', JSON.stringify(reviews));
}

addButton.addEventListener('click', (event) => {
    event.preventDefault();

    const newItem = {
        product: productNameInput.value.trim(),
        review: productReviewInput.value.trim()
    }

    if (newItem.product !== '' && newItem.review !== '') {
        reviews.push(newItem);
        productNameInput.value = '';
        productReviewInput.value = '';
        updateReviewList();
    }
});

updateReviewList();