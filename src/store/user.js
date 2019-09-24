let user = {
    namespaced: true,
    state: {
        data: {}
    },
    mutations: {
        set(state, data){
            state.data = data;
        },
    },
    actions: {
        set(context, data){
            context.commit('set', data);
        }
    },
    getters: {
        get: state => {
            if (state) {
                return state.data
            }

            let lState = JSON.parse(localStorage.getItem('vuex'));
            if (lState.user) {
                state.data = lState.user.data
                return lState.user.data;
            }

            throw new Error('Cant find user!');
            return undefined
        }
    }
}

export default user