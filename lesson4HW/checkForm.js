'use strict';

class CheckForm {
    constructor() {
        this.name;
        this.phone;
        this.email;
        this.text;

        this.performCheck();
    }
    performCheck() {
        const submitForm = document.querySelector("input[type='submit']");
        submitForm.addEventListener('click', (event) => {
            event.preventDefault();
            const nameValid = this.checkName(event.target.parentElement.name);
            const phoneValid = this.checkPhone(event.target.parentElement.phone);
            const emailValid = this.checkEmail(event.target.parentElement.email);
            const textValid = this.checkText(event.target.parentElement.text);
            if (nameValid && phoneValid && emailValid && textValid) alert('Данные заполнены корректно\nМожно отправлять!');
        });
    }
    _processingCheck(targetEl, regExp, message) {
        const nameEl = targetEl.value;
        if (nameEl.match(regExp)) {
            targetEl.style.borderColor = 'green';
            return true;
        } else {
            targetEl.style.borderColor = 'red';
            alert(message);
        }
    }
    checkName(targetEl) {
        const regExp = /^[a-zа-яё ]+$/i;
        return this._processingCheck(targetEl, regExp, 'неверно указано имя');
    }
    checkPhone(targetEl) {
        const regExp = /^\+\d{1} ?\(\d{3}\) ?\d{3} ?- ?\d{4}$/i;
        return this._processingCheck(targetEl, regExp, 'укажите номер телефона в формате +7 (000) 000 - 0000');
    }
    checkEmail(targetEl) {
        const regExp = /^[a-z]+[\.|\-]?[a-z]+\@[a-z]{2,}\.[a-z]{2,}$/i;
        return this._processingCheck(targetEl, regExp, 'укажите почту в формате mymail@mail.ru или my.mail@mail.ru или my-mail@mail.ru');
    }
    checkText(targetEl) {
        const regExp = /./i;
        return this._processingCheck(targetEl, regExp, 'напишите, что вы хотите нам сообщить');
    }
}

const check = new CheckForm();