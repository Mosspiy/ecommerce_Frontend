import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import test from '../views/test1.vue'
import register from '../views/register.vue'
import account from '@/views/account.vue'
import Products from '@/views/Products.vue'
import address from '@/views/address.vue'
import orderStatus from '@/views/orderStatus.vue'
import userCart from '@/views/userCart.vue'
import orderHistory from '@/views/orderHistory.vue'
import contactUs from '@/views/contactUs.vue'
import favorites from '@/views/favorites.vue'

import AdminLogin from '@/views/admin/LoginView.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'
import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderDetail from '@/views/admin/order/DetailView.vue'

// store
import { useAccountStore } from '@/stores/account';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/orderStatus',
      name: 'orderStatus',
      component: orderStatus
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: userCart
    },
    {
      path: '/orderHistory',
      name: 'orderHistory',
      component: orderHistory
    },
    {
      path: '/contact',
      name: 'contactUs',
      component: contactUs
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: favorites
    },


    /*Admin site */
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/products',
      name: 'AdminProductList',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'AdminProductCreate',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/:id',
      name: 'AdminProductUpdate',
      component: AdminProductUpdate
    },
    {
      path: '/admin/orders',
      name: 'AdminOrderList',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'AdminOrderDetail',
      component: AdminOrderDetail
    },
    
    


  ]
})

router.beforeEach(async (to, from, next) => {
  const AccountStore = useAccountStore();
  await AccountStore.checkAuth();

  if (!AccountStore.isAdmin && to.name.includes("Admin")) {
    next({ name: "home" });
  } else {
    next();
  }
})

export default router
