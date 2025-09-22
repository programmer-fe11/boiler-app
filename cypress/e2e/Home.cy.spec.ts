describe('/home', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.intercept('GET', '**/v2/asset*', { fixture: 'data-asset' });
    cy.intercept('GET', '**/v2/assets/detail/*', { fixture: 'detail-asset' });
    cy.intercept('GET', '**/v2/assets/options*', { fixture: 'options-asset' });
    cy.intercept('POST', '**/v2/assets*', { statusCode: 200 });
    cy.intercept('PUT', '**/v2/assets/*', { statusCode: 200 });
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Home');
    });
  });
});
