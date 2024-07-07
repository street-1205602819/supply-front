<script setup>
import { ref, onMounted, reactive } from 'vue'
import uploadDialog from './components/uploadDialog.vue'
import editDialog from './components/editDialog.vue'
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
  pageInfo.total = mockData.total
}

const tableData = ref([])
const pageInfo = reactive({
  total: 0,
  pageSize: 10,
  pageNum: 1
})

const currentChange = (e) => {
  console.log(e)
  pageInfo.pageNum = e
  onSearch()
}

const selectData = ref([])
const onSelect = (e) => {
  selectData.value = e.map((item) => item.seq)
  console.log(selectData.value)
}

onMounted(() => {
  onSearch()
})

const editDialogVisible = ref(false)
const editRow = ref({})
const onEdit = e => {
  editDialogVisible.value = true
  editRow.value = JSON.parse(JSON.stringify(e))
}

const onDelete = () => {
  
}
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
      <div class="operation">
        <el-button @click="onDelete">批量删除</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" @selection-change="onSelect">
        <el-table-column type="selection" width="55" fixed />
        <el-table-column prop="title" label="标题" width="180" show-overflow-tooltip />
        <el-table-column prop="publishAddress" label="发布点位" width="180" show-overflow-tooltip />
        <el-table-column prop="publishTime" label="发布时间" width="180" show-overflow-tooltip />
        <el-table-column prop="sensitiveContent" label="敏感内容" show-overflow-tooltip />
        <el-table-column label="操作" width="90" fixed="right">
          <template #default="scope">
            <el-button text @click="onEdit(scope.row)" type="primary">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="pageInfo.total"
      @current-change="currentChange"
    />
    <uploadDialog v-model:show="uploadVisible" />
    <editDialog v-model:show="editDialogVisible" :editData="editRow" />
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
  flex-wrap: wrap;
}

.operation {
  margin-bottom: 8px;
  width: 100%;
}
</style>
