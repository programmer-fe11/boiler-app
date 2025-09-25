describe('/asset', () => {
  beforeEach(() => {
    cy.visit('/asset');
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
        cy.stub(win, 'open').callsFake((url) => {
          return (win.open as sinon.SinonStub).wrappedMethod.call(
            win,
            url,
            '_self',
          );
        });
      },
    });
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Asset');
    });
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

    // TODO: Kalau mau get data-wv-name, pake getByName
    cy.get('[data-wv-name="image-compressor"]')
      .should('exist')
      .within(() => {
        cy.get('input#photo').selectFile('./cypress/fixtures/testIMG.jpg', {
          force: true,
        });
      });

    cy.get('img').should('be.visible');
    // TODO: Jangan ada get dari class, jadi jangan ada get yang pakai titik
    cy.get('.p-dialog-footer').within(() => {
      cy.contains('button', 'Terapkan').click();
    });
  };

  const fillFilter = (): void => {
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
    cy.contains('[data-wv-name="filtercontainer"]', 'Model').within(() => {
      cy.get('[label="Model/type"]').click();
    });
  };

  it('should open register dialog when clicking register button & STAY FORM ', () => {
    cy.get('[aria-label="+ Register"]').click();

    fillRegisterEditForm();

    // TODO: Kalau mau get data-wv-section, pake getSection
    cy.get('[data-wv-section="dialog-form-footer"]')
      .contains('label', 'Stay on this form after submitting')
      .click();

    cy.get('[data-wv-section="dialog-form-footer"]')
      .find('[aria-label="Simpan"]')
      .click();
    cy.get('i.icon.ic-close').should('exist').click();
  });

  it('should open register dialog when clicking register button, clear field, and submit WITHOUT STAY FORM', () => {
    cy.get('[aria-label="+ Register"]').click();
    fillRegisterEditForm();

    cy.contains('[role="dialog"]', 'Register Asset').within(() => {
      cy.get('[aria-label="Bersihkan Field"]').click();
    });
    cy.get('[data-wv-section="dialog-form-footer"]')
      .contains('label', 'Stay on this form after submitting')
      .click();
    cy.get('[data-wv-section="dialog-form-footer"]')
      .contains('label', 'Stay on this form after submitting')
      .click();
    fillRegisterEditForm();
    cy.get('[data-wv-section="dialog-form-footer"]')
      .find('[aria-label="Simpan"]')
      .click();
  });

  it('should open header filter and search', () => {
    cy.get('i.icon.ic-search').click();
    cy.get('[data-wv-section="form"]').first().type('Hello test');
    cy.get('i.icon.ic-close').click();
    cy.get('i.icon.ic-arrow-left').click();

    cy.get('i.icon.ic-filter').click();

    fillFilter();
    cy.contains('[data-wv-name="filtercontainer"]', 'Bersihkan Field').within(
      () => {
        cy.contains('button', 'Bersihkan Field').click();
      },
    );

    fillFilter();
    cy.get('[data-wv-name="filtercontainer"]')
      .contains('button', 'Terapkan')
      .click();

    cy.contains('[data-wv-name="filtercontainer"]', 'Bersihkan Field').within(
      () => {
        cy.contains('button', 'Bersihkan Field').click();
      },
    );
  });

  it('should open edit dialog with STAY ON FORM', () => {
    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.get('.icon.ic-ellipsis-h').first().click();
    cy.get('.icon.ic-ellipsis-h').first().click();

    cy.get('td i.icon.ic-ellipsis-h').first().click();
    cy.contains('Edit', { timeout: 10000 }).should('be.visible').click();

    cy.get('[data-wv-section="dialog-form-footer"]')
      .contains('label', 'Stay on this form after submitting')
      .should('exist')
      .click();

    cy.contains('[role="dialog"]', 'Edit Asset')
      .should('exist')
      .within(() => {
        cy.get('[aria-label="Bersihkan Field"]').click();
      });

    cy.get('[data-wv-section="dialog-form-footer"]')
      .find('[aria-label="Simpan"]')
      .click();
  });
  it('should open edit WITHOUT STAY ON FORM ', () => {
    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.get('.icon.ic-ellipsis-h').first().click();
    cy.get('.icon.ic-ellipsis-h').first().click();

    cy.get('td i.icon.ic-ellipsis-h').first().click();
    cy.contains('Edit', { timeout: 10000 }).should('be.visible').click();

    cy.contains('[role="dialog"]', 'Edit Asset')
      .should('exist')
      .within(() => {
        cy.get('[aria-label="Bersihkan Field"]').click();
      });

    cy.get('[data-wv-section="dialog-form-footer"]')
      .find('[aria-label="Simpan"]')
      .click();
  });

  it('should open detail', () => {
    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.get('td i.icon.ic-ellipsis-h').first().click();
    cy.contains('Detail Asset', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait('@getDetail');
    cy.contains('XIX Brum');
  });
});

describe('/asset error path', () => {
  beforeEach(() => {
    cy.visit('/asset', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError');
      },
    });

    cy.intercept('GET', '**/v2/asset*', { fixture: 'data-asset' }).as(
      'getAllAsset',
    );
  });

  it('should handle error on detail asset', () => {
    cy.intercept('GET', '**/v2/assets/detail/*', {
      statusCode: 404,
      body: { message: 'Asset not found' },
    }).as('getDetailError');

    cy.wait('@getAllAsset');
    cy.getSection('tablewrapper').should('be.visible');

    cy.get('td i.icon.ic-ellipsis-h').first().click();
    cy.contains('Detail Asset').click();

    cy.wait('@getDetailError');
    cy.get('@consoleError').should('have.been.called');
  });
});

describe('/asset error path Asset', () => {
  beforeEach(() => {
    cy.visit('/asset', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError');
      },
    });
  });

  it('should handle error on main page (getAllAsset)', () => {
    cy.intercept('GET', '**/v2/asset*', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('getAllAssetError');

    cy.visit('/asset');
    cy.wait('@getAllAssetError');
    cy.get('@consoleError').should('have.been.called');
  });
});
