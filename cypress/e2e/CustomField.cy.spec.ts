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

    cy.visit('/custom-field', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError');
      },
    });
  });

  const fillform = (): void => {
    cy.getSection('dialog-form').should('be.visible').and('exist');

    cy.get('[placeholder="Enter field name"]').should('exist').click();
    cy.get('[placeholder="Enter field name"]').should('exist').type('test');

    cy.get('[aria-label="Select data type"]').click();
    cy.contains('Multi dropdown').click();
    cy.get('[placeholder="Enter value"]').type('test1');
    cy.get('[placeholder="Enter value"]').trigger('keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
      code: 'Enter',
    });

    cy.getSection('labeltext').contains('Yes').click();

    cy.get('[fieldname="itemName"]').should('exist').click();
    cy.contains('Email Address').click();
    cy.get('[fieldname="itemName"]').should('exist').click();
  };

  it('should have breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Global');
    });
  });

  it('testing all router', () => {
    cy.get('[role="menubar"]')
      .should('exist')
      .within(() => {
        cy.contains('a', 'Specific').click();
      });
    cy.get('[role="menubar"]')
      .should('exist')
      .within(() => {
        cy.contains('a', 'Global').click();
      });
  });
  it('should create custom field WITH STAY ON FORM', () => {
    cy.contains('button', 'Custom Field').should('exist').click();

    fillform();

    cy.contains('Stay on this form after submitting').click();

    cy.contains('button', 'Simpan').click();
  });
  it('should create custom field WITHOUT STAY ON FORM', () => {
    cy.contains('button', 'Custom Field').should('exist').click();

    fillform();

    cy.contains('button', 'Simpan').click();
  });
  it('should be delete custom field', () => {
    cy.getSection('singleactionwrapper').should('be.visible').first().click();
    cy.contains('Delete').click();
    cy.contains('Remove').click();
    cy.contains('button', 'Delete').click();
  });
  it('should be edit custom field', () => {
    cy.getSection('singleactionwrapper').should('be.visible').first().click();
    cy.contains('Edit').click();
    cy.contains('Edit Custom Field').should('exist');
    fillform();
    cy.contains('button', 'Simpan').click();
  });
  it('should be filter table', () => {
    cy.getByName('buttonfilter').should('exist').click();

    cy.get('[fieldname="status"]').click();
    cy.get('li').contains('Active').click();

    cy.get('[fieldname="dataType"]').click();
    cy.contains('Dropdown').click();

    cy.get('[fieldname="isRequired"]').click();
    cy.get('li').contains('Yes').click();

    cy.get('button').contains('Terapkan').click();
    cy.get('button').contains('Bersihkan Field').click();

    cy.getByName('buttonfilter').should('exist').click();
  });
  it('test toggle switch', () => {
    cy.getByName('toggleswitch').first().click();
    cy.contains('Hide data').click();

    cy.contains('button', 'Inactivate').click();

    cy.getByName('toggleswitch').first().click();
    cy.contains('Cancel').click();
  });

  it('should be click row checkbox', () => {
    cy.getSection('bodycell')
      .getByName('checkbox')
      .getSection('rowcheckbox')
      .eq(0)
      .click();
    cy.getSection('bodycell')
      .getByName('checkbox')
      .getSection('rowcheckbox')
      .eq(1)
      .click();
    cy.getSection('bodycell')
      .getByName('checkbox')
      .getSection('rowcheckbox')
      .eq(2)
      .click();
    cy.getSection('bodycell')
      .getByName('checkbox')
      .getSection('rowcheckbox')
      .eq(3)
      .click();

    cy.getByName('buttonbulkaction').should('be.visible').and('exist');

    cy.getByName('buttonbulkaction').should('be.visible').and('exist');

    cy.getByName('buttonbulkaction').within(() => {
      cy.getSection('bulkactiontoggle').click();
    });

    cy.contains('Active').click();
  });
});
