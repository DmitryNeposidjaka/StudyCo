import Vue from 'vue'
import Vuex from 'vuex'
import courses from './courses'
import articles from './articles'
import propositions from './propositions'
import news from './news'
import user from './user'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
    reducer: state => ({
        courses: state.courses,
        articles: state.articles,
        user: state.user
        // getRidOfThisModule: state.getRidOfThisModule (No one likes it.)
    })
});

const store = new Vuex.Store({
    modules: {
        courses,
        articles,
        propositions,
        news,
        user
    },
    plugins: [vuexLocalStorage.plugin]
});

export default store