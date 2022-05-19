import {
    UPDATE_OPTIMIZED_PATH
} from "./actions.type"

import {
    SET_OPTIMIZED_PATH
} from "./mutations.type"

const actions = {
    [UPDATE_OPTIMIZED_PATH]({ commit }, { optimizedPath }) {
        commit(SET_OPTIMIZED_PATH, optimizedPath)
    }
}

export default actions
