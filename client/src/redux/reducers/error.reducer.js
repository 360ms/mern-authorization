import * as types from "../types"

const initialState = {}

export default (state = initialState, action) => {
    switch (action.types) {
        case types.GET_ERRORS:
            return {
                errors: action.payload,
            }

        default:
            return state
    }
}
