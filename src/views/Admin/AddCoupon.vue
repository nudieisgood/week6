<template>
    <loadingVue :active="isLoading" />
  <div class="container my-5">
    <div class="text-start mb-4 d-flex justify-content-between border-bottom pb-3">
      <h3>新增優惠卷</h3>
      <button class="btn btn-outline-primary">
        <RouterLink class="navbar-brand" to="/admin/coupons">
          優惠卷列表
        </RouterLink>
      </button>
    </div>
    <VForm class="row mt-5" v-slot="{ errors }" @submit="addItem" >
    <div class="p-2 p-lg-3 col-md-6">
      <div>
        <div class="form-floating mb-4">
          <VField type="text" id="title" placeholder="請輸入商品名稱" name="title" class="form-control" :class="{ 'is-invalid': errors['title'] }" rules="required" v-model="item.title" />
            <ErrorMessage name="title" class="invalid-feedback"/>
            <label for="title">商品名稱*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="text" id="code" placeholder="請輸入商品名稱" name="code" class="form-control" :class="{ 'is-invalid': errors['code'] }" rules="required" v-model="item.code" />
            <ErrorMessage name="code" class="invalid-feedback"/>
            <label for="code">折扣碼*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="date" id="due_date" placeholder="請輸入單位" name="due_date" class="form-control" :class="{ 'is-invalid': errors['due_date'] }" rules="required" v-model="item.due_date" />
            <ErrorMessage name="due_date" class="invalid-feedback"/>
            <label for="due_date">使用期限*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="number" id="percent" placeholder="請輸入售價" name="percent" class="form-control" :class="{ 'is-invalid': errors['percent'] }" rules="required" v-model.number="item.percent" />
            <ErrorMessage name="percent" class="invalid-feedback"/>
            <label for="percent">折扣%數*</label>
        </div>
        <div class="form-floating mb-4">
          <div class="form-check">
                      <input
                        v-model="item.is_enabled"
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
        </div>
      </div>
      <div class="d-flex gap-2 mt-3 btn-container">
        <button type="submit" class="btn btn-primary btn-md mb-4">確認</button>
      </div>
    </div>

    </VForm>

  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'vue3-toastify'
// import { DeleteFilled, Select as ElSelect } from '@element-plus/icons-vue'

export default {
  data () {
    return {
      item: {
        title: '',
        is_enabled: 1,
        percent: '',
        due_date: '',
        code: ''
      },
      errorMsg: '',
      isLoading: false
    }
  },
  components: {
    // DeleteFilled,
    // ElSelect
  },
  methods: {
    async addItem () {
      const date = new Date(this.item.due_date) / 1000
      const coupon = { ...this.item, due_date: date }
      this.isLoading = true
      try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/coupon`, { data: coupon })
        alert(`${res.data.message}`)
        this.$router.push('/admin/coupons')
      } catch (err) {
        toast.error(err.data.message)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.img-box{
  display: flex;
}
.img{
  width: 12rem;
}

.container{
  position: relative;
}
.btn-container{
  position: absolute;
  top: 3rem;
  right: 0.8rem;
}
.errorMsg{
  color: red;
  font-size: 0.9rem;
  margin-left: 1rem;
}
</style>
