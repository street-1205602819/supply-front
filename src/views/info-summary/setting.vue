<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getList, deleteCategory, deleteKeyword, keywordCrawling, userCrawling, stopCrawling, checkCrawling, getCategoryList } from '@/api/info-summary'
import editDialog from './components/setting/editDialog.vue'
// import { categoryListMock, settingMock } from './mock.js'
const categoryOptions = ref([])
const getCategoryOptions = async() => {
  categoryOptions.value  = (await getCategoryList())?.data || []
  form.categoryNo = categoryOptions.value[0].code
}
const form = reactive({
  categoryNo: '',
  keyword: ''
})

const tableLoading = ref(false)
const onSearch = async (isClickSearch) => {
  tableLoading.value = true
  const res = await getList({
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

const onReset = () => {
  form.categoryNo = categoryOptions.value[0].code
  form.keyword = ''
}

const onStartReptile = async field => {
  let fn  = null
  switch (field) {
    case 'category':
      fn = userCrawling
      break;
    case 'keyword':
      fn = keywordCrawling
      break;
  }
  const res = await fn()
  ElMessage.success(res.data)
}

const onCheck = async () => {
  const res = await checkCrawling()
  ElMessage.success(res.data)
}

const onStopReptile = async () => {
  const res = await stopCrawling()
  ElMessage.success(res.data)
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

const onDelete = async (row, field) => {
  let fn = null
  let params = null
  switch (field) {
    case 'category':
      fn = deleteCategory
      params = {
        categoryNo: form.categoryNo
      }
      break
    case 'keyword':
      fn = deleteKeyword
      params = {
        keyword: row.keyword
      }
      break
  }
  await fn(params)
  ElMessage.success('操作成功')
  onSearch()
}

const editDialogVisible = ref(false)
const editRow = ref({})
const editType = ref('add')
const editField = ref('')
const onEdit = (row, field) => {
  editType.value = 'edit'
  editField.value = field
  editRow.value = JSON.parse(JSON.stringify(row))
  editDialogVisible.value = true
}

const onAdd = (field) => {
  editType.value = 'add'
  editField.value = field
  editRow.value = {
    categoryNo: form.categoryNo
  }
  editDialogVisible.value = true
}

const onEditOk = () => {
  onSearch()
}

onMounted(async () => {
  await getCategoryOptions()
  onSearch()
})
</script>

<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="form" label-position="top">
      <el-form-item label="环节编码">
        <el-select v-model="form.categoryNo" placeholder="请选择" style="width: 192px" fit-input-width filterable>
          <el-option v-for="item in categoryOptions" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="form.keyword" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch(true)">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button @click="onAdd('category')">新增环节</el-button>
        <el-button @click="onDelete({}, 'category')">删除环节</el-button>
        <el-button @click="onAdd('keyword')">新增关键词</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div class="operation">
        <el-button @click="onStartReptile('category')" type="primary">用户爬虫</el-button>
        <el-button @click="onStartReptile('keyword')" type="primary">关键词爬虫</el-button>
        <el-button @click="onCheck">查看爬虫状态</el-button>
        <el-button @click="onStopReptile" type="danger">停止爬虫</el-button>
      </div>
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column prop="category" label="当前关注环节" show-overflow-tooltip />
        <el-table-column prop="keyword" label="爬取关键词" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" width="340">
          <template #default="scope">
            <div class="table-operation">
              <el-button text @click="onEdit(scope.row, 'category')" type="primary">
                编辑环节
              </el-button>
              <el-button text @click="onEdit(scope.row, 'keyword')" type="primary">
                编辑关键词
              </el-button>
              <el-button text @click="onDelete(scope.row, 'keyword')" type="primary">
                删除关键词
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        @current-change="currentChange"
        :page-size="20"
      />
    </div>
    <editDialog v-model:show="editDialogVisible" :editData="editRow" @ok="onEditOk" :editField="editField" :editType="editType" />
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

.table-operation {
  display: flex;
}

.operation {
  margin-bottom: 8px;
  width: 100%;
}
</style>

