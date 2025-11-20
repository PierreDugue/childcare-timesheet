import { describe, it, expect } from "vitest";
import reducer, { showSnackbar, hideSnackbar } from "./ui-slice";

const initialState: any = {
  open: false,
  message: "",
  severity: "info",
};

describe("uiSlice", () => {
  it("should return initial state when passed an empty action", () => {
    const result = reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should set open=true, message and severity on showSnackbar", () => {
    const result = reducer(
      initialState,
      showSnackbar({ message: "Saved!", severity: "success" })
    );

    expect(result.open).toBe(true);
    expect(result.message).toBe("Saved!");
    expect(result.severity).toBe("success");
  });

  it("should default severity to 'info' when not provided", () => {
    const result = reducer(
      initialState,
      showSnackbar({ message: "Hello" })
    );

    expect(result.open).toBe(true);
    expect(result.message).toBe("Hello");
    expect(result.severity).toBe("info"); // default
  });

  it("should set open=false but keep message & severity on hideSnackbar", () => {
    const startState: any = {
      open: true,
      message: "Something happened",
      severity: "warning",
    };

    const result = reducer(startState, hideSnackbar());

    expect(result.open).toBe(false);
    expect(result.message).toBe("Something happened");
    expect(result.severity).toBe("warning");
  });
});
