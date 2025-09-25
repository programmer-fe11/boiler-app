import { EmployeeDetail } from '@appinternal/karyawan-api-services/src/types/employee.type';
import { FetchDetailResponse } from '@appinternal/karyawan-api-services/src/types/fetchResponse.type';

describe('Karyawan', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/*/dotlottie-player.wasm', {});

    cy.intercept('GET', '**/*/country-dial-code.json', {
      statusCode: 200,
      body: [
        {
          name: 'Afghanistan',
          code: 'AF',
          emoji: '🇦🇫',
          unicode: 'U+1F1E6 U+1F1EB',
          dial_code: '+93',
          image:
            'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg',
        },
        {
          name: 'Indonesia',
          code: 'ID',
          emoji: '🇮🇩',
          unicode: 'U+1F1EE U+1F1E9',
          dial_code: '+62',
          image:
            'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg',
        },
      ],
    });

    cy.intercept('GET', '**/api/employee*', {
      fixture: 'getEmployees.json',
    }).as('getEmployees');

    cy.intercept('GET', '**/api/employee/123', {
      statusCode: 400,
    }).as('getEmployeeDetail');

    cy.intercept('GET', '**/api/employee', {
      fixture: 'getEmployees.json',
    }).as('downloadEmployees');

    cy.intercept('GET', '**/position/dropdown*', {
      statusCode: 400,
    }).as('getPositionsDropdown');

    cy.intercept('GET', '**/division/dropdown*', {
      statusCode: 400,
    }).as('getDivisionsDropdown');

    cy.intercept('GET', '**/email/dropdown*', {
      statusCode: 400,
    }).as('getEmailDropdown');

    cy.intercept('GET', '**/admin-role/dropdown*', {
      statusCode: 400,
    }).as('getRoleDropdown');

    cy.intercept('GET', '**/preset/dropdown*', {
      statusCode: 400,
    }).as('getPresetDropdown');

    cy.intercept('GET', '**/company/dropdown*', {
      statusCode: 400,
    }).as('getCompanyDropdown');

    cy.intercept('PUT', '**/api/employee/*/permanent-delete', {
      statusCode: 400,
    }).as('deletePermanent');

    cy.intercept('PUT', '**/api/employee/*/activate', {
      statusCode: 400,
    }).as('putActivate');

    cy.intercept('PUT', '**/api/employee/*/deactivate', {
      statusCode: 400,
    }).as('putDeactivate');

    cy.login();

    cy.visit('/karyawan', {
      onBeforeLoad(win) {
        // refrensi error console
        cy.spy(win.console, 'error').as('consoleError');
        /*
         * Open new tab in current tab
         * Reference: https://stackoverflow.com/questions/78226319/handle-cypress-new-tab-with-typescript
         */
        cy.stub(win, 'open').callsFake((url) => {
          return (win.open as sinon.SinonStub).wrappedMethod.call(
            win,
            url,
            '_self',
          );
        });
      },
    });
    cy.url().should('contain', '/karyawan');
    cy.getByName('breadcrumb').should('exist').and('be.visible');
    cy.wait('@getEmployees');
  });

  it('should display correct breadcrumb', () => {
    cy.contains('Karyawan');
  });

  describe('Semua', () => {
    it('should render correctly', () => {
      cy.getByName('employee-table').should('exist');
      cy.getByName('employee-table-header').should('exist');
      cy.getSection('employee-table-header-button-add').should('exist');
      cy.getSection('employee-table-header-button-filter').should('exist');
      cy.getSection('employee-table-header-button-search').should('exist');
      cy.getSection('employee-table-header-button-download').should('exist');
    });

    it('should redirect to create employee page when button `+ Karyawan` was clicked', () => {
      cy.getSection('employee-table-header-button-add').should('exist').click();
      cy.url().should('contain', '/karyawan/buat-karyawan');
      cy.contains('Karyawan');
      cy.contains('Buat Karyawan');
    });

    it('should redirect back to all employee page when button `Cancel` was clicked', () => {
      cy.getSection('employee-table-header-button-add').should('exist').click();
      cy.url().should('contain', '/karyawan/buat-karyawan');
      cy.contains('Karyawan');
      cy.contains('Buat Karyawan');
      cy.contains('Batal').should('exist').and('be.visible').click();
      cy.url().should('contain', '/karyawan');
    });

    it('should able to create employee', () => {
      cy.getSection('employee-table-header-button-add').should('exist').click();
      cy.url().should('contain', '/karyawan/buat-karyawan');
      cy.contains('Karyawan');
      cy.contains('Buat Karyawan');

      cy.get('[data-wv-section=form-employee-full-name] input')
        .should('exist')
        .type('Name');
      cy.get('[data-wv-section=form-employee-nick-name] input')
        .should('exist')
        .type('Name');

      cy.getSection('form-employee-employee-type')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.get('[role=option]').eq(1).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      const chooseOption = (option: string, endpoint: string): void => {
        cy.getSection(`form-employee-${endpoint}`)
          .should('exist')
          .within(() => {
            cy.getByData('pc-section', 'trigger').click();
          });
        cy.wait(`@${option}`).its('response.statusCode').should('eq', 400);

        cy.intercept('GET', `**/${endpoint}/dropdown*`, {
          fixture: 'optionsArray.json',
        }).as(option);

        cy.getSection(`form-employee-${endpoint}`)
          .should('exist')
          .within(() => {
            cy.get('label').click(0, 0);
            cy.getByData('pc-section', 'trigger').click();
          });
        cy.wait(`@${option}`).its('response.statusCode').should('not.eq', 400);

        cy.getByData('pc-section', 'panel')
          .should('exist')
          .and('be.visible')
          .within(() => {
            cy.get('[role=option]').eq(0).click();
          });
        cy.getByData('pc-section', 'panel').should('not.exist');
      };

      chooseOption('getDivisionsDropdown', 'division');
      chooseOption('getPositionsDropdown', 'position');
      chooseOption('getEmailDropdown', 'email');
      chooseOption('getRoleDropdown', 'admin-role');
      chooseOption('getPresetDropdown', 'preset');
      chooseOption('getCompanyDropdown', 'company');

      cy.get('[data-wv-section=form-employee-phone-number] input')
        .should('exist')
        .type('123456789');
      cy.get('[data-wv-section=form-employee-nik] input')
        .should('exist')
        .type('1231231231231234');
      cy.get('[data-wv-section=form-employee-address] input')
        .should('exist')
        .type('Jalan jalan');
      cy.get('[data-wv-section=form-employee-emergency-contact] input')
        .should('exist')
        .type('123456789');

      cy.getSection('form-employee-birth-date').click();
      cy.get('[data-wv-today="true"]').first().click();

      cy.getSection('form-employee-start-work-date').click();
      cy.get('[data-wv-today="true"]').first().click();

      cy.getSection('form-employee-end-work-date').click();
      cy.get('[data-wv-today="true"]').last().click();

      cy.get('[data-wv-section=form-employee-account-number] input')
        .should('exist')
        .type('4141414141');

      cy.getSection('form-employee-marital-status')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.get('[role=option]').eq(0).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      cy.get('[data-wv-section=form-employee-total-dependents] input')
        .should('exist')
        .type('4');
      cy.get('[data-wv-section=form-employee-account-number-holder] input')
        .should('exist')
        .type('Name');
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .type('12');
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .clear();
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .type('41414141414141w');
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .type('414');

      cy.getSection('hidden-image-input').selectFile(
        './cypress/fixtures/banteng.jpg',
        { force: true },
      );
      cy.contains('Sesuaikan gambar').should('be.visible');
      cy.get('.vue-advanced-cropper').should('exist').and('be.visible');
      cy.get('[aria-label="Terapkan"]').should('be.visible').click();

      cy.intercept('POST', '**/api/employee', {
        statusCode: 400,
      }).as('postCreateEmployee');
      cy.contains('button[data-p-severity="success"]', 'Simpan').click();
      cy.wait('@postCreateEmployee');

      cy.getByData('pc-section', 'message')
        .should('be.visible')
        .within(() => {
          cy.getByData('pc-section', 'closebutton')
            .should('be.visible')
            .click();
        });

      cy.intercept('POST', '**/api/employee', {
        statusCode: 201,
      }).as('postCreateEmployee');
      cy.contains('button[data-p-severity="success"]', 'Simpan').click();
      cy.wait('@postCreateEmployee');
    });

    it('should able to edit employee', () => {
      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.get('td').last().should('exist').click();
        });

      cy.get('[id=single-action-menu]')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Edit').click();
        });
      cy.url().should('contain', '/karyawan/edit-karyawan');
      cy.contains('Karyawan');
      cy.contains('Edit Karyawan');

      cy.intercept('GET', '**/api/employee/123', {
        fixture: 'getEmployeeDetail.json',
      }).as('getEmployeeDetail');

      cy.reload();
      cy.wait('@getDivisionsDropdown');
      cy.wait('@getEmailDropdown');
      cy.wait('@getPositionsDropdown');

      cy.get('[data-wv-section=form-employee-full-name] input')
        .should('exist')
        .type('Name');
      cy.get('[data-wv-section=form-employee-nick-name] input')
        .should('exist')
        .type('Name');

      cy.getSection('form-employee-employee-type')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.get('[role=option]').eq(1).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      cy.get('[data-wv-section=form-employee-phone-number] input')
        .should('exist')
        .type('123456789');
      cy.get('[data-wv-section=form-employee-nik] input')
        .should('exist')
        .type('1');
      cy.get('[data-wv-section=form-employee-address] input')
        .should('exist')
        .type('Jalan jalan');

      cy.getSection('form-employee-start-work-date').click();
      cy.get('[data-wv-today="true"]').first().click();

      cy.getSection('form-employee-end-work-date').click();
      cy.get('[data-wv-today="true"]').last().click();

      cy.get('[data-wv-section=form-employee-account-number] input')
        .should('exist')
        .type('4141414141');

      cy.getSection('form-employee-marital-status')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.get('[role=option]').eq(0).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      cy.get('[data-wv-section=form-employee-total-dependents] input')
        .should('exist')
        .type('4');
      cy.get('[data-wv-section=form-employee-account-number-holder] input')
        .should('exist')
        .type('Name');
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .type('41414141414141w');
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .type('414');

      cy.getSection('hidden-image-input').selectFile(
        './cypress/fixtures/banteng.jpg',
        { force: true },
      );
      cy.contains('Sesuaikan gambar').should('be.visible');
      cy.get('.vue-advanced-cropper').should('exist').and('be.visible');
      cy.get('[aria-label="Terapkan"]').should('be.visible').click();

      cy.intercept('PUT', '**/api/employee/*', {
        statusCode: 400,
      }).as('putEditEmployee');
      cy.contains('button[data-p-severity="success"]', 'Simpan').click();
      cy.wait('@putEditEmployee', { timeout: 20000 });

      cy.getByData('pc-section', 'message')
        .should('be.visible')
        .within(() => {
          cy.getByData('pc-section', 'closebutton')
            .should('be.visible')
            .click();
        });

      cy.intercept('PUT', '**/api/employee/*', {
        statusCode: 200,
      }).as('putEditEmployee');
      cy.contains('button[data-p-severity="success"]', 'Simpan').click();
      cy.wait('@putEditEmployee', { timeout: 20000 });
    });

    it('should able to send query to filter table', { retries: 1 }, () => {
      cy.intercept('GET', '**/position/dropdown*', {
        fixture: 'optionsArray.json',
      }).as('getPositionsDropdown');

      cy.intercept('GET', '**/division/dropdown*', {
        fixture: 'optionsArray.json',
      }).as('getDivisionsDropdown');

      cy.getSection('employee-table-header-button-filter')
        .should('exist')
        .click();

      for (let i = 4; i >= 0; i--) {
        cy.getByName('filtercontainer')
          .should('be.visible')
          .within(() => {
            cy.get('[type=multiselect]')
              .eq(i)
              .within(() => {
                cy.getByData('pc-name', 'inputgroup')
                  .should('be.visible')
                  .click();
              });
          });

        if (i === 2) cy.wait('@getDivisionsDropdown');
        if (i === 3) cy.wait('@getPositionsDropdown');

        cy.getByData('pc-section', 'panel')
          .should('be.visible')
          .within(() => {
            cy.getByData('pc-section', 'emptymessage').should('not.exist');
            cy.get('[role=option]').eq(0).click();
            cy.get('input[type=text]').type('{esc}');
          });
      }

      cy.getSection('applybutton').should('exist').click();
      cy.wait('@getEmployees')
        .its('request.query')
        .should('deep.equal', {
          page: '1',
          limit: '10',
          isActive: JSON.stringify([true]),
          company: JSON.stringify(['PT Qtera Mandiri']),
          employeeType: JSON.stringify(['Magang']),
          division: JSON.stringify(['options1']),
          position: JSON.stringify(['options1']),
          adminRole: JSON.stringify(['Role 1']),
        });
    });

    it.only('should be able to non-activate employee', () => {
      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.get('td').last().should('exist').click();
        });

      cy.get('[id=single-action-menu]')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Nonaktif').click();
        });

      cy.getByName('dialog-activation-form')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('dialog-form-title').should(
            'have.text',
            'Nonaktifkan Karyawan',
          );
          cy.getSection('cancel-btn').click();
        });

      cy.intercept('GET', '**/api/employee/123', {
        fixture: 'getEmployeeDetail.json',
      }).as('getEmployeeDetail');

      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.get('td').last().should('exist').click();
        });

      cy.get('[id=single-action-menu]')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Nonaktif').click();
        });

      cy.getSection('dialog-activation-reason')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getByData('pc-section', 'emptymessage').should('not.exist');
          cy.get('[role=option]').eq(0).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      cy.getSection('dialog-activation-note').type('note');
      cy.getSection('save-submit-button').click();

      cy.getByName('dialog-activation-confirmation')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('dialog-confirm-title').should(
            'have.text',
            'Nonaktifkan Karyawan',
          );
          cy.getSection('confirm-button').click();
        });

      cy.wait('@putDeactivate');

      cy.getByData('pc-section', 'message')
        .should('be.visible')
        .first()
        .within(() => {
          cy.getByData('pc-section', 'closebutton')
            .should('be.visible')
            .click();
        });

      cy.intercept('PUT', '**/api/employee/*/deactivate', {
        statusCode: 200,
      }).as('putDeactivate');

      cy.getByName('dialog-activation-confirmation')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('confirm-button').click();
        });

      cy.wait('@putDeactivate').its('response.statusCode').should('eq', 200);
    });
  });

  describe('Tidak Aktif', () => {
    beforeEach(() => {
      cy.get('[role=menubar] > li > a').eq(1).click();
      cy.url().should('contain', '/karyawan/tidak-aktif');
      cy.wait('@getEmployees');
    });

    it('should render correctly', () => {
      cy.getByName('employee-table').should('exist');
      cy.getByName('employee-table-header').should('exist');
      cy.getSection('employee-table-header-button-add').should('not.exist');
      cy.getSection('employee-table-header-button-filter').should('exist');
      cy.getSection('employee-table-header-button-search').should('exist');
      cy.getSection('employee-table-header-button-download').should('exist');
    });

    it('should able to edit employee', () => {
      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.get('td').last().should('exist').click();
        });

      cy.get('[id=single-action-menu]')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Edit').click();
        });
      cy.url().should('contain', '/karyawan/edit-karyawan');
      cy.contains('Karyawan');
      cy.contains('Edit Karyawan');

      cy.intercept('GET', '**/api/employee/123', {
        fixture: 'getEmployeeDetail.json',
      }).as('getEmployeeDetail');

      cy.reload();
      cy.wait('@getDivisionsDropdown');
      cy.wait('@getEmailDropdown');
      cy.wait('@getPositionsDropdown');

      cy.get('[data-wv-section=form-employee-full-name] input')
        .should('exist')
        .type('Name');
      cy.get('[data-wv-section=form-employee-nick-name] input')
        .should('exist')
        .type('Name');

      cy.getSection('form-employee-employee-type')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.get('[role=option]').eq(1).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      cy.get('[data-wv-section=form-employee-phone-number] input')
        .should('exist')
        .type('123456789');
      cy.get('[data-wv-section=form-employee-nik] input')
        .should('exist')
        .type('1');
      cy.get('[data-wv-section=form-employee-address] input')
        .should('exist')
        .type('Jalan jalan');

      cy.getSection('form-employee-start-work-date').click();
      cy.get('[data-wv-today="true"]').first().click();

      cy.getSection('form-employee-end-work-date').click();
      cy.get('[data-wv-today="true"]').last().click();

      cy.get('[data-wv-section=form-employee-account-number] input')
        .should('exist')
        .type('4141414141');

      cy.getSection('form-employee-marital-status')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.get('[role=option]').eq(0).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      cy.get('[data-wv-section=form-employee-total-dependents] input')
        .should('exist')
        .type('4');
      cy.get('[data-wv-section=form-employee-account-number-holder] input')
        .should('exist')
        .type('Name');
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .type('41414141414141w');
      cy.get('[data-wv-section=form-employee-npwp] input')
        .should('exist')
        .type('414');

      cy.getSection('hidden-image-input').selectFile(
        './cypress/fixtures/banteng.jpg',
        { force: true },
      );
      cy.contains('Sesuaikan gambar').should('be.visible');
      cy.get('.vue-advanced-cropper').should('exist').and('be.visible');
      cy.get('[aria-label="Terapkan"]').should('be.visible').click();

      cy.intercept('PUT', '**/api/employee/*', {
        statusCode: 400,
      }).as('putEditEmployee');
      cy.contains('button[data-p-severity="success"]', 'Simpan').click();
      cy.wait('@putEditEmployee', { timeout: 20000 })
        .its('response.statusCode')
        .should('eq', 400);

      cy.getByData('pc-section', 'message')
        .should('be.visible')
        .within(() => {
          cy.getByData('pc-section', 'closebutton')
            .should('be.visible')
            .click();
        });

      cy.intercept('PUT', '**/api/employee/*', {
        statusCode: 200,
      }).as('putEditEmployee');
      cy.contains('button[data-p-severity="success"]', 'Simpan').click();
      cy.wait('@putEditEmployee', { timeout: 20000 })
        .its('response.statusCode')
        .should('eq', 200);
    });

    it('should able to send query to filter table', { retries: 1 }, () => {
      cy.intercept('GET', '**/position/dropdown*', {
        fixture: 'optionsArray.json',
      }).as('getPositionsDropdown');

      cy.intercept('GET', '**/division/dropdown*', {
        fixture: 'optionsArray.json',
      }).as('getDivisionsDropdown');

      cy.getSection('employee-table-header-button-filter')
        .should('exist')
        .click();

      for (let i = 3; i >= 0; i--) {
        cy.getByName('filtercontainer')
          .should('be.visible')
          .within(() => {
            cy.get('[type=multiselect]')
              .eq(i)
              .within(() => {
                cy.getByData('pc-name', 'inputgroup')
                  .should('be.visible')
                  .click();
              });
          });

        if (i === 1) cy.wait('@getDivisionsDropdown');
        if (i === 2) cy.wait('@getPositionsDropdown');

        cy.getByData('pc-section', 'panel')
          .should('be.visible')
          .within(() => {
            cy.getByData('pc-section', 'emptymessage').should('not.exist');
            cy.get('[role=option]').eq(0).click();
            cy.get('input[type=text]').type('{esc}');
          });
      }

      cy.getSection('applybutton').should('exist').click();
      cy.wait('@getEmployees')
        .its('request.query')
        .should('deep.equal', {
          page: '1',
          limit: '10',
          isActive: JSON.stringify([false]),
          employeeType: JSON.stringify(['Magang']),
          division: JSON.stringify(['options1']),
          position: JSON.stringify(['options1']),
          reason: JSON.stringify(['Kontrak Selesai']),
        });
    });

    it('should be able to activate employee', () => {
      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.get('td').last().should('exist').click();
        });

      cy.get('[id=single-action-menu]')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Aktif').click();
        });

      cy.getByName('dialog-activation-form')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('dialog-form-title').should(
            'have.text',
            'Aktifkan Karyawan',
          );
          cy.getSection('cancel-btn').click();
        });

      cy.fixture('getEmployeeDetail').then(
        (employeeDetail: FetchDetailResponse<EmployeeDetail>) => {
          employeeDetail.data.employeeType = 'Magang';
          cy.intercept('GET', '**/api/employee/123', employeeDetail).as(
            'getEmployeeDetail',
          );
        },
      );

      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.get('td').last().should('exist').click();
        });

      cy.get('[id=single-action-menu]')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Aktif').click();
        });

      cy.intercept('GET', '**/email/dropdown*', {
        fixture: 'emailDropdown.json',
      }).as('getEmailDropdown');

      cy.getSection('dialog-activation-email')
        .should('exist')
        .within(() => {
          cy.getByData('pc-section', 'trigger').click();
        });
      cy.getByData('pc-section', 'panel')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getByData('pc-section', 'emptymessage').should('not.exist');
          cy.get('[role=option]').eq(0).click();
        });
      cy.getByData('pc-section', 'panel').should('not.exist');

      cy.getSection('dialog-activation-end-work-date').click();
      cy.get('[data-wv-today="true"]').last().click();

      cy.getSection('save-submit-button').click();

      cy.getByName('dialog-activation-confirmation')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('dialog-confirm-title').should(
            'have.text',
            'Aktifkan Karyawan',
          );
          cy.getSection('confirm-button').click();
        });

      cy.wait('@putActivate').its('response.statusCode').should('eq', 400);

      cy.getByData('pc-section', 'message')
        .should('be.visible')
        .first()
        .within(() => {
          cy.getByData('pc-section', 'closebutton')
            .should('be.visible')
            .click();
        });

      cy.intercept('PUT', '**/api/employee/*/activate', {
        statusCode: 200,
      }).as('putActivate');

      cy.getByName('dialog-activation-confirmation')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('confirm-button').click();
        });

      cy.wait('@putActivate').its('response.statusCode').should('eq', 200);
    });

    it('should be able to delete employee permanently', () => {
      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.get('td').last().should('exist').click();
        });

      cy.get('[id=single-action-menu]')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Hapus').click();
        });

      cy.getByName('dialog-delete-confirmation')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('dialog-confirm-title').should(
            'have.text',
            'Hapus Permanen Data Karyawan',
          );
        });

      cy.getSection('dialog-delete-id').type('2025031001');

      cy.getByName('dialog-delete-confirmation')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('confirm-button').click();
        });

      cy.wait('@deletePermanent').its('response.statusCode').should('eq', 400);

      cy.getByData('pc-section', 'message')
        .should('be.visible')
        .first()
        .within(() => {
          cy.getByData('pc-section', 'closebutton')
            .should('be.visible')
            .click();
        });

      cy.intercept('PUT', '**/api/employee/*/permanent-delete', {
        statusCode: 200,
      }).as('deletePermanent');

      cy.getByName('dialog-delete-confirmation')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.getSection('confirm-button').click();
        });

      cy.wait('@deletePermanent').its('response.statusCode').should('eq', 200);
    });
  });

  describe.skip('Fingerprint', () => {
    const getFingerprint = (
      statusCode: number = 200,
      isEmpty: boolean = true,
    ): void => {
      cy.intercept('GET', '**/api/employee/fingerprint/*', {
        statusCode,
        fixture: isEmpty ? 'getEmptyFingerprint.json' : 'getFingerprint.json',
      }).as('getFingerprint');
    };

    const addFingerprint = (
      statusCode: number = 200,
      delay: number = 0,
    ): void => {
      cy.intercept('POST', '**/api/employee/fingerprint', {
        delay,
        statusCode,
      }).as('addFingerprint');
    };

    const delFingerprint = (statusCode: number = 200): void => {
      cy.intercept(
        'GET',
        '**/api/absensi/pengajuan-tidak-masuk/employee-options',
        { fixture: 'getEmployeeOptions.json', statusCode },
      ).as('getEmployeeOptions');

      cy.intercept('DELETE', '**/api/employee/fingerprint', {
        statusCode,
      }).as('delFingerprint');
    };

    beforeEach(() => {
      getFingerprint(200);
      addFingerprint(200);
      delFingerprint(200);

      cy.getSection('button-fingerprint').click();
      cy.wait('@getEmployeeOptions');

      cy.get('[label="Karyawan"]').click();
      cy.get('[aria-label="Option List"]').within(() => {
        cy.contains('32322 - PT Qtera Mandiri').click();
      });
      cy.get('body').click(0, 0);
      cy.wait('@getFingerprint');

      cy.get('[label="Lantai"]').click();
      cy.get('[aria-label="Option List"]').within(() => {
        cy.contains('Lantai 2').click();
      });
      cy.get('body').click(0, 0);
    });

    it('should add and delete fingerprint', () => {
      getFingerprint(200, false);
      cy.getSection('button-add-fingerprint').click();
      cy.wait('@addFingerprint');
      cy.contains('Sukses, berhasil menambahkan sidik jari.');

      getFingerprint(200);
      cy.getSection('button-delete-fingerprint-0').click();
      cy.wait('@delFingerprint');
      cy.contains('Sukses, berhasil menghapus sidik jari.');
    });

    it('should cancel add fingerprint', () => {
      addFingerprint(200, 2000);
      getFingerprint(200, false);

      /*
       * Count how many times console error was called before this.
       * It should not be called again when the cancel button is clicked
       */
      cy.get('@consoleError')
        .its('callCount')
        .then((callCount) => {
          cy.getSection('button-add-fingerprint').click();
          cy.getSection('button-cancel-fingerprint-0').click();
          cy.get('@consoleError').its('callCount').should('eq', callCount);
        });

      cy.get('[data-pc-section="closebutton"]').click();
      cy.get('[role="dialog"]').should('not.exist');
    });

    it('should handle error get, add, and delete fingerprint', () => {
      addFingerprint(400);
      getFingerprint(200, false);
      cy.getSection('button-add-fingerprint').click();
      cy.wait('@addFingerprint');
      cy.contains('Sidik jari gagal ditambahkan.');

      getFingerprint(400);
      delFingerprint(400);
      cy.getSection('button-delete-fingerprint-0').click();
      cy.wait('@delFingerprint');
      cy.contains('Sidik jari gagal dihapus.');

      cy.get('[label="Karyawan"]').click();
      cy.get('[aria-label="Option List"]').within(() => {
        cy.contains('Admin User - PT Qtera Mandiri').click();
      });
      cy.get('body').click(0, 0);
      cy.wait('@getFingerprint');
      cy.contains('Sidik jari gagal dimuat.');
    });
  });

  describe('Device ID', () => {
    const getDevice = (statusCode: number = 200): void => {
      cy.intercept('GET', '**/api/employee/device-id/*', {
        statusCode,
        fixture: 'getDevice.json',
      }).as('getDevice');
    };

    const addDevice = (statusCode: number = 200, delay: number = 0): void => {
      cy.intercept('POST', '**/api/employee/device-id', {
        delay,
        statusCode,
      }).as('addDevice');
    };

    const getEmployeeOptions = (statusCode: number = 200): void => {
      cy.intercept(
        'GET',
        '**/api/absensi/pengajuan-tidak-masuk/employee-options',
        { fixture: 'getEmployeeOptions.json', statusCode },
      ).as('getEmployeeOptions');
    };

    const delDevice = (statusCode: number = 200): void => {
      cy.intercept('DELETE', '**/api/employee/device-id/*', {
        statusCode,
      }).as('delDevice');
    };

    beforeEach(() => {
      getDevice(200);
      addDevice(200);
      delDevice(200);
      getEmployeeOptions(200);

      cy.getSection('button-device').click();
      cy.wait('@getEmployeeOptions');

      cy.get('[label="Karyawan"]').click();
      cy.get('[aria-label="Option List"]').within(() => {
        cy.contains('32322 - PT Qtera Mandiri').click();
      });
      cy.get('body').click(0, 0);
      cy.wait('@getDevice');

      cy.get('[placeholder="Tulis device id"]').type('deviceid');
      cy.get('body').click(0, 0);
    });

    it('should add and delete device, then close dialog', () => {
      getDevice(200);
      cy.getSection('button-add-device').click();
      cy.wait('@addDevice');
      cy.contains('Sukses, berhasil menambahkan device ID.');

      getDevice(200);
      cy.getSection('button-delete-device-0').click();
      cy.wait('@delDevice');
      cy.contains('Sukses, berhasil menghapus device ID.');

      cy.get('[role="dialog"]').within(() => {
        cy.get('[data-pc-section="closebutton"]').click();
      });
      cy.get('[role="dialog"]').should('not.exist');
    });

    it('should handle error get, add, and delete device', () => {
      addDevice(400);
      getDevice(200);
      cy.getSection('button-add-device').click();
      cy.wait('@addDevice');
      cy.contains('Device ID gagal ditambahkan.');

      getDevice(400);
      delDevice(400);
      getEmployeeOptions(400);
      cy.getSection('button-delete-device-0').click();
      cy.wait('@delDevice');
      cy.contains('Device ID gagal dihapus.');

      cy.get('[label="Karyawan"]').click();
      cy.wait('@getEmployeeOptions');
      cy.get('[aria-label="Option List"]').within(() => {
        cy.contains('Admin User - PT Qtera Mandiri').click();
      });
      cy.get('body').click(0, 0);
      cy.wait('@getDevice');
      cy.contains('Device ID gagal dimuat.');
    });
  });

  describe('Merge Employee', () => {
    const getMergedEmployee = (statusCode: number = 200): void => {
      cy.intercept('GET', '**/api/employee/account/merged-employee/*', {
        statusCode,
        fixture: 'getMergedEmployee.json',
      }).as('getMergedEmployee');
    };

    const getEmployeeOptions = (statusCode: number = 200): void => {
      cy.intercept(
        'GET',
        '**/api/employee/account/available-employee-merged*',
        { fixture: 'getEmployeeOptions.json', statusCode },
      ).as('getEmployeeOptions');
    };

    const mergeAccount = (statusCode: number = 200): void => {
      cy.intercept('PUT', '**/api/employee/account/merge-account', {
        statusCode,
      }).as('mergeAccount');
    };

    const unmergeAccount = (statusCode: number = 200): void => {
      cy.intercept('PUT', '**/api/employee/account/unmerge-account', {
        statusCode,
      }).as('unmergeAccount');
    };

    beforeEach(() => {
      getEmployeeOptions();
      getMergedEmployee();
      mergeAccount();
      unmergeAccount();
      cy.getSection('button-merge').click();
    });

    const chooseMain = (): void => {
      cy.get('[label="Akun Utama"]').click();
      cy.wait('@getEmployeeOptions');
      cy.get('[aria-label="Option List"]').within(() => {
        cy.contains('32322 - PT Qtera Mandiri').click();
      });
      cy.wait('@getMergedEmployee');
    };

    const mergeSecond = (): void => {
      cy.get('[label="Akun Kedua"]').click();
      cy.get('[aria-label="Option List"]').within(() => {
        cy.contains('Admin User - PT Qtera Mandiri').click();
      });
      cy.get('[aria-label="Merge"]').click();
      cy.wait('@mergeAccount');
    };

    it('should unmerge account, merge account, then close dialog', () => {
      chooseMain();

      cy.get('[aria-label="Unmerge"]').click();
      cy.wait('@unmergeAccount');
      cy.contains('Sukses, data karyawan berhasil di-unmerge.');

      mergeSecond();
      cy.contains('Sukses, data karyawan berhasil di-merge.');

      cy.get('[role="dialog"]').within(() => {
        cy.get('[data-pc-section="closebutton"]').click();
      });
      cy.get('[role="dialog"]').should('not.exist');
    });

    it('should handle error unmerge, merge, and get merged account', () => {
      cy.wait('@getEmployeeOptions');
      chooseMain();

      unmergeAccount(400);
      cy.get('[aria-label="Unmerge"]').click();
      cy.wait('@unmergeAccount');
      cy.contains('Data karyawan gagal di-unmerge.');

      getMergedEmployee(400);
      chooseMain();

      mergeAccount(400);
      mergeSecond();
      cy.contains('Data karyawan gagal di-merge.');

      mergeAccount(403);
      cy.get('[aria-label="Merge"]').click();
      cy.wait('@mergeAccount');
      cy.getSection('dialog-confirm-title').contains(
        'Gagal Merge Akun Karyawan',
      );
      cy.getSection('cancel-button').click();

      getEmployeeOptions(400);
      chooseMain();
    });
  });
});
