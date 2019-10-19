import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router.js'
import VueAxios from 'vue-axios'
import axios from './axios'
import alert from './plugins/alert'
import store from './store/index'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(require('vue-moment'));

const i18n = new VueI18n({
    locale: 'ua',
    messages: {
        ua: require('../locales/ua'),
        en: require('../locales/en'),
    }
});

new Vue({
    vuetify,
    i18n,
    router,
    alert,
    store,
    render: h => h(App)
}).$mount('#app');
