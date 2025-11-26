const BASE_URL = "https://childcare-timesheet-api.onrender.com/";
const AUTH_PATH = `${BASE_URL}api/token/`;
const FAMILY_PATH = `${BASE_URL}api/families/`;
const LOGS_PATH = `${BASE_URL}api/logs/`;

export function stubAuthUser(fixture: string): Cypress.Chainable<null> {
  return cy.intercept("POST", AUTH_PATH, {
    fixture,
  });
}

export function stubFetchAllFamilies(fixture: string): Cypress.Chainable<null> {
  return cy.intercept("GET", FAMILY_PATH, {
    fixture,
  });
}

export function stubTimerLogs(fixture: string): Cypress.Chainable<null> {
  return cy.intercept("POST", LOGS_PATH, {
    fixture,
  });
}
