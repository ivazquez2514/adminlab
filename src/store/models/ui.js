const ui = {
    state: {
        hideFooter: false,
        activeForm: null,
        notification: null
    },
    reducers: {
        toggleHideFooter: (state) => ({
            ...state,
            hideFooter: !state.hideFooter
        }),
        setActiveForm: (state, payload) => ({
            ...state,
            activeForm: payload
        }),
        setNotification: (state, payload) => ({
            ...state,
            notification: payload
        })
    }
}

export default ui;