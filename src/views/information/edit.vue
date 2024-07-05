<script setup>
import { ref, onMounted, reactive } from 'vue'
import uploadDialog from './components/uploadDialog.vue'
import { mockData } from './mock'
const uploadVisible = ref(false)
const onUpload = () => {
  uploadVisible.value = true
}

const form = reactive({
  publishAddress: '',
  title: '',
  sensitiveContent: '',
  publishTime: ''
})
const onSearch = () => {
  tableData.value = mockData.data
}

const tableData = ref([])

onMounted(() => {
  onSearch()
})

</script>

<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="form" label-position="top">
      <el-form-item label="发布点位">
        <el-input v-model="form.publishAddress" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="敏感内容">
        <el-input v-model="form.sensitiveContent" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker v-model="form.publishTime" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onUpload">上传</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="publishAddress" label="发布点位" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <uploadDialog v-model:show="uploadVisible" />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  flex-flow: column;
}

.top {
  width: 100%;
}

.table-container {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 12px;
}
</style>
