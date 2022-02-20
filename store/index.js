const state = () => ({

});

const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn;
    },
    loggedInUser(state) {
        return state.auth.user;
    },
};

const actions = {
};
const mutations = {
};

export {
    state, getters, actions, mutations,
};
