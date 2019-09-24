let courses = {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        setAll(state, data){
            state.data = data;
        },
    },
    actions: {
        setAll(context, data){
            context.commit('setAll', data);
        }
    },
    getters: {
        get: state => id => {
            let result = state.data.filter(function(item) {
                return item.id === parseInt(id)
            });

            if (result.length) {
                return result[0]
            }

            let lState = JSON.parse(localStorage.getItem('vuex'));
            if (lState.courses.data) {
                result = lState.courses.data.filter(function(item) {
                    return item.id === parseInt(id)
                });

                if (result.length) {
                    return result[0]
                }
            }

            throw new Error('Cant find model by id:' + id);
            return undefined
        },
        all: state => {
            if (!state.data.length) {
                let lState = JSON.parse(localStorage.getItem('vuex'));
                if (lState.courses.data) {
                    state.data = lState.courses.data
                }
            }
            return state.data
        }
    }
}

export default courses