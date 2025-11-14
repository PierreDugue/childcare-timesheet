// navigation.ts

import type { NavigateFunction } from "react-router";

let navigateFn: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction) => {
    navigateFn = navigate;
};

export const navigateTo = (path: string, options?: { replace?: boolean }) => {
    if (navigateFn) {
        navigateFn(path, options);
    } else {
        console.warn("Navigate function not initialized yet!");
    }
};
