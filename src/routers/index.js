import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Category from '../pages/Category.vue';
import MainLayout from '../layouts/MainLayout.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainLayout,
    children: [
        { path: '', name: 'HomePage', component: Home },
    ]
  },
  {
    path: '/categories',
    name: 'Categories',
    component: MainLayout,
    children: [
        {
            path: ':slug',
            name: 'DynamicCategory',
            component: Category, // Lazy-loaded
        }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
