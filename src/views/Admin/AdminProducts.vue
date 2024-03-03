<template>
    <loadingVue :active="isLoading" />
  <section class="container my-5 text-center">
    <div class="text-start mb-5 d-flex justify-content-between">
      <h3>商品列表</h3>
      <button class="btn btn-outline-primary">
        <RouterLink class="navbar-brand" to="/admin/add-product">
          新增商品
        </RouterLink>
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th scope="col">品名</th>
          <th scope="col">分類</th>
          <th scope="col">價格</th>
          <th scope="col">特價</th>
          <th scope="col">成分</th>
          <th scope="col">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <th scope="row">{{ item.title }}</th>
            <td>{{ item.category }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.is_enabled ? '是' : '否'}}</td>
            <td><button @click="goToItem(item.id)" type="button" class="btn btn-primary">編輯</button></td>
            <td><button @click="showDeleteItemModal(item.id)" type="button" class="btn btn-outline-danger">刪除</button></td>
        </tr>
      </tbody>
    </table>

  </section>
  <PaginationComponent
            :currentPage="currentPage"
            :totalPages="totalPages"
            @goToPage="getProducts"/>
  <DelProductModal ref="deleteItemModal" :item="product" @deleteItem="deleteItem"/>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PaginationComponent from '@/components/PaginationComponent.vue'
import DelProductModal from '@/components/DelProductModal.vue'
const router = useRouter()
const products = ref([])
const totalPages = ref('')
const currentPage = ref('')
const product = ref({})
const isLoading = ref(false)
const deleteItemModal = ref()

const getProducts = (toPage = 1) => {
  isLoading.value = true
  axios
    .get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/products?page=${toPage}`)
    .then((res) => {
      products.value = res.data.products
      totalPages.value = res.data.pagination.total_pages
      currentPage.value = res.data.pagination.current_page
    })
    .catch((error) => alert(error.response.data.message)).finally(() => { isLoading.value = false })
}

const showDeleteItemModal = (id) => {
  const prod = products.value.find(it => it.id === id)
  product.value = prod
  deleteItemModal.value.openModal()
}

const goToItem = (id) => {
  router.push(`/admin/edit-product/${id}`)
}

const deleteItem = async () => {
  isLoading.value = true
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/product/${product.value.id}`)
    alert(`${res.data.message}`)
    getProducts()
  } catch (err) {
    alert(err.data.message)
  }
  isLoading.value = false
}

onMounted(() => {
  getProducts()
})
</script>

<style lang="scss" scoped></style>
