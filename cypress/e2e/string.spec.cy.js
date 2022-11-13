const STRING = 'abcde'

describe('recursion test', () => {
  before(() => {
    cy.visit('/recursion');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.get('button[type="submit"]').should('be.disabled')
  });

  it('Cтрока разворачивается корректно', () => {
    cy.get('input').type(STRING);
    cy.get('button[type="submit"]').click();
    cy.get('div[id="solution"] > div').as('circles');
    cy.get('@circles').should('have.length', 5);
    cy.wait(1000);
    cy.get('@circles')
      .each((el, index) => {
        cy.get(el).should('have.text', STRING[index]);

        if (index === 0 || index=== 4) {
          cy.get(el).find('div[class*="circle_changing"]');
        } else {
          cy.get(el).find('div[class*="circle_default"]');
        }
      });
    cy.wait(5000);
    cy.get('@circles')
      .each((el, index) => {
        cy.get(el)
          .should('have.text', STRING[STRING.length - index - 1])
          .find('div[class*="circle_modified"]');
      })
  })
})