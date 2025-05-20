import { 
        createRouter, 
        createWebHistory 
      }                      from 'vue-router';
import  Home                 from '../pages/Home.vue';
import  Category             from '../pages/Category.vue';
import  MainLayout           from '../layouts/MainLayout.vue';
import  Comic                from '../pages/Comic.vue';
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
    path: '/saved',
    name: 'Saved',
    component: MainLayout,
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
  {
    path: '/comics',
    name: 'Comics',
    component: MainLayout,
    children: [
        {
            path: ':slug',
            name: 'DynamicComic',
            component: Comic,
        }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    return { top: 0 }
  },
});

export default router;
