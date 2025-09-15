Cypress.Commands.add('getSection', (section) => {
  cy.get(`[data-wv-section="${section}"]`);
});

Cypress.Commands.add('getByName', (name) => {
  cy.get(`[data-wv-name="${name}"]`);
});

Cypress.Commands.add('login', () => {
  const user = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTRjNDI1M2RkMTAxN2YyODY4OTU3MiIsImNvbXBhbnkiOiI2NWVhNzhhYmY0NTgyNTc4NWI2OGEyZDciLCJjb21wYW55Q29kZSI6IjAwMHYyIiwic2Vzc2lvbiI6IjY1ZWE4M2JjZGRhNWY4OTI4MDA5MTJmNyIsImlhdCI6MTcwOTg2Nzk2NX0.55us-qRS19o--2GYcST2LSUN1MzZsZMBQNGyZuI1d5M',
  };

  localStorage.setItem('user', JSON.stringify(user));
});

Cypress.Commands.add('getByData', (dataName: string, value: string) => {
  cy.get(`[data-${dataName}="${value}"]`);
});
