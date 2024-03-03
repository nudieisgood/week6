<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>編輯優惠卷</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm class="row mt-5" v-slot="{ errors }">
    <div class="p-2 p-lg-3 col-md-6">
      <div>
        <div class="form-floating mb-4">
          <VField type="text" id="title" placeholder="請輸入優惠卷名稱" name="title" class="form-control" :class="{ 'is-invalid': errors['title'] }" rules="required" v-model="tempCoupon.title" />
            <ErrorMessage name="title" class="invalid-feedback"/>
            <label for="title">優惠卷名稱*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="text" id="code" placeholder="請輸入商品名稱" name="code" class="form-control" :class="{ 'is-invalid': errors['code'] }" rules="required" v-model="tempCoupon.code" />
            <ErrorMessage name="code" class="invalid-feedback"/>
            <label for="code">折扣碼*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="date" id="due_date" placeholder="請輸入單位" name="due_date" class="form-control" :class="{ 'is-invalid': errors['due_date'] }" rules="required" v-model="tempCoupon.due_date" />
            <ErrorMessage name="due_date" class="invalid-feedback"/>
            <label for="due_date">使用期限*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="number" id="percent" placeholder="請輸入售價" name="percent" class="form-control" :class="{ 'is-invalid': errors['percent'] }" rules="required" v-model.number="tempCoupon.percent" />
            <ErrorMessage name="percent" class="invalid-feedback"/>
            <label for="percent">折扣%數*</label>
        </div>
        <div class="form-floating mb-4">
          <div class="form-check">
                      <input
                        v-model="tempCoupon.is_enabled"
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
    </div>
    <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon',tempCoupon)">
            確定
          </button>
        </div>
    </VForm>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    coupon: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      modal: '',
      tempCoupon: {},
      isPaid: false
    }
  },
  emits: ['update-coupon'],
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  watch: {
    coupon () {
      const date = dayjs(this.coupon.due_date * 1000).format('YYYY-MM-DD')

      this.tempCoupon = { ...this.coupon, due_date: date }
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
<style lang="scss" scoped></style>
