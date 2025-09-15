describe('/home', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.intercept('GET', 'user*', { fixture: 'user-list' });
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Home');
    });
  });

  it('navigate to another page and should have correct breadcrumb', () => {
    cy.get('wangs-tab-menu').within(() => {
      cy.contains('Another Page').click();
    });

    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Another Page');
    });

    cy.contains('Hello from Another Tab');
  });
});
