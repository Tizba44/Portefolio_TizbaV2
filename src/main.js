import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// Utilisez la fonction import() pour charger les composants de manière paresseuse
const Projects = () => import('./view/Projects.vue');
const About = () => import('./view/About.vue');

const routes = [
    { path: '/', component: Projects },
    { path: '/about', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
