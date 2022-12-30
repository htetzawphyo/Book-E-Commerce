import { createRouter, createWebHistory } from 'vue-router'
import Index from '../dashboard/Index.vue'
import Author from '../dashboard/Author.vue'
import AddAuthor from '../dashboard/AddAuthor.vue'
import Book from '../dashboard/Book.vue'
import User from '../dashboard/User.vue'

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: Index
  },
  {
    path: '/admin/author',
    name: 'author',
    component: Author
  },
  {
    path: '/admin/add-author',
    name: 'addAuthor',
    component: AddAuthor
  },
  {
    path: '/admin/book',
    name: 'book',
    component: Book
  },
  {
    path: '/admin/user',
    name: 'user',
    component: User
  }
] 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router