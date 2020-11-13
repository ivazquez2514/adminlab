export default {
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
            return {
                ...state,
                isAuthenticated: false,
                authenticatedUser: null
            }
        }
    }
};