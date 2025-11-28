export class DetailsPage {
  getAddFamilyButton() {
    return cy.getBySel("add-family-button");
  }

  getFamilyDialogTitle() {
    return cy.getBySel("family-dialog-title");
  }

  getFamilyDialogSubmitButton() {
    return cy.getBySel("add-family-submit-button");
  }

  getFamilyNameInput() {
    return cy.getBySel("family-name-input");
  }

  getEditFamilyButton(familyId: string) {
    return cy.getBySel(`edit-family-button-${familyId}`);
  }

  getDeleteFamilyButton(familyId: string) {
    return cy.getBySel(`delete-family-button-${familyId}`);
  }

  getViewLogsButton(familyId: string) {
    return cy.getBySel(`view-logs-button-${familyId}`);
  }

  getConfirmDeleteFamilyButton() {
    return cy.getBySel("delete-confirm-family");
  }

}
