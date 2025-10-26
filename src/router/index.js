import { createRouter, createWebHistory } from 'vue-router'
    import { useAuth } from '../composables/useAuth'

    const routes = [
    {
    path: '/',
    name: 'Landing',
    component: () => import('../pages/LandingPage.vue')
    },
    {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    beforeEnter: (to, from, next) => {
    const { user } = useAuth()
    if (user.value) {
    next('/dashboard')
    } else {
    next()
    }
    }
    },
    {
    path: '/auth/signup',
    name: 'Signup',
    component: () => import('../pages/Signup.vue'),
    beforeEnter: (to, from, next) => {
    const { user } = useAuth()
    if (user.value) {
    next('/dashboard')
    } else {
    next()
    }
    }
    },
    {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { requiresAuth: true }
    },
    {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('../pages/TicketManagement.vue'),
    meta: { requiresAuth: true }
    }
    ]

    const router = createRouter({
    history: createWebHistory(),
    routes
    })

    router.beforeEach((to, from, next) => {
    const { user } = useAuth()

    if (to.meta.requiresAuth && !user.value) {
    next('/auth/login')
    } else {
    next()
    }
    })

    export default router