describe('/customfield', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/custom-field*', { fixture: 'custom-field' }).as(
      'getAllCustomField',
    );

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
  });

  it('test', () => {
    cy.visit('/custom-field');
  });
});
