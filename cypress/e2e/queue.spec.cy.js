describe('queue test', () => {
  before(() => {
    cy.visit('/queue');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.get('button[type="submit"]').should('be.disabled')
  });

  it('Элемент добавляется в очередь правильно', () => {
    const nums = [1,2,3,4,5,6,7];
    cy.get('#solution > div').as('circles');
    nums.forEach((num, index) => {
      cy.get('input').type(num);
      cy.get('button[type="submit"]').click();
      cy.get('@circles').eq(index).find('div[class*="circle_changing"]');
      cy.wait(500);
      cy.get('@circles').eq(index).find('div[class*="circle_default"]');
    })
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('@circles')
      .each((el,index) => {
        cy.get(el).find('.text_type_circle').should('have.text', nums[index]);

        if(index === 0) {
          cy.get(el).find('.text_type_input').eq(0).should('have.text', 'head');
        } else if(index === 7) {
          cy.get(el).find('.text_type_input').eq(2).should('have.text', 'tail');
        }
      })
    cy.get('button[id="clear"]').click();
  });

  it('Кнопка "Очистить" работает корректно', () => {
    const nums = [1,2,3,4];
    cy.get('#solution > div').as('circles');
    nums.forEach(num => {
      cy.get('input').type(num);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
    });
    cy.get('button[id="clear"]').click();
    cy.get('@circles')
      .each(el => {
        cy.get(el).find('.text_type_circle').should('have.text', '');
      })
  })

  it('Элемент удаляется из очереди правильно', () => {
    const nums = [1,2,3,4];
    cy.get('#solution > div').as('circles');
    nums.forEach(num => {
      cy.get('input').type(num);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
    });
    cy.get('button[id="delete"]').click();
    cy.wait(500);
    cy.get('@circles')
      .each((el, index) => {
        if(index < 1 || index > 3) {
          cy.get(el).find('.text_type_circle').should('have.text', '');
        } else if (index === 1) {
          cy.get(el).find('.text_type_input').eq(0).should('have.text', 'head');
          cy.get(el).find('.text_type_circle').should('have.text', nums[index]);
        } else if(index === 3) {
          cy.get(el).find('.text_type_input').eq(2).should('have.text', 'tail');
          cy.get(el).find('.text_type_circle').should('have.text', nums[index]);
        } else {
          cy.get(el).find('.text_type_circle').should('have.text', nums[index]);
        }
      })
  });
});
