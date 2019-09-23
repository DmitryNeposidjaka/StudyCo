import Vue from 'vue'
import Vuex from 'vuex'
import courses from './courses'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        courses
    }
})

export default store