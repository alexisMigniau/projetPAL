import {
    UPDATE_CURRENT_POSITION,
    UPDATE_RADIUS,
    UPDATE_CIRCONSCRIPTION,
    UPDATE_DEPARTEMENT,
    UPDATE_OPTIMIZED_PATH,
    UPDATE_REFRESH_POINTS
} from "./actions.type"

import {
    SET_CURRENT_POSITION,
    SET_RADIUS,
    SET_CIRCONSCRIPTION,
    SET_DEPARTEMENT,
    SET_OPTIMIZED_PATH,
    SET_REFRESH_POINTS
} from "./mutations.type"

const actions = {
    [UPDATE_CURRENT_POSITION]({ commit }, { currentPosition }) {
        commit(SET_CURRENT_POSITION, currentPosition)
    },
    [UPDATE_RADIUS]({ commit }, { radius }) {
        commit(SET_RADIUS, radius)
    },
    [UPDATE_CIRCONSCRIPTION]({ commit }, { circonscription }) {
        commit(SET_CIRCONSCRIPTION, circonscription)
    },
    [UPDATE_DEPARTEMENT]({ commit }, { departement }) {
        commit(SET_DEPARTEMENT, departement)
    },
    [UPDATE_OPTIMIZED_PATH]({ commit }, { optimizedPath }) {
        commit(SET_OPTIMIZED_PATH, optimizedPath)
    },
    [UPDATE_REFRESH_POINTS]({ commit }, { refreshPoints }) {
        commit(SET_REFRESH_POINTS, refreshPoints)
    }
}

export default actions
