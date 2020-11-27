const cabinet = {
    state: {
        cabinet: null,
    },
    reducers: {
        setCabinet(state, payload) {
            return {
                ...state,
                cabinet: payload
            }
        },
    }
};

export default cabinet;