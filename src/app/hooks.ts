import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"

export const useAppDisptach = useDispatch.withTypes<AppDispatch>()
export useAppSelector = useSelector.withTypes<RootState>()