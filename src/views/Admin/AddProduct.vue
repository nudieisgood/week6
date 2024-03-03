<template>
  <loadingVue :active="isLoading" />
  <div class="container my-5">
    <div class="text-start mb-4 d-flex justify-content-between border-bottom pb-3">
      <h3>新增商品</h3>
      <button class="btn btn-outline-primary">
        <RouterLink class="navbar-brand" to="/admin/products">
          商品列表
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
          <VField type="text" id="unit" placeholder="請輸入單位" name="unit" class="form-control" :class="{ 'is-invalid': errors['unit'] }" rules="required" v-model="item.unit" />
            <ErrorMessage name="unit" class="invalid-feedback"/>
            <label for="unit">單位*</label>
        </div>
        <div class="form-floating mb-4">
          <VField as="select" id="category" placeholder="請選擇分類" name="category" class="form-select" :class="{ 'is-invalid': errors['category'] }" rules="required" v-model="item.category">
            <option value="jacket">jacket</option>
            <option value="shirt">shirt</option>
            <option value="top">top</option>
            <option value="top">pants</option>
            <option value="hat">hat</option>
          </VField>
            <ErrorMessage name="category" class="invalid-feedback"/>
            <label for="category">分類*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="number" id="origin_price" placeholder="請輸入價格" name="origin_price" class="form-control" :class="{ 'is-invalid': errors['origin_price'] }" rules="required" v-model.number="item.origin_price" />
            <ErrorMessage name="origin_price" class="invalid-feedback"/>
            <label for="unit">價格*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="number" id="price" placeholder="請輸入售價" name="price" class="form-control" :class="{ 'is-invalid': errors['price'] }" rules="required" v-model.number="item.price" />
            <ErrorMessage name="price" class="invalid-feedback"/>
            <label for="price">售價*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="text" id="content" placeholder="請輸入產品內容" name="content" class="form-control" :class="{ 'is-invalid': errors['content'] }" rules="required" v-model="item.content" />
            <ErrorMessage name="content" class="invalid-feedback"/>
            <label for="content">產品內容*</label>
        </div>
        <div class="form-floating mb-4">
          <VField type="text" id="description" placeholder="請輸入產品描述" name="description" class="form-control" :class="{ 'is-invalid': errors['description'] }" rules="required" v-model="item.description" />
            <ErrorMessage name="description" class="invalid-feedback"/>
            <label for="description">產品描述*</label>
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
    </div>
    <div class="p-2 p-lg-3 col-md-6">
      <div>
        <h5>商品圖片</h5>
        <form id="upload-image" class="mb-2" action="/api/whatstoday2024/admin/upload" enctype="multipart/form-data" method="post">
          <label for="formFile" class="form-label">上傳圖片</label>
          <input ref="input-file" class="form-control" type="file" id="file-input" name="file-to-upload" @change="uploadImg">
          <!-- <input type="submit" value="送出" @click.prevent="uploadImg"> -->
          <img v-if="tempImg1 !==''" class="img" :src="tempImg1" alt="image">
          <button v-if="tempImg1 !== ''" type="button" @click="addImage1" class="mt-2 btn btn-outline-primary btn-sm">新增此圖片至圖片列表</button>
        </form>
      </div>
      <div>
        <div class="form-floating mb-4">
          <div class="form-group mb-3">
            <label for="imgUrl" class="form-label">圖片網址</label>
              <input id="imgUrl" v-model="tempImg2" type="text" class="form-control" placeholder="請輸入圖片連結">
              <img v-if="tempImg2 !==''" class="img" :src="tempImg2" alt="image">
              <button v-if="tempImg2 !== ''" type="button" @click="addImage2" class="mt-2 btn btn-outline-primary btn-sm">新增此圖片至圖片列表</button>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-3">
          <span>主圖*</span><span class="errorMsg">{{ errorMsg }}</span>
          <div v-if="item.imgUrl">
            <img class="img" :src="item.imgUrl" alt="image">
          </div>
        </div>
        <div mb-3>
          <span>圖片列表(點選<ElSelect style="width: 20px; height: 20px ;color:yellow;"/>成為主圖 / <DeleteFilled style="width: 20px; height: 20px ;color:black;"/>刪除圖片)</span>
          <div v-if="item.imagesUrl.length" class="img-box">
            <div v-for="(img,index) in item.imagesUrl" :key="index" style="position: relative;">
              <img class="img" :src="img" alt="image">
              <span @click="chooseMainImg(img)"><ElSelect style="width: 30px; height: 30px ;color:yellow; position: absolute; top: 1; left: 1;cursor: pointer;"/></span>
              <span @click="deleteImg(index)"><DeleteFilled style="width: 30px; height: 30px ;color:#d4d4d4; position: absolute; top: 1; right: 1;cursor: pointer;"/></span>
            </div>
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
import { DeleteFilled, Select as ElSelect } from '@element-plus/icons-vue'

export default {
  data () {
    return {
      item: {
        title: '',
        content: '',
        category: '',
        imagesUrl: [],
        is_enabled: 1,
        price: '',
        origin_price: '',
        unit: '',
        description: '',
        imgUrl: ''
      },
      tempImg1: '',
      tempImg2: '',
      errorMsg: '',
      isLoading: false
    }
  },
  components: {
    DeleteFilled,
    ElSelect
  },
  methods: {
    uploadImg () {
      const form = document.querySelector('#upload-image')
      const imageInput = document.querySelector('#file-input')
      const formData = new FormData(form)
      if (imageInput.value) {
        this.isLoading = true
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
        axios.defaults.headers.common.Authorization = token
        axios.post(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/upload`, formData)
          .then((res) => {
            this.tempImg1 = res.data.imageUrl
            imageInput.value = ''
          })
          .catch(err => {
            toast.error(err.data.message)
          }).finally(() => {
            this.isLoading = false
          })
      } else {
        this.isLoading = false
        alert('請先選擇欲上傳之圖片。')
      }
    },
    async addItem () {
      if (this.item.imgUrl === '') {
        this.errorMsg = '主圖為必填'
        return
      }
      try {
        this.isLoading = true
        const res = await axios.post(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/product`, { data: this.item })
        alert(`${res.data.message}`)
        this.$router.push('/admin/products')
      } catch (err) {
        toast.error(err.data.message)
      }
      this.isLoading = false
    },
    addImage1 () {
      this.item.imagesUrl.push(this.tempImg1)
      this.tempImg1 = ''
    },
    addImage2 () {
      this.item.imagesUrl.push(this.tempImg2)
      this.tempImg2 = ''
    },
    chooseMainImg (img) {
      this.item.imgUrl = img
    },
    deleteImg (index) {
      this.item.imagesUrl.splice(index, 1)
    }
  },
  watch: {
    'item.imgUrl': function () {
      this.errorMsg = ''
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
