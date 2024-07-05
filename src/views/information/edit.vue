<script setup>
import { ref, computed } from 'vue'
import uploadDialog from './components/uploadDialog.vue'
const uploadVisible = ref(false)
const onUpload = () => {
  uploadVisible.value = true
}

</script>

<template>
  <div class="container">
    <div class="top">
      <el-button type="primary" @click="onUpload">上传</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
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
