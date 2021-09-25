'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') { // img = './img/img.jpg'
      this.title = product.product_name;
      this.price = product.price;
      this.id = product.id_product;
      this.img = img;
  }

  getHTMLProductString() {
      return `<div class="product-item" data-id="${this.id}">
            <img src="${this.img}" alt="Some img">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                <button class="buy-btn">Купить</button>
            </div>
        </div>`;
  }
}

class BasketItem extends ProductItem {
  constructor(basket, amount, countGoods, quantity, img='https://via.placeholder.com/100x75') {
    super(basket, img);
    this.amount = amount;
    this.countGoods = countGoods;
    this.quantity = basket.quantity;
  }

  getHTMLBasketString() {
    return `<div class="cart-item" data-id="${this.id}">
                <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${this.title}</p>
                <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} за ед.</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.quantity * this.price} ₽</p>
                <button class="del-btn" data-id="${this.id}">&times;</button>
            </div>
            </div>`;
  }
}

class ProductList {
    constructor(container = '.products', pathProduct = 'catalogData.json') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._allProducts = [];
        this.pathProduct = pathProduct;

        this._makeRequest().then((data) => {
            this._goods = data;
            this._render();
        });
    }

    sum() {
        return this._goods.reduce(function (sum, good) {
            return sum + good.price;
        }, 0);
    }

    _makeRequest() {
      return fetch(`${API}/${this.pathProduct}`)
          .then(response => response.json())
          .catch((error) => {
            console.log(error)
          });
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLProductString());
        }
    }
}

class BasketList extends ProductList {
  constructor(container = '.basket', pathProduct = 'getBasket.json') {
    super(container, pathProduct);
    this._basket = [];

    this._makeRequest().then((data) => {
      this._basket = data.contents;
      this.amount = data.amount;
      this.countGoods = data.countGoods;
      this._render();
    });

    this.toggleBasket();
    this.clickButton('.products', 'buy-btn', 'add');
    this.clickButton('.basket', 'del-btn', 'del');
  }

  clickButton(targetContainer, targetClass, action) {
    let buttonPurchase = document.querySelector(targetContainer);
    buttonPurchase.addEventListener('click', (e) => {
      if (e.target.classList == targetClass) {
        this.changeBasket(e.target.parentNode.parentNode.dataset.id, action);
      }
    });
  }

  changeBasket(id, action) {
    for(const product of this._basket) {
      if(product.id_product == id) {
        switch (action) {
          case 'add':
            fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .then((data) => {
              if (data.result == 1) {
                product.quantity++;
                this._render();
              }
            })
            .catch((error) => {
              console.log(error)
            });
            break;
          case 'del':
            fetch(`${API}/deleteFromBasket.json`)
            .then(response => response.json())
            .then((data) => {
              if (data.result == 1) {
                product.quantity--;
                this._render();
              }
            })
            .catch((error) => {
              console.log(error)
            });
            break;
        }
      }
    }
  }

  toggleBasket() {
    let buttonBasket = document.querySelector('.btn-cart');
    buttonBasket.addEventListener('click', (e) => {
        e.target.nextElementSibling.classList.toggle('show-basket');
    });
  }

  _render() {
    let counter = 0;
    this.container.innerHTML = '';
    for (const product of this._basket) {
        const productObject = new BasketItem(product);
        this._allProducts.push(productObject);
        if(product.quantity <= 0) continue;
        this.container.insertAdjacentHTML('beforeend', productObject.getHTMLBasketString());
        counter++;
    }
    if(!counter) 
        this.container.insertAdjacentHTML('beforeend', '<p>корзина пуста</p>');
  }
}

new ProductList();
new BasketList();