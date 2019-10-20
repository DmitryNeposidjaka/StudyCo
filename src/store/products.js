let articles = {
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
                return item.id === id
            })

            if (result.length) {
                return result[0]
            }
            throw new Error('Cant find model by id:' + id);
            return undefined
        },
        all: state => {
            return state.data
        }
    }
}

export default articles