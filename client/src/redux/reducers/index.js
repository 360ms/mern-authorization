import { combineReducers } from "redux"
import error from "./error.reducer"
import auth from "./auth.reducer"

export default combineReducers({
    error,
    auth,
})
