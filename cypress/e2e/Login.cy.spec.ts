describe('/login', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/login-user');
    cy.viewport(1280, 720);
  });

  it('should login', () => {
    cy.visit('/login');
  });
});
