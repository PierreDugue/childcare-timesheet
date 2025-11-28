import { DetailsPage } from "../helpers/details.helper";
import {
  stubAddFamily,
  stubDeleteFamily,
  stubFetchAllFamilies,
  stubTimerLogs,
  stubUpdateFamily,
} from "../stubs/api-stubs";

const Details = new DetailsPage();
const logRequestBody = {
  name: "New Family",
  familyId: "",
  logs: [],
};

describe("details", () => {
  beforeEach(() => {
    cy.loginFake();
    stubFetchAllFamilies("families-with-logs.json").as("fetchAllFamilies");
    stubAddFamily("new-family-response.json").as("addFamily");
    stubUpdateFamily("update-family-response.json", "fakeId-1").as(
      "updateFamily"
    );
    stubDeleteFamily("fakeId-1").as("deleteFamily");
    stubTimerLogs("timer-log.json").as("timerLogs");

    cy.visit("/settings");
    cy.wait("@fetchAllFamilies");
  });

  it("should display existing families on loading", () => {
    cy.findByRole("gridcell", { name: "first family" }).should("be.visible");
    cy.findByRole("gridcell", { name: "second family" }).should("be.visible");
  });

  it("should send the delete request to remove a family", () => {
    Details.getDeleteFamilyButton("fakeId-1").click();
    Details.getConfirmDeleteFamilyButton().click();

    cy.wait("@deleteFamily").then(({ request }) => {
      expect(request.url).to.include("/fakeId-1/");
    });
  });

  it("should redirect to log details page", () => {
    Details.getViewLogsButton("fakeId-1").click();
    cy.url().should("include", "/details/fakeId-1");
  });

  it("should send the request to add a family", () => {
    Details.getAddFamilyButton().click();
    Details.getFamilyDialogTitle().should("contain", "Add family");

    Details.getFamilyDialogSubmitButton().should("be.disabled");
    Details.getFamilyNameInput().type("New Family");
    Details.getFamilyDialogSubmitButton().should("not.be.disabled");
    Details.getFamilyDialogSubmitButton().click();

    cy.wait("@addFamily").then(({ request, response }) => {
      expect(request.body).to.deep.equal(logRequestBody);
      expect(response.body).to.deep.equal(
        require("../fixtures/new-family-response.json")
      );
    });
  });

  it("should send request to update family name", () => {
    Details.getEditFamilyButton("fakeId-1").click();
    Details.getFamilyDialogTitle().should("contain", "Update family");

    Details.getFamilyNameInput().clear().type("Updated Family");
    Details.getFamilyDialogSubmitButton().click();

    cy.wait("@updateFamily").then(({ request, response }) => {
      expect(request.body).to.deep.equal({
        name: "Updated Family",
      });
      expect(response.body).to.deep.equal(
        require("../fixtures/update-family-response.json")
      );
    });
  });
});
