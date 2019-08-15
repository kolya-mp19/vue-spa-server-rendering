import Vue from 'vue'
import VueRouter from 'vue-router'
// import Category from './theme/Category.vue'
// import Login from './theme/Login.vue'
// import NotFound from './theme/NotFound.vue'

// загружаем не все как с import а только то, что нужно
const Category = () => System.import('./theme/Category.vue')
const Login = () => System.import('./theme/Login.vue')
const NotFound = () => System.import('./theme/NotFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // активная ссылка
  linkActiveClass: 'is-active',
  // поведение прокрутки
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    { path: '/category/:id', name: 'category', component: Category },
    { path: '/login', component: Login },
    { path: '/', redirect: '/category/front-end' },
    // обрабатываем все неизвестные ссылки и выводим компонент NotFound
    { path: '*', component: NotFound }
  ]
})

export default router
