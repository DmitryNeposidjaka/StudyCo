import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login'
import Main from './components/Main'
import Dashboard from './components/Dashboard.vue'
import Products from './components/Products.vue'
import Articles from './components/Articles.vue'
import News from './components/News.vue'
import Courses from './components/Courses.vue'
import CourseDetail from './components/detail/CourseDetail.vue'
import ArticleDetail from './components/detail/ArticleDetail.vue'
import Propositions from './components/Propositions.vue'
import Settings from './components/settings/Settings.vue'
import Avatar from './components/settings/Avatar.vue'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            component: Login,
            name: 'login',
        },
        {
            path: '/',
            redirect: '/dashbord',
            component: Main,
            name: 'main',
            children: [
                {
                    path: '/dashbord',
                    component: Dashboard,
                    name: 'dashboard',
                    meta: {
                        title: 'Dashboard'
                    }
                },
                {
                    path: '/products',
                    component: Products,
                    name: 'products',
                    meta: {
                        title: 'Products'
                    }
                },
                {
                    path: '/articles',
                    component: Articles,
                    name: 'articles',
                    meta: {
                        title: 'Articles'
                    }
                },
                {
                    path: '/articles/detail/:id',
                    component: ArticleDetail,
                    name: 'articleDetail',
                    meta: {
                        title: 'Article detail'
                    },
                },
                {
                    path: '/news',
                    component: News,
                    name: 'news',
                    meta: {
                        title: 'News'
                    }
                },
                {
                    path: '/courses',
                    component: Courses,
                    name: 'courses',
                    meta: {
                        title: 'Courses'
                    },
                },
                {
                    path: '/courses/detail/:id',
                    component: CourseDetail,
                    name: 'coursesDetail',
                    meta: {
                        title: 'Course detail'
                    },
                },
                {
                    path: '/propositions',
                    component: Propositions,
                    name: 'propositions',
                    meta: {
                        title: 'Propositions'
                    }
                },
                {
                    path: '/settings',
                    component: Settings,
                    name: 'settings',
                    meta: {
                        title: 'Settings'
                    },
                    children: [
                        {
                            path: 'avatar',
                            component: Avatar,
                            name: 'avatar',
                            meta: {
                                title: 'Avatar'
                            }
                        },
                    ]
                },
            ]
        },

    ]
});



