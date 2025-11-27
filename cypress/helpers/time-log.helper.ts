export class TimeLogPage {
  getFamilySelector() {
    return cy.getBySel("time-log-family-select");
  }

  getFamilySelectorSelectOption(option: string) {
    return cy.getBySel(`time-log-family-select-option-${option}`);
  }

  getFamiliySelectorError() {
    return cy.getBySel("time-log-family-select-option-error");
  }

  getDateInput() {
    return cy.getBySel("time-log-date-input");
  }

  getNowButton(option: string) {
    return cy.getBySel(`time-log-set-${option}-now-button`);
  }

  getCommentInput() {
    return cy.getBySel("time-log-comment-input");
  }

  getSaveLogButton() {
    return cy.getBySel("time-log-save-log-button");
  }

  getSignatureCanvas() {
    return cy.getBySel("time-log-signature-canvas");
  }

  getHourInput(option: string) {
    return cy.getBySel(`time-log-${option}-hour-input`);
  }

  getResetButton() {
    return cy.getBySel("time-log-reset-button");
  }

  getAddFamilyButton() {
    return cy.getBySel("time-log-add-family-button");
  }
}
