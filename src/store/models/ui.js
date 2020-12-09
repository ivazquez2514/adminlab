const ui = {
    state: {
        hideFooter: false,
        activeForm: null,
        notification: null,
        formAction: null,
        searchbar: '',
        inputRef: null,
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
        }),
        setSearch: (state, payload) => ({
            ...state,
            searchbar: payload
        }),
        setInputRef: (state, payload) => ({
            ...state,
            inputRef: payload
        })
    }
}

export default ui;