import { TimeLogPage } from "../helpers/time-log.helper";
import { stubAuthUser, stubFetchAllFamilies } from "../stubs/api-stubs";

const TimeLog = new TimeLogPage();

describe("Time logger test", () => {
  beforeEach(() => {
    stubAuthUser("../fixtures/user.json").as("authUser");
    stubFetchAllFamilies("../fixtures/families-with-logs.json").as(
      "fetchAllFamilies"
    );

    cy.visit("about:blank");

    cy.wait("@authUser");

    cy.visit("/");
  });

  it("should save a log", () => {
    TimeLog.getFamilySelector().click();
  });
});
