import { describe, it, expect } from "vitest";
import reducer, {
    fecthAllFamiliesSuccess,
    addFamilySuccess,
    updateFamilySuccess,
    removeFamilySuccess,
    addLogsSuccess,
    removeLogSuccess,
    selectFamilyById,
} from "./family-slice";

const sampleFamily = {
    familyId: "f1",
    userId: "u1",
    name: "Doe Family",
    logs: []
};

const sampleFamily2 = {
    familyId: "f2",
    userId: "u2",
    name: "Smith Family",
    logs: []
};

const initialState = {
    value: []
};

describe("familySlice reducer", () => {
    it("should update store with family list on fecthAllFamiliesSuccess", () => {
        const result = reducer(
            initialState,
            fecthAllFamiliesSuccess([sampleFamily, sampleFamily2])
        );

        expect(result.value.length).toBe(2);
        expect(result.value[0].familyId).toBe("f1");
    });

    it("should update store with new family on addFamilySuccess", () => {
        const startState = { value: [sampleFamily] };

        const newFamily = { familyId: "f3", name: "Another", logs: [] };

        const result = reducer(startState, addFamilySuccess(newFamily));

        expect(result.value.length).toBe(2);
        expect(result.value[1].familyId).toBe("f3");
    });

    it("should update family name on store on updateFamilySuccess", () => {
        const startState = {
            value: [
                { ...sampleFamily, name: "Old Name" }
            ]
        };

        const updated = { ...sampleFamily, name: "New Name" };

        const result = reducer(startState, updateFamilySuccess(updated));

        expect(result.value[0].name).toBe("New Name");
    });

    it("should remove family from store on removeFamilySuccess", () => {
        const startState = { value: [sampleFamily, sampleFamily2] };

        const result = reducer(startState, removeFamilySuccess("f2"));

        expect(result.value.length).toBe(1);
        expect(result.value[0].familyId).toBe("f1");
    });

    it("should add log on store on addLogsSuccess", () => {
        const startState = {
            value: [
                { ...sampleFamily, logs: [] }
            ]
        };

        const result = reducer(startState,
            addLogsSuccess({
                family: "f1",
                id: 1,
                date: new Date("2024-01-23T09:07:00Z"),
                startHour: "10:00",
                endHour: "11:00",
                comment: "test",
                signature: "sig"
            })
        );

        expect(result.value[0].logs.length).toBe(1);
        expect(result.value[0].logs[0].id).toBe(1);
    });

    it("should update existing log on store on addLogsSuccess", () => {
        const existingLog = {
            id: 1,
            date: new Date("2024-01-23T09:07:00Z"),
            startHour: "08:00",
            endHour: "09:00",
            comment: "old",
            signature: "old"
        };

        const startState = {
            value: [
                { ...sampleFamily, logs: [existingLog] }
            ]
        };

        const result = reducer(startState,
            addLogsSuccess({
                family: "f1",
                id: 1,
                date: new Date("2024-01-23T09:07:00Z"),
                startHour: "10:00",
                endHour: "11:00",
                comment: "updated",
                signature: "sig"
            })
        );

        const updated = result.value[0].logs[0];
        expect(updated.startHour).toBe("10:00");
        expect(updated.comment).toBe("updated");
    });

    it("should remove the correct log on removeLogSuccess", () => {
        const startState: any = {
            value: [
                {
                    ...sampleFamily,
                    logs: [
                        { id: 1, date: "2024-01-01" },
                        { id: 2, date: "2024-02-02" }
                    ]
                }
            ]
        };

        const result = reducer(
            startState,
            removeLogSuccess({ familyId: "f1", logId: 1 })
        );

        expect(result.value[0].logs.length).toBe(1);
        expect(result.value[0].logs[0].id).toBe(2);
    });
});

describe("selectFamilyById selector", () => {
    it("should return the matching family", () => {
        const state: any = {
            family: {
                value: [sampleFamily, sampleFamily2]
            }
        };

        const family = selectFamilyById(state, "f2");

        expect(family?.familyId).toBe("f2");
    });

    it("should return undefined if not found", () => {
        const state: any = {
            family: {
                value: [sampleFamily]
            }
        };

        const family = selectFamilyById(state, "missing");
        expect(family).toBeUndefined();
    });
});
