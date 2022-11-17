describe('app & routing', () => {
  before(() => {
    cy.visit('/');
  });

  it('should run', () => {
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ')
  });

  it('has 6 algorithm', () => {
    cy.get('a').should('have.length', 6)
  })

  it('string routing', () => {
    cy.get('a[href*="/recursion"]').click();
    cy.location('pathname').should('eq', '/recursion');
    cy.get('a[href="/"]').click();
  });

  it('fibonacci routing', () => {
    cy.get('a[href*="/fibonacci"]').click();
    cy.location('pathname').should('eq', '/fibonacci');
    cy.get('a[href="/"]').click();
  });

  it('sorting routing', () => {
    cy.get('a[href*="/sorting"]').click();
    cy.location('pathname').should('eq', '/sorting');
    cy.get('a[href="/"]').click();
  });

  it('stack routing', () => {
    cy.get('a[href*="/stack"]').click();
    cy.location('pathname').should('eq', '/stack');
    cy.get('a[href="/"]').click();
  });

  it('queue routing', () => {
    cy.get('a[href*="/queue"]').click();
    cy.location('pathname').should('eq', '/queue');
    cy.get('a[href="/"]').click();
  });

  it('list routing', () => {
    cy.get('a[href*="/list"]').click();
    cy.location('pathname').should('eq', '/list');
    cy.get('a[href="/"]').click();
  });
});