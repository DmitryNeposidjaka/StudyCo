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
import Profile from './components/settings/Profile.vue'


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
                        title: 'dashboard'
                    }
                },
                {
                    path: '/products',
                    component: Products,
                    name: 'products',
                    meta: {
                        title: 'products'
                    }
                },
                {
                    path: '/articles',
                    component: Articles,
                    name: 'articles',
                    meta: {
                        title: 'articles'
                    }
                },
                {
                    path: '/articles/detail/:id',
                    component: ArticleDetail,
                    name: 'articleDetail',
                    meta: {
                        title: 'article_detail'
                    },
                },
                {
                    path: '/news',
                    component: News,
                    name: 'news',
                    meta: {
                        title: 'news'
                    }
                },
                {
                    path: '/courses',
                    component: Courses,
                    name: 'courses',
                    meta: {
                        title: 'courses'
                    },
                },
                {
                    path: '/courses/detail/:id',
                    component: CourseDetail,
                    name: 'coursesDetail',
                    meta: {
                        title: 'course_detail'
                    },
                },
                {
                    path: '/propositions',
                    component: Propositions,
                    name: 'propositions',
                    meta: {
                        title: 'propositions'
                    }
                },
                {
                    path: '/settings',
                    component: Settings,
                    name: 'settings',
                    meta: {
                        title: 'settings'
                    },
                    redirect: '/settings/profile',
                    children: [
                        {
                            path: 'profile',
                            component: Profile,
                            name: 'profile',
                            meta: {
                                title: 'profile'
                            }
                        },
                        {
                            path: 'avatar',
                            component: Avatar,
                            name: 'avatar',
                            meta: {
                                title: 'avatar'
                            }
                        },
                    ]
                },
            ]
        },

    ]
});



