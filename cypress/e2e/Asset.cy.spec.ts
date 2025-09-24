describe('/asset', () => {
  beforeEach(() => {
    cy.visit('/asset');
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
      cy.contains('Asset');
    });
    cy.get('[fieldname="group"]').should('exist').click();
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

  it.only('should open register dialog when clicking register button & STAY FORM', () => {
    cy.get('[aria-label="+ Register"]').click();
    cy.get('[fieldname="group"] [role="combobox"]').click();
  });

  it('should open register dialog when clicking register button', () => {
    cy.get('[aria-label="+ Register"]').click();
    cy.get('[fieldname="Group"]').should('exist').click();
    cy.wait('@getOptions');
    cy.contains('Warehouse A').click();

    cy.get('[fieldname="category"]').should('exist').click();
    cy.contains('Monitor').click();

    cy.get('[aria-label="Select asset name"]').should('exist').click();
    cy.contains('Monitor Dell UltraSharp 27').click();

    cy.get('[placeholder="Enter alias name"]').should('exist').click();
    cy.get('[placeholder="Enter alias name"]').type('Test type alias name');

    cy.get('[aria-label="Select brand"]').should('exist').click();
    cy.get('li').contains('HP').click();

    cy.get('[aria-label="Select model/type"]').should('exist').click();
    cy.get('li').contains('UltraSharp U2720Q').click();

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

    /*
     * Cy.get('button')
     *   .contains('span', 'Bersihkan Field')
     *   .should('exist')
     *   .click();
     */
    cy.get('[aria-label="Bersihkan Field"]');
    cy.get('i.icon.ic-close').click();
  });

  it('test header', () => {
    cy.get('i.icon.ic-search').click();
    cy.get('[data-wv-section="form"]').first().type('Hello test');
    cy.get('i.icon.ic-close').click();
    cy.get('i.icon.ic-arrow-left').click();

    cy.get('i.icon.ic-filter').click();

    cy.get('[data-wv-name="filtercontainer"]')
      .should('be.visible')
      .and('exist');

    cy.contains('Select asset name').click();
    cy.wait('@getOptions');
    cy.get('[aria-label="Option List"]').within(() => {
      cy.contains('Monitor Dell UltraSharp 27').click();
    });

    cy.contains('Select group').click();
    cy.wait('@getOptions');
    cy.get('[aria-label="Option List"]').within(() => {
      cy.contains('Head Office').click();
    });

    cy.contains('Select brand').click();
    cy.wait('@getOptions');
    cy.get('[aria-label="Option List"]').within(() => {
      cy.contains('Dell').click();
    });

    cy.contains('Select model').click();
    cy.wait('@getOptions');
    cy.get('[aria-label="Option List"]').within(() => {
      cy.contains('UltraSharp').click();
    });

    // cy.get('[data-wv-name="filtercontainer"]')
    //   .contains('span', 'Bersihkan Field')
    //   .click();
  });
});
