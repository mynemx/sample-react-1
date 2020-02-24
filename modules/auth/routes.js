import Login from './pages/login';

export default [
    {
      path: '/login',
      exact: true,
        auth: false,
      component: Login,
    },
  ]