'use strict';
// Практическое задание 1. Работа с корзиной.
// Рассматриваю корзину как массив объектов, представляющий список товаров,
// который создаётся на основе массива товаров _goods[],
// со следующими свойствами:
// cart = [
// { id: 1, title: 'Notebook', price: 20000, quantity: 0, total: 0, },
// { id: 2, title: 'Mouse', price: 1500, quantity: 0, total: 0, },
// { id: 3, title: 'Keyboard', price: 5000, quantity: 0, total: 0, },
// { id: 4, title: 'Gamepad', price: 4500, quantity: 0, total: 0, },
// ]
//    quantity - количество товара
//    total = quantity * price - итоговая сумма товара
// 
// и методами
// 
//    addCartList(id) - добавить количество для позиции (принимаемый шаг = 1)
//      по клику получаем id товара, и увеличиваем его quantity на 1
// 
//    removeCartList(id) - убавить количество для позиции (принимаемый шаг = 1)
//      по клику получаем id товара, и уменшаем его quantity на 1 (если quantity>0)
// 
//    sumCartList(cart) - посчитать общую сумму корзины
//      обходим по признаку quantity>0 массив cart[] и считаем amount = сумма total
// 
//    renderCartList(cart) - отобразить состояние корзины
//      выводим разметку для корзины на основании quantity>0 массива cart[]

//  Практическое задание 2. - ниже в коде

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  getHTMLString() {
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

class ProductList {
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();
  }

  _fetchGoods() {
    this._goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ];
  }

  // Практическое задание 2. Добавьте для GoodsList (у нас ProductList) метод, определяющий суммарную стоимость всех товаров.
  sumGoods() {
    return this._goods.reduce((sum, elem) => (sum + elem.price), 0);
  }

  _render() {
    for (const product of this._goods) {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

const list = new ProductList();
console.log(list.sumGoods());