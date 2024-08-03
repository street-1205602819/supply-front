<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import uploadDialog from './components/uploadDialog.vue'
import editDialog from './components/editDialog.vue'
import checkDialog from '@/components/checkDialog.vue'
import { getRecord, deleteRecord } from '@/api/information'
import { ElMessage } from 'element-plus'
const uploadVisible = ref(false)
const onUpload = () => {
  uploadVisible.value = true
}
watch(() => uploadVisible.value, val => {
  if (!val) {
    onSearch()
  }
})

const form = reactive({
  publishAddress: '',
  title: '',
  sensitiveContent: '',
  publishTime: '',
})
const onSearch = async isClickSearch => {
  tableLoading.value = true
  const res = await getRecord({
    page: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
    ...form
  })
  if (isClickSearch) {
    ElMessage.success('查询成功')
  }
  tableLoading.value = false
  tableData.value = res.data
  pageInfo.total = res.total
}

const tableData = ref([])
const pageInfo = reactive({
  total: 0,
  pageSize: 20,
  pageNum: 1
})

const currentChange = (e) => {
  pageInfo.pageNum = e
  onSearch()
}

const selectData = ref([])
const onSelect = (e) => {
  selectData.value = e.map((item) => item.seq)
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
const onEditOk = () => {
  onSearch()
}

const checkVisible = ref(false)
const onDelete = () => {
  if (!selectData.value.length) {
    ElMessage.error('请先选择要删除的数据')
    return
  }
  checkVisible.value = true
}

const onCheckOk = async () => {
  await deleteRecord({
    seq: selectData.value.join(',')
  })
  ElMessage.success('操作成功')
  checkVisible.value = false
  onSearch()
}

const tableLoading = ref(false)

const onReset = () => {
  form.publishAddress = ''
  form.publishTime = ''
  form.sensitiveContent = ''
  form.title = ''
}
</script>

<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="form" label-position="top">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="发布点位">
        <el-input v-model="form.publishAddress" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="敏感内容">
        <el-input v-model="form.sensitiveContent" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker v-model="form.publishTime" type="date" placeholder="请选择" style="width: 192px"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch(true)">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" @click="onUpload">上传</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div class="operation">
        <el-button @click="onDelete" type="primary">批量删除</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" @selection-change="onSelect" v-loading="tableLoading">
        <el-table-column type="selection" width="55" fixed />
        <el-table-column prop="title" label="标题" width="180" show-overflow-tooltip />
        <el-table-column prop="publishAddress" label="发布点位" width="180" show-overflow-tooltip />
        <el-table-column prop="sensitiveContent" label="敏感内容" show-overflow-tooltip />
        <el-table-column label="原文链接" width="180" show-overflow-tooltip>
          <template #default="scope">
            <el-link :href="scope.row.originalLink" target="_blank" type="primary">{{ scope.row.originalLink }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="180" show-overflow-tooltip />
        <el-table-column label="操作" width="90" fixed="right">
          <template #default="scope">
            <el-button text @click="onEdit(scope.row)" type="primary">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next, jumper" :total="pageInfo.total" @current-change="currentChange" :page-size="20" />
    </div>
    <uploadDialog v-model:show="uploadVisible" />
    <editDialog v-model:show="editDialogVisible" :editData="editRow" @ok="onEditOk" />
    <checkDialog v-model:show="checkVisible" @ok="onCheckOk" />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  flex-flow: column;
}

.table-container {
  width: 100%;
  height: 100%;
  margin-top: 12px;
}

.operation {
  margin-bottom: 8px;
  width: 100%;
}
</style>
