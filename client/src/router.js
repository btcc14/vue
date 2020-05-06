import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/rainbow',
    // },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/rainbow',
      name: 'rainbow',
      component: () => import('./components/Rainbow.vue'),
    },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (!loggedIn && authRequired) {
    next('/login');
  } else {
    next();
  }
});
