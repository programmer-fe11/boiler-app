describe('/asset', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/asset*', { fixture: 'data-asset' }).as(
      'getAllAsset',
    );
    cy.intercept('GET', '**/v2/assets/detail/*', {
      fixture: 'detail-asset',
    }).as('getDetail');
    cy.intercept('GET', '**/v2/assets/options*', {
      fixture: 'options-asset',
    }).as('getOptions');
    cy.intercept('POST', '**/v2/assets*', { statusCode: 200 });
    cy.intercept('PUT', '**/v2/assets/*', { statusCode: 200 });

    cy.visit('/asset', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError');
      },
    });
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Asset');
    });
  });

  it('should handle error on main page (getAllAsset)', () => {
    cy.intercept('GET', '**/v2/asset*', {
      statusCode: 400,
      body: { message: 'Bad request' },
    }).as('getAllAssetError');

    cy.wait('@getAllAssetError');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should handle error on detail asset', () => {
    cy.intercept('GET', '**/v2/assets/detail/*', {
      statusCode: 400,
      body: { message: 'Asset not found' },
    }).as('getDetailError');

    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.getSection('rowsingleactioncell').first().click();
    cy.contains('Detail Asset').click();

    cy.wait('@getDetailError');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should handle error on register asset when submit form', () => {
    cy.intercept('POST', '**/v2/assets*', {
      statusCode: 400,
      body: { message: 'Bad Request / asset not found' },
    }).as('postAssetError');

    cy.get('[aria-label="+ Register"]').click();

    fillRegisterEditForm();

    cy.getSection('dialog-form-footer').find('[aria-label="Simpan"]').click();

    cy.wait('@postAssetError');
    cy.get('@consoleError').should('have.been.called');
    cy.contains('Error, failed to register asset').should('be.visible');
  });

  it('should handle error on form dialog when open get option dropdown (getAllOptions)', () => {
    cy.intercept('GET', '**/v2/assets/options*', {
      statusCode: 400,
      body: { message: 'Bad Request' },
    }).as('getOptionsError');

    cy.get('[aria-label="+ Register"]').click();

    cy.contains('[role="dialog"]', 'Register Asset').within(() => {
      cy.get('[fieldname="group"]').click();
    });

    cy.wait('@getOptionsError');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should handle error on edit form when open dialog edit (getDataById)', () => {
    cy.intercept('GET', '**/v2/assets/detail/*', {
      statusCode: 400,
      body: { message: 'Bad Request' },
    }).as('getDetailError');

    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.getSection('rowsingleactioncell').first().click();
    cy.contains('Edit').click();

    cy.wait('@getDetailError');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should handle error on edit asset when submit form', () => {
    cy.intercept('PUT', '**/v2/assets/*', {
      statusCode: 400,
      body: { message: 'Bad Request' },
    }).as('editAssetError');

    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.getSection('rowsingleactioncell').first().click();
    cy.contains('Edit').click();

    fillRegisterEditForm();

    cy.getSection('dialog-form-footer').find('[aria-label="Simpan"]').click();

    cy.wait('@editAssetError');
    cy.get('@consoleError').should('have.been.called');
    cy.contains('Error, failed to edit asset').should('be.visible');
  });

  const fillRegisterEditForm = (): void => {
    cy.get(
      '[fieldname="group"][label="Group"][unselectonreselect="false"][valuetype="plain"][usevalidator="true"][mandatory="true"]',
    )
      .should('exist')
      .click();
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

    cy.getByName('image-compressor')
      .should('exist')
      .within(() => {
        cy.get('input#photo').selectFile('./cypress/fixtures/testIMG.jpg', {
          force: true,
        });
      });

    cy.get('img').should('be.visible');

    cy.getSection('dialog-cropper').within(() => {
      cy.contains('button', 'Terapkan').click();
    });
  };

  const fillFilter = (): void => {
    cy.getByName('filtercontainer').should('be.visible').and('exist');

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
    cy.contains('[data-wv-name="filtercontainer"]', 'Model').within(() => {
      cy.get('[label="Model/type"]').click();
    });
  };

  it('should open register dialog when clicking register button & STAY FORM ', () => {
    cy.get('[aria-label="+ Register"]').click();

    fillRegisterEditForm();

    cy.getSection('dialog-form-footer')
      .contains('label', 'Stay on this form after submitting')
      .click();

    cy.getSection('dialog-form-footer').find('[aria-label="Simpan"]').click();
    cy.getSection('dialog-form-main').contains('Batal').click();
  });

  it('should open register dialog when clicking register button, clear field, and submit WITHOUT STAY FORM', () => {
    cy.get('[aria-label="+ Register"]').click();
    fillRegisterEditForm();

    cy.contains('[role="dialog"]', 'Register Asset').within(() => {
      cy.get('[aria-label="Bersihkan Field"]').click();
    });
    cy.getSection('dialog-form-footer')
      .contains('label', 'Stay on this form after submitting')
      .click();
    cy.getSection('dialog-form-footer')
      .contains('label', 'Stay on this form after submitting')
      .click();
    fillRegisterEditForm();
    cy.getSection('dialog-form-footer').find('[aria-label="Simpan"]').click();
  });

  it('test header filter and search', () => {
    cy.getSection('buttontrigger').click();
    cy.getSection('form').first().type('Hello test');
    cy.getSection('resetbutton').click();
    cy.getSection('collapsebutton').click();

    cy.getByName('buttonfilter').click();

    fillFilter();
    cy.getByName('filtercontainer')
      .contains('Bersihkan Field')
      .within(() => {
        cy.contains('button', 'Bersihkan Field').click();
      });

    fillFilter();
    cy.getByName('filtercontainer').contains('button', 'Terapkan').click();

    cy.getByName('filtercontainer')
      .contains('button', 'Bersihkan Field')
      .click();

    cy.getByName('buttonfilter').click();
  });

  it('should open edit and then submit dialog form', () => {
    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.get('#column-visibility-toggle-asset-asset-list').click();
    cy.get('#column-visibility-toggle-asset-asset-list').click();

    cy.getSection('rowsingleactioncell').first().click();
    cy.contains('Edit', { timeout: 10000 }).should('be.visible').click();

    fillRegisterEditForm();

    cy.contains('[role="dialog"]', 'Edit Asset')
      .should('exist')
      .within(() => {
        cy.get('[aria-label="Bersihkan Field"]').click();
      });

    cy.getSection('dialog-form-footer').find('[aria-label="Simpan"]').click();
  });

  it('test Detail', () => {
    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.getSection('rowsingleactioncell').first().click();
    cy.contains('Detail Asset', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait('@getDetail');
    cy.contains('XIX Brum');
  });
});
