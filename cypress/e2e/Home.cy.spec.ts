describe('/home', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.intercept('GET', '**/v2/asset*', { fixture: 'data-asset' });
    cy.intercept('GET', '**/v2/assets/detail/*', { fixture: 'detail-asset' });
    cy.intercept('GET', '**/v2/assets/options*', {
      fixture: 'options-asset',
    }).as('getOptions');
    cy.intercept('POST', '**/v2/assets*', { statusCode: 200 });
    cy.intercept('PUT', '**/v2/assets/*', { statusCode: 200 });
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Home');
    });
  });

  it('should open register dialog when clicking register button', () => {
    cy.get('[aria-label="+ Register"]').click();
    cy.get('[fieldname="Group"]').should('exist').click();
    cy.wait('@getOptions');
    cy.contains('Head Office').click();

    cy.get('[fieldname="category"]').should('exist').click();
    cy.contains('Laptop').click();

    cy.get('[aria-label="Select asset name"]').should('exist').click();
    cy.contains('Laptop Lenovo ThinkPad X1').click();

    cy.get('[placeholder="Enter alias name"]').should('exist').click();
    cy.get('[placeholder="Enter alias name"]').type('Test type alias name');

    cy.get('[aria-label="Select brand"]').should('exist').click();
    cy.get('li').contains('Lenovo').click();

    cy.get('[aria-label="Select model/type"]').should('exist').click();
    cy.get('li').contains('ThinkPad X1').click();

    cy.get('[data-wv-name="image-compressor"]')
      .should('exist')
      .within(() => {
        cy.get('input#photo').selectFile('./cypress/fixtures/testIMG.jpg', {
          force: true,
        });
      });

    cy.get('img').should('be.visible');
    cy.get('.p-dialog-footer').within(() => {
      cy.contains('button', 'Terapkan').click();
    });
    cy.get('[data-wv-section="dialog-form-footer"]')
      .contains('label', 'Stay on this form after submitting')
      .click();

    cy.get('[data-wv-section="dialog-form-footer"]')
      .find('[aria-label="Simpan"]')
      .click();
  });
});
