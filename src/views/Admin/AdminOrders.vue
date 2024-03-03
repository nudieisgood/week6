<template>
    <loadingVue :active="isLoading" />
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>客戶姓名</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orders" :key="item.id">
          <th scope="row">{{ formatTime(item.create_at) }}</th>
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.email }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.is_paid ? '是' : '否'}}</td>
            <td><button @click="openModal(item)" type="button" class="btn btn-primary">檢視</button></td>
            <td><button @click="openDelOrderModal(item)" type="button" class="btn btn-outline-danger">刪除</button></td>
        </tr>
    </tbody>
  </table>
  <PaginationComponent
            :currentPage="currentPage"
            :totalPages="totalPages"
            @goToPage="getOrders"/>
  <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
  <DelOrderModal ref="delOrderModal" :order="tempOrder" @delete-order="deleteOrder"/>
</template>

<script>
import dayjs from 'dayjs'
import OrderModal from '@/components/OrderModal.vue'
import axios from 'axios'

import DelOrderModal from '@/components/DelOrderModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      orders: {},
      tempOrder: {},
      currentPage: '',
      totalPages: '',
      isLoading: false
    }
  },
  components: {
    OrderModal,
    DelOrderModal,
    PaginationComponent
  },
  computed: {
  },
  methods: {
    formatTime (date) {
      return dayjs(date * 1000).format('YYYY-MM-DD')
    },
    async deleteOrder (order) {
      const { id } = order
      this.isLoading = true
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/order/${id}`)
        alert(res.data.message)
        await this.getOrders()
      } catch (err) {
        alert(err)
      }
      this.isLoading = false
    },
    openModal (item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal

      orderComponent.openModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delOrderComponent = this.$refs.delOrderModal
      delOrderComponent.openModal()
    },
    async getOrders (toPage = 1) {
      this.isLoading = true
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/orders?page=${toPage}`)
        this.orders = res.data.orders
        this.totalPages = res.data.pagination.total_pages
        this.currentPage = res.data.pagination.current_page
      } catch (err) {
        alert(err)
      }
      this.isLoading = false
    },
    async updatePaid (item) {
      const paid = {
        is_paid: !item.is_paid
      }
      this.isLoading = true
      try {
        await axios.put(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/order/${item.id}`, { data: paid })
        const orderComponent = this.$refs.orderModal
        orderComponent.hideModal()
        this.getOrders(this.currentPage)
      } catch (err) {
        alert(err.response.data.message)
      }
      this.isLoading = false
    }
  },
  async mounted () {
    await this.getOrders()
  }
}
</script>

<style lang="scss" scoped></style>
