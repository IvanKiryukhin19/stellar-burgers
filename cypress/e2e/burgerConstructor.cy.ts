import * as authData from '../fixtures/authData.json';
import * as orderData from '../fixtures/orderData.json';

const bunIngredient='Краторная булка N-200i';
const mainIngredient='Филе Люминесцентного тетраодонтимформа';
const orderIngredient='Биокотлета из марсианской Магнолии';
const sauceIngredient='Соус Spicy-X';

describe('Интеграционные тесты для конструктора бургера', ()=> {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  
  describe('Добавление ингредиентов',()=>{
    it('добавление булки, основного ингредиента и соуса', ()=> {
    
      cy.get(`[data-cy=Булки]`)
        .contains(bunIngredient).next()
        .contains('button','Добавить')
        .click();

      cy.get(`[data-cy=Начинки]`)
        .contains(mainIngredient).next()
        .contains('button','Добавить')
        .click();

      cy.get(`[data-cy=Соусы]`)
        .contains(sauceIngredient).next()
        .contains('button','Добавить')
        .click();

      cy.get('.constructor-element_pos_top > .constructor-element__row > .constructor-element__text')
        .should('have.text', `${bunIngredient} (верх)`);
    
      cy.get('.constructor-element > .constructor-element__row > .constructor-element__text').eq(1)
        .should('have.text', `${mainIngredient}`);

      cy.get('.constructor-element > .constructor-element__row > .constructor-element__text').eq(2)
        .should('have.text', `${sauceIngredient}`);

      cy.get('.constructor-element_pos_bottom > .constructor-element__row > .constructor-element__text')
        .should('have.text', `${bunIngredient} (низ)`);
    });
  });

  describe('тестирование модальных окон',()=>{
    it('открытие модального окна',()=>{
      cy.get(`[data-cy=Булки]`)
        .contains(bunIngredient).click();

      cy.get(`[data-cy=title_ingredient]`).should('have.text', bunIngredient);
    });

    it('закрытие модального окна по крестику',()=>{
      cy.get(`[data-cy=Начинки]`)
        .contains(mainIngredient).click();

      cy.get(`[data-cy=close_modal]`).click();

      cy.get('#modals').contains(`${mainIngredient}`).should('not.exist');
    });

    it('закрытие модального окна по оверлею',()=>{
      cy.get(`[data-cy=Соусы]`)
        .contains(sauceIngredient).click();

        cy.get(`[data-cy=overlay]`).click({ force: true });
      cy.get('#modals').contains(`${sauceIngredient}`).should('not.exist');
    });
  });

  describe('создание заказа',()=>{
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
      cy.setCookie('accessToken', authData.accessToken);
      localStorage.setItem('refreshToken', authData.refreshToken);
      cy.intercept('GET', 'api/auth/tokens', {fixture: 'authData.json'});
      cy.intercept('POST', 'api/orders', { fixture: 'orderData.json' });
    });

    it('тест создание заказа',()=>{
      cy.get(`[data-cy=Булки]`)
        .contains(bunIngredient).next()
        .contains('button','Добавить')
        .click();

      cy.get(`[data-cy=Начинки]`)
        .contains(mainIngredient).next()
        .contains('button','Добавить')
        .click();

      cy.get(`[data-cy=Соусы]`)
        .contains(sauceIngredient).next()
        .contains('button','Добавить')
        .click();

      cy.get('button').contains('Оформить заказ').click();

      cy.get(`[data-cy=order_number]`).should('have.text', orderData.order.number);

      cy.get(`[data-cy=close_modal]`).click();

      cy.get('#modals').contains(`${orderData.order.number}`).should('not.exist');

      cy.get(`[data-cy=choose_bun_top]`).should('have.text', 'Выберите булки');
      cy.get(`[data-cy=choose_bun_bottom]`).should('have.text', 'Выберите булки');
      cy.get(`[data-cy=choose_ingredient]`).should('have.text', 'Выберите начинку');
    });
    
    afterEach(() => {
        cy.clearAllCookies();
        localStorage.removeItem('refreshToken');
      });
  });
});