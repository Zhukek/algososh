const { wait } = require("@testing-library/user-event/dist/utils");

describe('list test', () => {
  before(() => {
    cy.visit('/list');
  })
  beforeEach(() => {
    cy.get('#solution > div').as('circles');
    cy.get('input[id="text"]').as('text');
    cy.get('input[id="index"]').as('index');
    cy.get('button[id="prepend"]').as('prepend');
    cy.get('button[id="append"]').as('append');
    cy.get('button[id="deleteHead"]').as('deleteHead');
    cy.get('button[id="deleteTail"]').as('deleteTail');
    cy.get('button[id="addByIndex"]').as('addByIndex');
    cy.get('button[id="deleteByIndex"]').as('deleteByIndex');
  });

  it('Если в инпутах пусто, то кнопки добавления/удаления по индексу недоступны', () => {
    cy.get('@text').clear();
    cy.get('@index').clear();
    cy.get('@prepend').should('be.disabled');
    cy.get('@append').should('be.disabled');
    cy.get('@addByIndex').should('be.disabled');
    cy.get('@deleteByIndex').should('be.disabled');
  });

  it('Отрисовка дефолтного списка', () => {
    cy.get('@circles').should('exist');
  });

  it('Добавление элемента в head', () => {
    cy.get('@text').type('head');
    cy.get('@prepend').click();
    cy.wait(1000);
    cy.get('#solution > div').first().find('.text_type_circle').should('have.text','head');
  });

  it('Добавление элемента в tail', () => {
    cy.get('@text').type('tail');
    cy.get('@append').click();
    cy.wait(1000);
    cy.get('#solution > div').last().find('.text_type_circle').should('have.text','tail');
  });

  it('Удаление элемента из head', () => {
    cy.get('@circles').eq(1).find('.text_type_circle')
      .then(($circle) => {
        const text = $circle.text();

        cy.get('@deleteHead').click();
        cy.wait(1000);
        cy.get('#solution > div').first().find('.text_type_circle').should('have.text', text)
      })
  });

  it('Удаление элемента из tail', () => {
    cy.get('@circles').eq(-2).find('.text_type_circle')
      .then(($circle) => {
        const text = $circle.text();

        cy.get('@deleteTail').click();
        cy.wait(1000);
        cy.get('#solution > div').last().find('.text_type_circle').should('have.text', text)
      })
  });

  it('Добавление элемента по индексу', () => {
    cy.get('@text').type('new');
    cy.get('@index').type('1');
    cy.get('@circles').first().find('.text_type_circle')
      .then(($circleFirst) => {
        const textFirst = $circleFirst.text();

        cy.get('@circles').eq(1).find('.text_type_circle')
          .then(($circleSecond) => {
            const textSecond = $circleSecond.text();
            cy.get('@addByIndex').click();
            cy.wait(3000);
            cy.get('#solution > div').first().find('.text_type_circle').should('have.text', textFirst);
            cy.get('#solution > div').eq(1).find('.text_type_circle').should('have.text', 'new');
            cy.get('#solution > div').eq(2).find('.text_type_circle').should('have.text', textSecond);
          });
      });
  });

  it('Удаление элемента по индексу', () => {
    cy.get('@index').type('1');
    cy.get('@circles').first().find('.text_type_circle')
      .then(($circleFirst) => {
        const textFirst = $circleFirst.text();

        cy.get('@circles').eq(2).find('.text_type_circle')
          .then(($circleThird) => {
            const textThird = $circleThird.text();
            cy.get('@deleteByIndex').click();
            cy.wait(3000);
            cy.get('#solution > div').first().find('.text_type_circle').should('have.text', textFirst);
            cy.get('#solution > div').eq(1).find('.text_type_circle').should('have.text', textThird);
          });
      });
  });
});
