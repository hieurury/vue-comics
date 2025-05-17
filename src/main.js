import { createApp } from "vue";
import App from './App.vue';
import router from './routers/index';
import './css/tailwind.css'; // Import Tailwind CSS

createApp(App).use(router).mount('#app');