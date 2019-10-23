import Axios from '../axios.js'

let user = {
    namespaced: true,
    state: {
        data: {}
    },
    mutations: {
        set(state, data) {
            state.data = data;
        },
        setProperty(state, data) {
            state.data[data.key] = data.value;
        }
    },
    actions: {
        set(context, data) {
            context.commit('set', data);
        },
        setProperty(context, data) {
            let props = {};
            props[data.key] = data.value;
            Axios({
                method: 'patch',
                url: 'user/me',
                data: props
            }).then(function (response) {
                if (response.status == 201) {
                    context.commit('setProperty', data);
                }
            });
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