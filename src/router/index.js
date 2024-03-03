import { createRouter, createWebHashHistory } from 'vue-router'
import HomeLayout from '@/views/HomeLayout'

const routes = [
  {
    path: '/',
    name: 'HomeLayout',
    component: HomeLayout,
    children: [
      { path: '', name: 'Home', component: () => import('@/views/HomeView') },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/ProductsView')
      },

      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/CartView')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView')
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/ProductView')
      }
    ]
  },
  {
    path: '/admin',
    name: 'adminLayout',
    component: () => import('@/views/Admin/AdminLayout'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/Admin/AdminProducts')
      },
      {
        path: 'add-product',
        component: () => import('@/views/Admin/AddProduct')
      },
      {
        path: 'edit-product/:id',
        component: () => import('@/views/Admin/EditProduct')
      },
      {
        path: 'orders',
        component: () => import('@/views/Admin/AdminOrders')
      },
      {
        path: 'coupons',
        component: () => import('@/views/Admin/AdminCoupons')
      },
      {
        path: 'add-coupon',
        component: () => import('@/views/Admin/AddCoupon')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
