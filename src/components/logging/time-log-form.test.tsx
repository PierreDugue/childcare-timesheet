/// <reference types="vitest" />

import { fireEvent, render, screen } from "@testing-library/react";
import * as reactRedux from 'react-redux';
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TimeLogForm } from "./time-log-form";

// const setValue = vi.fn();

const mockDispatch = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => selector({}),
}));
vi.mock('react-signature-canvas', () => {
  return {
    default: () => <div data-testid="signature-canvas" />,
  };
});

describe("TimeLogForm", () => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
  const useDispatcMock = vi.spyOn(reactRedux, 'useDispatch')
  const useSelectorcMock = vi.spyOn(reactRedux, 'useSelector')

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockClear();
    useSelectorcMock.mockImplementation((selectorFn) => {
      const fakeState = {
        family: {
          value: [{
            familyId: 'fake-family-id',
            name: 'test-family',
            logs: [{
              id: 10,
              date: "2025-11-12T00:00:00Z",
              startHour: "11:57",
              endHour: "11:57",
              comment: "Test",
              signature: ""
            }]
          }]
        },
        families: {
          value: [
            {
              familyId: 'fake-family-id',
              name: 'test-family',
              logs: []
            }]
        }
      };

      return selectorFn(fakeState);
    });
  });

  it("sets current time when clicking 'Now'", async () => {
    vi.useFakeTimers().setSystemTime(new Date("2024-01-23T09:07:00Z"));

    render(<TimeLogForm />);

    const btn = screen.getAllByRole("button", { name: /now/i })[0];

    fireEvent.click(btn);

    const startInput: any = screen.getByLabelText(/Start Hour/i);
    expect(startInput.value).toBe("09:07");
  });


  it("dispatches addLogs on form submit", () => {
    render(<TimeLogForm />);

    const submitButton = screen.getByText("Save", { selector: "button" });

    fireEvent.click(submitButton);

    expect(useDispatcMock).toHaveBeenCalled();
  });
});
