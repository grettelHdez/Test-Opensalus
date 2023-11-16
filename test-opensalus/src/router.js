import { createRouter, createWebHistory } from "vue-router";
import HomeView from './views/HomeView.vue';
import ChangeIcon from './views/ChangeIcon.vue'
import QRCode from './views/QRCode.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    
    {
        path: '/changeIcon',
        name: 'changeIcon',
        component: ChangeIcon
    },

    {
        path: '/qrCode',
        name: 'qrCode',
        component: QRCode
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;