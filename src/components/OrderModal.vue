<template>
  <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <thead>
            <tr>
              <th>客戶姓名</th>
              <th>地址</th>
              <th>電話</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                  <td>{{ order.user?.name }}</td>
                  <td>{{ order.user?.address }}</td>
                  <td>{{ order.user?.tel }}</td>
                  <td>{{ order.user?.email }}</td>
              </tr>
          </tbody>
          <thead>
            <tr>
              <th>購買時間</th>
              <th>購買款項</th>
              <th>應付金額</th>
              <th>是否付款</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td>{{ formatTime(order.create_at) }}</td>
                  <td>{{ order.total }}</td>
                  <td>{{ order.total }}</td>
                  <td>{{ order.is_paid ? '是' : '否'}}</td>
              </tr>
          </tbody>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-paid',tempOrder)">
            修改付款狀態
          </button>
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
    order: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      modal: '',
      tempOrder: {},
      isPaid: false
    }
  },
  emits: ['update-paid'],
  methods: {
    formatTime (date) {
      return dayjs(date * 1000).format('YYYY-MM-DD')
    },
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  watch: {
    order () {
      this.tempOrder = this.order
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
<style lang="scss" scoped></style>
