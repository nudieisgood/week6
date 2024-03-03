<template>
  <loadingVue :active="isLoading" />
  <section class="container my-5 text-center">
  <div class="text-start mb-5 d-flex justify-content-between">
      <h3>優惠卷列表</h3>
      <button class="btn btn-outline-primary">
        <RouterLink class="navbar-brand" to="/admin/add-coupon">
          新增優惠卷
        </RouterLink>
      </button>
    </div>
  <table class="table mt-4 align-middle">
    <thead>
      <tr>
        <th>優惠卷名稱</th>
        <th>使用期限</th>
        <th>折扣%數</th>
        <th>優惠碼</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in coupons" :key="item.id">
          <th scope="row">{{ item.title }}</th>
            <td>{{ formatTime(item.due_date) }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.is_enabled ? '是' : '否'}}</td>
            <td><button @click="openModal(item)" type="button" class="btn btn-primary">編輯</button></td>
            <td><button @click="openDelOrderModal(item)" type="button" class="btn btn-outline-danger">刪除</button></td>
        </tr>
    </tbody>
  </table>
  <PaginationComponent
            :currentPage="currentPage"
            :totalPages="totalPages"
            @goToPage="getCoupons"/>
  <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon" />
  <DelCouponModal ref="delCouponModal" :coupon="tempCoupon" @delete-coupon="deleteCoupon"/>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'

import DelCouponModal from '@/components/DelCouponModal.vue'
import CouponModal from '@/components/CouponModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      coupons: {},
      tempCoupon: {},
      currentPage: '',
      totalPages: '',
      isLoading: false
    }
  },
  components: {
    CouponModal,
    DelCouponModal,
    PaginationComponent
  },
  computed: {
  },
  methods: {
    formatTime (date) {
      return dayjs(date * 1000).format('YYYY-MM-DD')
    },
    async deleteCoupon (order) {
      const { id } = order
      this.isLoading = true
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/coupon/${id}`)
        alert(res.data.message)
        await this.getCoupons()
      } catch (err) {
        alert(err)
      }
      this.isLoading = false
    },
    openModal (item) {
      console.log(item)
      this.tempCoupon = { ...item }
      const couponComponent = this.$refs.couponModal
      couponComponent.openModal()
    },
    openDelOrderModal (item) {
      this.tempCoupon = { ...item }
      const delCouponComponent = this.$refs.delCouponModal
      delCouponComponent.openModal()
    },
    async getCoupons (toPage = 1) {
      this.isLoading = true
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/coupons?page=${toPage}`)
        this.coupons = res.data.coupons
        this.totalPages = res.data.pagination.total_pages
        this.currentPage = res.data.pagination.current_page
      } catch (err) {
        alert(err)
      }
      this.isLoading = false
    },
    async updateCoupon (item) {
      const date = new Date(item.due_date) / 1000
      const coupon = { ...item, due_date: date }
      this.isLoading = true
      try {
        await axios.put(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/coupon/${item.id}`, { data: coupon })
        const couponComponent = this.$refs.couponModal
        couponComponent.hideModal()
        this.getCoupons(this.currentPage)
        alert('成功更新優惠卷')
      } catch (err) {
        alert(err.response.data.message)
      }
      this.isLoading = false
    }
  },
  async mounted () {
    await this.getCoupons()
  }
}
</script>

<style lang="scss" scoped></style>
