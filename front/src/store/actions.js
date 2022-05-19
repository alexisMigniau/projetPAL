import {
    UPDATE_OPTIMIZED_PATH,
    UPDATE_RADIUS
} from "./actions.type"

import {
    SET_OPTIMIZED_PATH,
    SET_RADIUS
} from "./mutations.type"

const actions = {
    [UPDATE_OPTIMIZED_PATH]({ commit }, { optimizedPath }) {
        commit(SET_OPTIMIZED_PATH, optimizedPath)
    },
    [UPDATE_RADIUS]({ commit }, { radius }) {
        commit(SET_RADIUS, radius)
    }
}

export default actions
