import * as data from "../helpers_pokemons/data.json"
import * as avatar from "../locators_pokemons/avatar.json"


describe('end to end', function () {

    it('Покупка аватара', function () {
        cy.visit('https://pokemonbattle.ru/login/');  //Зашел на сайт 
        cy.wait(1000);
        cy.get(avatar.email).type(data.login);  //Ввел верный логин
        cy.get(avatar.password).type(data.password);  //Ввел верный пароль
        cy.get(avatar.button).click();  //нажимаю войти
        cy.wait(2000);
  
        cy.get(avatar.id_trainers).click({ force: true });  //нажимаю перейти к своему тренеру
        cy.wait(2000);
        cy.get('[href="/shop"]').click();  //нажимаю смена аватара
        cy.get('.available > button').first().click({ force: true });  //выбираю аватар

        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996'); //ввожу номер карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');  //ввожу срок действия карты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');  //ввожу код карты
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('NAME');  //ввожу имя владельца карты
        cy.get('.pay-btn').click();  //нажимаю оплатить

        cy.get('#cardnumber').type('56456');  //ввожу код из пуша
        cy.get('.payment__submit-button').click();  //нажимаю отправить

        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); //Успех

     })
})