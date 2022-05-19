import {
    SET_OPTIMIZED_PATH,
    SET_RADIUS
} from "./mutations.type";

const mutations = {
    [SET_OPTIMIZED_PATH](state, optimizedPath) {
        state.optimizedPath = optimizedPath
    },
    [SET_RADIUS](state, radius) {
        state.radius = radius
    },
};

export default mutations;