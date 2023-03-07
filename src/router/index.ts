import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/404'
        },
        {
            path: '/404',
            component: () => import('../pages/404.vue')
        },
        {
            path: '/home',
            component: () => import('../pages/Home.vue'),
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/info',
            component: () => import('../pages/Info.vue'),
        },
        {
            path: '/login',
            component: () => import('../pages/Login.vue')
        },
        {
            path: '/articles',
            component: () => import('../pages/Articles.vue'),
            children: [
                {
                    path: '',
                    component: () => import('../pages/ArticlesChildren/articles.vue')
                },
                {
                    path: ':id',
                    component: () => import('../pages/ArticlesChildren/article.vue')
                },
                {
                    path: 'edit',
                    component: () => import('../pages/ArticlesChildren/editAticle.vue'),
                    meta: {
                        requireLogin: true
                    }
                }
            ]
        }
    ]
})


export default router