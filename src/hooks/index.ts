import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<Dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAuth = () => {
    const user = useAppSelector(state => state.userReducer.user)
    return !!user
}