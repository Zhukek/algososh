describe('fibonacci test', () => {
  before(() => {
    cy.visit('/fibonacci');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.get('button[type="submit"]').should('be.disabled')
  });

  it('Числа генерируются корректно', () => {
    cy.get('input').type(8);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.get('div[id="solution"] .text_type_circle').first().should('have.text', 1);
    cy.get('div[id="solution"] .text_type_circle').last().should('have.text', 34);
  });
});
