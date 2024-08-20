import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');  //Зашел на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');  //Проверяю цвет кнопки
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');  //Есть крестик 
           });


    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login);  //Ввел верный логин
         cy.get(main_page.password).type(data.password);  //Ввел верный парль
         cy.get(main_page.login_button).click();  //Нажал войти

         cy.wait(3000);

         cy.get(result_page.title).contains('Авторизация прошла успешно');  //Успешная авторизация
         cy.get(result_page.title).should('be.visible');  //Текст успешная авторизация видна
     })


       it('Верный логин и НЕверный пароль', function () {
         cy.get(main_page.email).type(data.login);  //Ввел верный логин
         cy.get(main_page.password).type('PASKHALKA');  //Ввел НЕверный парль
         cy.get(main_page.login_button).click();  //Нажал войти
         
         cy.get(result_page.title).contains('Такого логина или пароля нет');  //Проверяю текст
         cy.get(result_page.title).should('be.visible');  //Текст виден
     })


     it('НЕверный логин и верный пароль', function () {
        cy.get(main_page.email).type('paskhalka@pas.ru');  //Ввел НЕверный логин
        cy.get(main_page.password).type(data.password);  //Ввел верный пароль
        cy.get(main_page.login_button).click();  //Нажал войти
        
        cy.get(result_page.title).contains('Такого логина или пароля нет');  //Проверяю текст
        cy.get(result_page.title).should('be.visible');  //Текст виден
    })


    it('Проверка что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');  //Ввел логин без @
        cy.get(main_page.password).type(data.password);  //Ввел верный пароль
        cy.get(main_page.login_button).click();  //Нажал войти
        
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');  //Проверяю текст
        cy.get(result_page.title).should('be.visible');  //Текст виден
    })


    it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();  //Нажимаю забыли пароль
        cy.get(recovery_password_page.email).type(data.login);  //Ввел почту
        cy.get(recovery_password_page.send_button).click();  //Нажимаю отправить код
        
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');  //Проверяю текст
        cy.get(result_page.title).should('be.visible');  //Текст виден
    })


    it('Проверка приведения логина к строчным буквам', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');  //Ввел логин с заглавными буквами
        cy.get(main_page.password).type(data.password);  //Ввел верный парль
        cy.get(main_page.login_button).click();  //Нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно');  //Успешная авторизация
        cy.get(result_page.title).should('be.visible');  //Текст успешная авторизация видна
    })

 })
 

 