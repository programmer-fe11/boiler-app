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

  const pickListCustomFieldAndBulkAct = (): void => {
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

    cy.getByName('buttonbulkaction').within(() => {
      cy.getSection('bulkactiontoggle').click();
    });
  };

  const deleteBulkAct = (): void => {
    pickListCustomFieldAndBulkAct();

    cy.get('li').contains('a', 'Delete').click();
    cy.getSection('dialogconfirm')
      .getSection('confirm-button')
      .contains('span', 'Delete')
      .click();
  };

  const activeBulkAct = (): void => {
    pickListCustomFieldAndBulkAct();

    cy.get('li').contains('a', 'Active').click();
    cy.getSection('dialogconfirm')
      .getSection('confirm-button')
      .contains('span', 'Activate')
      .click();
  };
  const inactiveBulkAct = (): void => {
    pickListCustomFieldAndBulkAct();

    cy.get('li').contains('a', 'Inactive').click();
    cy.getSection('dialogconfirm')
      .getSection('confirm-button')
      .contains('span', 'Inactivate')
      .click();
  };

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
    cy.getSection('labeltext').contains('No').click();
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

  it('should normally working and visible custom field data on all router', () => {
    cy.get('[role="menubar"]')
      .should('exist')
      .within(() => {
        cy.contains('a', 'Specific').click();
      });

    cy.wait('@getAllCustomFieldSpecific');

    cy.get('[role="menubar"]')
      .should('exist')
      .within(() => {
        cy.contains('a', 'Global').should('exist').and('be.visible').click();
      });

    cy.wait('@getAllCustomFieldGlobal');
  });

  it('should error when DELETE BULK ACTION', () => {
    cy.intercept('DELETE', '**/v2/custom-field/bulk', { statusCode: 400 }).as(
      'deleteBulkActError',
    );
    deleteBulkAct();

    cy.wait('@deleteBulkActError');
    cy.get('@consoleError').should('have.been.called');
    cy.contains(
      'Error, failed to delete custom field. Please check your connection and try again.',
    );
  });

  it('should error when ACTIVE BULK ACTION', () => {
    cy.intercept('PUT', '**/v2/custom-field/bulk', { statusCode: 400 }).as(
      'activeBulkActError',
    );

    activeBulkAct();

    cy.wait('@activeBulkActError');
    cy.get('@consoleError').should('have.been.called');
    cy.contains(
      'Error, failed to activate custom field. Please check your connection and try again.',
    );
  });

  it('should error when INACTIVE BULK ACTION', () => {
    cy.intercept('PUT', '**/v2/custom-field/bulk', { statusCode: 400 }).as(
      'inactiveBulkActError',
    );

    inactiveBulkAct();

    cy.wait('@inactiveBulkActError');
    cy.get('@consoleError').should('have.been.called');
    cy.contains(
      'Error, failed to inactivate custom field. Please check your connection and try again.',
    );
  });

  it('should error when get option in dropdown', () => {
    cy.intercept('GET', '**/v2/custom-field/options*', { statusCode: 400 }).as(
      'getOptionsFilterError',
    );
    cy.getByName('buttonfilter').should('exist').click();

    cy.get('[fieldname="dataType"]').click();

    cy.wait('@getOptionsFilterError');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should error when CREATE CUSTOM FIELD', () => {
    cy.intercept('POST', '**/v2/custom-field*', { statusCode: 400 }).as(
      'postCustomFieldError',
    );

    cy.contains('button', 'Custom Field').should('exist').click();
    fillform();
    cy.contains('button', 'Simpan').click();

    cy.wait('@postCustomFieldError');
    cy.get('@consoleError').should('have.been.called');
    cy.contains(
      'Error, failed to create custom field. Please check your connection and try again.',
    );
  });

  it('should error when EDIT CUSTOM FIELD', () => {
    cy.intercept('PUT', '**/v2/custom-field/edit/*', { statusCode: 400 }).as(
      'editCustomFieldError',
    );

    cy.getSection('singleactionwrapper').should('be.visible').first().click();
    cy.contains('Edit').click();
    cy.contains('Edit Custom Field').should('exist');
    fillform();
    cy.contains('button', 'Simpan').click();

    cy.wait('@editCustomFieldError');
    cy.get('@consoleError').should('have.been.called');
    cy.contains(
      'Error, failed to edit custom field. Please check your connection and try again.',
    );
  });

  it('should error when get option in dropdown dialog form', () => {
    cy.intercept('GET', '**/v2/custom-field/options*', { statusCode: 400 }).as(
      'getCustomFieldOptionsFormError',
    );

    cy.contains('button', 'Custom Field').should('exist').click();
    cy.get('[aria-label="Select data type"]').click();

    cy.wait('@getCustomFieldOptionsFormError');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should error when get data on custom field global page', () => {
    cy.intercept('GET', '**/v2/custom-field**type=global', {
      statusCode: 400,
    }).as('getAllCustomFieldGlobalError');

    cy.wait('@getAllCustomFieldGlobalError');
    cy.get('@consoleError').should('have.been.called');
  });

  it('should error when get data on custom field specific page', () => {
    cy.intercept('GET', '**/v2/custom-field**type=specific', {
      statusCode: 400,
    }).as('getAllCustomFieldSpecificError');

    cy.get('[role="menubar"]')
      .should('exist')
      .within(() => {
        cy.contains('a', 'Specific').click();
      });

    cy.wait('@getAllCustomFieldSpecificError');
    cy.get('@consoleError').should('have.been.called');
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

  it('should normally working toggle switch on custom field row', () => {
    cy.getByName('toggleswitch').first().click();
    cy.contains('Hide data').click();
    cy.contains('button', 'Inactivate').click();
    cy.getByName('toggleswitch').first().click();
    cy.contains('Cancel').click();

    cy.getByName('toggleswitch').eq(2).click();
    cy.contains('button', 'Activate').click();
    cy.getByName('toggleswitch').eq(2).click();
    cy.contains('Cancel').click();
  });

  it('should be click row checkbox and ACTIVE BULK ACTION', () => {
    activeBulkAct();
  });

  it('should be click row checkbox and INACTIVE BULK ACTION', () => {
    inactiveBulkAct();
  });

  it('should be click row checkbox and DELETE BULK ACTION', () => {
    deleteBulkAct();
  });
});
