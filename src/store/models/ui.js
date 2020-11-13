export default {
    state: {
        hideFooter: false
    },
    reducers: {
        toggleHideFooter: (state) => ({
            ...state,
            hideFooter: !state.hideFooter
        })
    }
}