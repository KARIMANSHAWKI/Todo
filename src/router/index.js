import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import "tailwindcss/tailwind.css"


const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/todos',
    name: 'Todos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Todos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
