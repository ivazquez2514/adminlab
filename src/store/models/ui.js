const ui = {
    state: {
        hideFooter: false,
        activeForm: null,
        notification: null,
        formAction: null,
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
        }),
        setFormAction: (state, payload) => ({
            ...state,
            formAction: payload
        })
    }
}

export default ui;