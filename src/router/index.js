import { createRouter, createWebHashHistory } from 'vue-router'

// Import pages
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Menu from '../views/Menu.vue'
import Visit from '../views/Visit.vue'
import Book from '../views/Book.vue'
import Order from '../views/Order.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/visit',
    name: 'Visit',
    component: Visit
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router