'use strict';
const products = [
    { id: 1, title: 'Notebook', price: 1000 },
    { id: 2, title: 'Mouse', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (title = 'Наименование', price = 'Цена', image = 'http://unsplash.it/150/200') => `<div class="product-item">
                            <h3>${title}</h3>
                            <img src="${image}" width="150" height="200">
                            <p>${price}</p>
                            <button class="by-btn">Добавить</button>
                          </div>`;

const renderProducts = (list) => {
    // const productList = list.map((item) => renderProduct(item.title, item.price));
    let productList = '';
    list.forEach(item => productList += renderProduct(item.title, item.price));

    // document.querySelector('.products').innerHTML = productList.join('');
    document.querySelector('.products').innerHTML = productList;
}

renderProducts(products);