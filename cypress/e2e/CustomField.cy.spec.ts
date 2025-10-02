describe('/customfield', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/custom-field**type=specific', {
      fixture: 'custom-field-specific',
    }).as('getAllCustomFieldSpecific');
    cy.intercept('GET', '**/v2/custom-field**type=global', {
      fixture: 'custom-field-global',
    }).as('getAllCustomFieldGlobal');

    cy.intercept('GET', '**/v2/custom-field/options*', {
      fixture: 'options-custom-field',
    }).as('getOptions');
    cy.intercept('GET', '**/v2/custom-field/edit/*', {
      fixture: 'data-custom-field-by-id',
    }).as('getCustomFieldById');

    cy.intercept('POST', '**/v2/custom-field*', { statusCode: 200 });
    cy.intercept('PUT', '**/v2/custom-field/edit/*', { statusCode: 200 });
    cy.intercept('PUT', '**/v2/custom-field/bulk', { statusCode: 200 });
    cy.intercept('DELETE', '**/v2/custom-field/bulk', { statusCode: 200 });

    cy.visit('/custom-field', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError');
      },
    });
  });

  it('should have breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Global');
    });
  });

  it.only('testing all router', () => {
    cy.get('[role="menubar"]')
      .should('exist')
      .within(() => {
        cy.contains('a', 'Specific').click();
      });
    cy.get('[role="menubar"]')
      .should('exist')
      .within(() => {
        cy.contains('a', 'Global').click();
      });
  });
});
