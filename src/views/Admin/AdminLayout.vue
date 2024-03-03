<template>
  <div> 後臺管理</div>
  <div class="bar">
    <RouterLink class="btn" to="/">Home</RouterLink>
    <RouterLink class="btn" to="/admin/products">後臺產品管理</RouterLink>
    <RouterLink class="btn" to="/admin/orders"> 後台訂單管理 </RouterLink>
    <RouterLink class="btn" to="/admin/coupons"> 後台優惠卷管理 </RouterLink>
    <button @click="logout" class="btn btn-warning">登出</button>
  </div>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const checkAuth = () => {
  const token = document.cookie.replace(
    /* eslint-disable */
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
console.log(token)
  if (token) {
    axios.defaults.headers.common.Authorization = token
    axios.post(`${import.meta.env.VITE_API}/api/user/check`)
  } else {
    alert('請登入admin帳號。')
    router.push('/login')
  }
}
const logout = async() => {
  try{
    await axios.post(`${import.meta.env.VITE_API}/logout`)
    alert('登出成功')
    document.cookie = `token=;`
    document.cookie = `expDate=;`
    axios.defaults.headers.common.Authorization = null
    router.push('/')
  }catch(err){
    alert(err.response.data.message);
  }   
}
onMounted(() => {
  checkAuth()
})
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  gap: 20px;
}
</style>
