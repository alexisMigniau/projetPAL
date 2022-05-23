const getters = {
    currentPosition(state) {
        return state.currentPosition
    },
    radius(state) {
        return state.radius
    },
    circonscription(state) {
        return state.circonscription
    },
    departement(state) {
        return state.departement
    },
    optimizedPath(state) {
        return state.optimizedPath
    },
    refreshPoints(state) {
        return state.refreshPoints
    }
}

export default getters;