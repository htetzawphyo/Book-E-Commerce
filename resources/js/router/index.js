import { createRouter, createWebHistory } from 'vue-router'
import Index from '../dashboard/Index.vue'
import Author from '../dashboard/author/Author.vue'
import AddAuthor from '../dashboard/author/AddAuthor.vue'
import EditAuthor from '../dashboard/author/EditAuthor.vue'
import Book from '../dashboard/book/Book.vue'
import AddBook from '../dashboard/book/AddBook.vue'
import EditBook from '../dashboard/book/EditBook.vue'
import User from '../dashboard/user/User.vue'
import Register from '../auth/Register.vue'
import Login from '../auth/Login.vue'
import Home from '../front/Home.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login 
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
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
    path: '/admin/edit-author/:id',
    name: 'editAuthor',
    component: EditAuthor,
    props: true
  },
  {
    path: '/admin/book',
    name: 'book',
    component: Book
  },
  {
    path: '/admin/add-book',
    name: 'addBook',
    component: AddBook
  },
  {
    path: '/admin/edit-book/:id',
    name: 'editBook',
    component: EditBook,
    props: true
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