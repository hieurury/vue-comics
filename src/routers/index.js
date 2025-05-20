import { 
        createRouter, 
        createWebHistory 
      }                      from 'vue-router';
import  Home                 from '../pages/Home.vue';
import  Category             from '../pages/Category.vue';
import  MainLayout           from '../layouts/MainLayout.vue';
import  ReadLayout           from '../layouts/ReadLayout.vue';
import  Comic                from '../pages/Comic.vue';
import  Read                 from '../pages/Read.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    children: [
        { 
            path: '', 
            name: 'HomePage', 
            component: Home,
            meta: { layout: MainLayout }
        },
    ]
  },
  {
    path: '/saved',
    name: 'Saved',
    component: MainLayout,
    meta: { layout: MainLayout }
  },
  {
    path: '/categories',
    name: 'Categories',
    children: [
        {
            path: ':slug',
            name: 'DynamicCategory',
            component: Category, // Lazy-loaded
            meta: { layout: MainLayout }
        }
    ]
  },
  {
    path: '/comics',
    name: 'Comics',
    children: [
        {
            path: ':slug',
            name: 'DynamicComic',
            component: Comic,
            meta: { layout: MainLayout }
        },
        {
            path: ':slug/:id',
            name: 'DynamicChapter',
            component: Read,
            meta: { layout: ReadLayout }
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
