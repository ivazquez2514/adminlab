const auth = {
    state: {
        isAuthenticated: false,
        authenticatedUser: null,
    },
    reducers: {
        authenticate(state, payload) {
            return {
                ...state,
                isAuthenticated: true,
                authenticatedUser: payload
            }
        },
        logout(state) {
            localStorage.removeItem('adminlab-lastInteraction');
            localStorage.removeItem('adminlab-auth');
            return {
                ...state,
                isAuthenticated: false,
                authenticatedUser: null
            }
        }
    }
};

export default auth;