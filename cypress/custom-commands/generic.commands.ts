import { config } from "chai";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Function to get an element using the data-cy attribute
       * @param selector - data-cy attribute value
       * @param args - additional arguments
       */
      getBySel(selector: string, ...args: any[]): Cypress.Chainable<Subject>;

      /**
       * @param {string} text - new text to enter in element
       */
      clearInputAndType(
        text: string,
        options?: any
      ): Cypress.Chainable<Subject>;

      loginFake(): Cypress.Chainable<null>;
    }
  }
}

export function setUpGenericCommands(): void {
  Cypress.Commands.add(
    "getBySel",
    { prevSubject: "optional" },
    (subject, selector, ...args) => {
      if (subject) {
        return cy.wrap(subject).find(`[data-cy="${selector}"]`, ...args);
      }
      return cy.get(`[data-cy="${selector}"]`, ...args);
    }
  );

  Cypress.Commands.add(
    "clearInputAndType",
    { prevSubject: true },
    (subject, text: string, options?) => {
      cy.wrap(subject).clear();
      cy.wrap(subject).type(`{selectAll}${text}`, options);
    }
  );

  Cypress.Commands.add("loginFake", () => {
    const userSlice = {
      userName: "",
      userEmailAddress: "",
      token: "FAKE_TOKEN_123",
      config: [],
    };

    const persistRoot = {
      currentUser: JSON.stringify(userSlice),
      _persist: JSON.stringify({
        version: 1,
        rehydrated: true,
      }),
    };

    window.localStorage.setItem("persist:root", JSON.stringify(persistRoot));
  });
}
