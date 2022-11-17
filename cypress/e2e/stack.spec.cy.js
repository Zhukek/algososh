describe('stack test', () => {
  before(() => {
    cy.visit('/stack');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.get('button[type="submit"]').should('be.disabled')
  });

  it('Элемент добавляется в стек правильно', () => {
    cy.get('input').type('1');
    cy.get('button[type="submit"]').click();
    cy.get('#solution > div').as('circles');
    cy.get('@circles').should('have.length', 1);
    cy.get('@circles').last().find('div[class*="circle_changing"]');
    cy.wait(500);
    cy.get('@circles').last().find('div[class*="circle_default"]');
    cy.get('#solution .text_type_circle').last().should('have.text', 1);
    cy.get('input').type('2');
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get('#solution .text_type_circle').last().should('have.text', 2);
    cy.get('@circles').should('have.length', 2);
    cy.get('button[id="clear"]').click();
  });

  it('Кнопка "Очистить" работает корректно', () => {
    cy.get('input').type('1');
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get('input').type('2');
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get('#solution > div').as('circles');
    cy.get('@circles').should('have.length', 2);
    cy.get('button[id="clear"]').click();
    cy.get('@circles').should('not.exist');
  })

  it('Элемент удаляется из стека правильно', () => {
    cy.get('input').type('1');
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get('input').type('2');
    cy.get('button[type="submit"]').click();
    cy.get('#solution > div').as('circles');
    cy.wait(500);
    cy.get('#solution .text_type_circle').last().should('have.text', '2');
    cy.get('#solution .text_type_circle').first().should('have.text', '1');
    cy.get('@circles').should('have.length', 2);
    cy.get('button[id="delete"]').click();
    cy.wait(500);
    cy.get('#solution .text_type_circle').last().should('have.text', '1');
    cy.get('@circles').should('have.length', 1);
  });
});
