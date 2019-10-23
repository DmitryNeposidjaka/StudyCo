import Vue from 'vue'
import Vuex from 'vuex'
import courses from './courses'
import articles from './articles'
import propositions from './propositions'
import products from './products'
import news from './news'
import user from './user'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        courses,
        articles,
        propositions,
        products,
        news,
        user
    },
});

export default store