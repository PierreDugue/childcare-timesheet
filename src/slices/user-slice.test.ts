import { describe, it, expect } from "vitest";
import reducer, {
  authSuccess,
  logout,
} from "./user-slice";

const initialState = {
  currentUser: {
    userName: "",
    userEmailAddress: "",
    token: "",
    config: [],
  },
};

describe("userSlice", () => {
  it("should return the initial state when passed an empty action", () => {
    const result = reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should set the token on auth success", () => {
    const previousState = initialState as any;

    const result = reducer(previousState, authSuccess("abc123"));

    expect(result.currentUser.token).toBe("abc123");
  });

  it("should reset user to initial state on logout", () => {
    const modifiedState = {
      currentUser: {
        userName: "John",
        userEmailAddress: "john@example.com",
        token: "xyz",
        config: ["something"],
      },
    };

    const result = reducer(modifiedState as any, logout());

    expect(result).toEqual(initialState);
  });
});
