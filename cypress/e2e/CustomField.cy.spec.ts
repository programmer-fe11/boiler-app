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
  });

  it('test', () => {
    cy.visit('/custom-field');
  });
  it('should have breadcrumb', () => {
    cy.visit('/custom-field/global');
    cy.visit('/custom-field/specific');
  });
});
