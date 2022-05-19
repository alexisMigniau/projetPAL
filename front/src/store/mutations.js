import {
    SET_OPTIMIZED_PATH
} from "./mutations.type";

const mutations = {
    [SET_OPTIMIZED_PATH](state, optimizedPath) {
        state.optimizedPath = optimizedPath
    }
};

export default mutations;