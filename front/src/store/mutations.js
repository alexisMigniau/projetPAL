import {
    SET_CURRENT_POSITION,
    SET_RADIUS,
    SET_CIRCONSCRIPTION,
    SET_DEPARTEMENT,
    SET_OPTIMIZED_PATH,
    SET_REFRESH_POINTS
} from "./mutations.type";

const mutations = {
    [SET_CURRENT_POSITION](state, currentPosition) {
        state.currentPosition = currentPosition
    },
    [SET_RADIUS](state, radius) {
        state.radius = radius
    },
    [SET_CIRCONSCRIPTION](state, circonscription) {
        state.circonscription = circonscription
    },
    [SET_DEPARTEMENT](state, departement) {
        state.departement = departement
    },
    [SET_OPTIMIZED_PATH](state, optimizedPath) {
        state.optimizedPath = optimizedPath
    },
    [SET_REFRESH_POINTS](state, refreshPoints) {
        state.refreshPoints = refreshPoints
    }
};

export default mutations;