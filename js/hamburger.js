'use strict';

// Некая сеть фастфуда предлагает несколько видов гамбургеров:
// a.Маленький(50 рублей, 20 калорий).
//     b.Большой(100 рублей, 40 калорий).
// Гамбургер может быть с одним из нескольких видов начинок(обязательно):
// a.С сыром(+10 рублей, +20 калорий).
// b.С салатом(+20 рублей, +5 калорий).
// c.С картофелем(+15 рублей, +10 калорий).
// Дополнительно гамбургер можно посыпать приправой(+15 рублей, +0 калорий) и полить
// майонезом(+20 рублей, +5 калорий).
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.

/*
1.  Нам надо создать интерфейс пользователя для выбора какого-то конкретного вида гамбургера
с начинкой и с возможной добавкой. Для этого у нас есть варианты, которые мы можем предоставить.
Сейчас неважно откуда они поступят, но для их описания есть три объекта:
burgerList - маленький, большой (обязательный)
stuffingList - сыр, салат, картофель (обязательный)
supplementList - приправа, майонез (не обязательный, доступен выбор как одного, так и двух вариантов).
2. После совершения выбора пользователем на вход получаем тип гамбургера(burger), вид начинки (stuffing) и добавку (supplement[])
3. Вычисляем значения.
4. Калории по аналогии.
*/

class Hamburger {
    constructor(burger, stuffing, supplement = []) {
        this.burger = burger;
        this.stuffing = stuffing;
        this.supplement = supplement;

        this._fetchHamburgers();
    }
    calculatePrice() { // Узнать стоимость
        const burger = this.burgerList[this.burger].price;
        const stuffing = this.stuffingList[this.stuffing].price;
        let supplement = 0;
        for (const iterator of this.supplement) {
            supplement += this.supplementList[iterator].price;
        }
        return burger + stuffing + supplement;
    }
    calculateCalories() { // Узнать калорийность
        const burger = this.burgerList[this.burger].ccal;
        const stuffing = this.stuffingList[this.stuffing].ccal;
        let supplement = 0;
        for (const iterator of this.supplement) {
            supplement += this.supplementList[iterator].ccal;
        }
        return burger + stuffing + supplement;
    }

    _fetchHamburgers() {
        this.burgerList = {
            small: { price: 50, ccal: 20, },
            large: { price: 100, ccal: 40, },
        };
        this.stuffingList = {
            cheese: { price: 10, ccal: 20, },
            salad: { price: 20, ccal: 5 },
            potato: { price: 15, ccal: 10, },
        };
        this.supplementList = {
            spice: { price: 15, ccal: 0, },
            mayo: { price: 20, ccal: 5, },
        }
    }
}

const hamburger1 = new Hamburger('small', 'salad', ['spice', 'mayo']);
console.log(`цена = ${hamburger1.calculatePrice()}`);
console.log(`калории = ${hamburger1.calculateCalories()}`);

const hamburger2 = new Hamburger('large', 'potato', ['mayo']);
console.log(`цена = ${hamburger2.calculatePrice()}`);
console.log(`калории = ${hamburger2.calculateCalories()}`);

const hamburger3 = new Hamburger('small', 'salad');
console.log(`цена = ${hamburger3.calculatePrice()}`);
console.log(`калории = ${hamburger3.calculateCalories()}`);