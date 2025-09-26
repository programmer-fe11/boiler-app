describe('/customfield', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/custom-field*', { fixture: 'custom-field' }).as(
      'getAllCustomField',
    );
  });

  it('test', () => {
    cy.visit('/custom-field');
  });
});
