import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Movie from '../pages/Movie.vue';
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
    path: '/movie',
    name: 'Movie',
    component: MainLayout,
    children: [
        {
            path: ':slug',
            name: 'DynamicMovie',
            component: Movie, // Lazy-loaded
        }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
