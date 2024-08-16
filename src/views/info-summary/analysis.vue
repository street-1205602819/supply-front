<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCategoryList, getAnalysisList, analysisDelete } from '@/api/info-summary'
import { ElMessage } from 'element-plus'
import checkDialog from '@/components/checkDialog.vue'
import editRemark from './components/setting/editRemark.vue'
import userList from './components/setting/userList.vue'
// import { categoryListMock, analysisMock } from './mock.js'

const categoryOptions = ref([])
const getCategoryOptions = async () => {
  categoryOptions.value = await getCategoryList()
  form.categoryNo = categoryOptions.value[0].code
}
const form = reactive({
  categoryNo: '',
  keyword: '',
  startDate: '',
  endDate: '',
  remark: '',
  chineseText: '',
})

const tableLoading = ref(false)
const onSearch = async (isClickSearch) => {
  tableLoading.value = true
  const res = await getAnalysisList({
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
  form.startDate = ''
  form.endDate = ''
  form.remark = ''
  form.chineseText = ''
}

const onTw = () => {
  window.open('https://inteltechniques.com/tools/Twitter.html', '_blank')
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

const editVisible = ref(false)
const editRemarkData = ref({})
const onEdit = row => {
  editRemarkData.value = row
  editVisible.value = true
}
const onRemarkOk = () => {
  editVisible.value = false
  onSearch()
}

const tweetId = ref('')
const userListVisible = ref(false)
const onClickRetweetCount = row => {
  userListVisible.value = true
  tweetId.value = row.tweetId
}

const selectData = ref([])
const onSelect = (e) => {
  selectData.value = e.map((item) => item.tweetId)
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
  await analysisDelete({
    tweetId: selectData.value.join(',')
  })
  ElMessage.success('操作成功')
  checkVisible.value = false
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
      <el-form-item label="开始时间">
        <el-date-picker v-model="form.startDate" type="date" placeholder="请选择" style="width: 192px"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="form.endDate" type="date" placeholder="请选择" style="width: 192px"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.chineseText" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch(true)">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button @click="onTw">个人推特精准查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div class="operation">
        <el-button @click="onDelete" type="primary">批量删除</el-button>
      </div>
      <el-table :data="tableData" border v-loading="tableLoading" @selection-change="onSelect">
        <el-table-column type="selection" width="50" fixed="left" />
        <el-table-column prop="seq" label="序号" width="60" show-overflow-tooltip fixed="left">
          <template #default="scope">
            <div>{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="关注环节" show-overflow-tooltip width="180px" fixed="left" />
        <el-table-column prop="keyword" label="关键词" show-overflow-tooltip fixed="left" />
        <el-table-column prop="nickname" label="昵称" show-overflow-tooltip />
        <el-table-column prop="screenName" label="用户名" show-overflow-tooltip />
        <el-table-column prop="tweetCreatedAt" label="发布时间" show-overflow-tooltip width="180px" />
        <el-table-column label="是否原创" width="180" show-overflow-tooltip>
          <template #default="scope">
            <div v-if="!scope.row.retweetFrom">原创</div>
            <el-link v-else :href="scope.row.retweetFrom" target="_blank" type="primary">非原创</el-link>
          </template>
        </el-table-column>
        <el-table-column label="内容" show-overflow-tooltip width="280px">
          <template #default="scope">
            <el-link :href="scope.row.tweetUrl" target="_blank" type="primary">{{ scope.row.chineseText }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="viewCount" label="浏览量" show-overflow-tooltip />
        <el-table-column prop="favoriteCount" label="收藏数" show-overflow-tooltip />
        <el-table-column prop="replyCount" label="回复数" show-overflow-tooltip />
        <el-table-column label="转发数" show-overflow-tooltip>
          <template #default="scope">
            <div class="table-button" @click="onClickRetweetCount(scope.row)">{{ scope.row.retweetCount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip width="120px" />
        <el-table-column label="操作" width="120px" fixed="right">
          <template #default="scope">
            <el-button text @click="onEdit(scope.row)" type="primary">
              编辑备注
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next, jumper" :total="pageInfo.total" @current-change="currentChange"
        :page-size="20" />
    </div>
    <editRemark v-model:show="editVisible" :editData="editRemarkData" @ok="onRemarkOk" />
    <userList v-model:show="userListVisible" :tweetId="tweetId" />
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

.table-button {
  cursor: pointer;
  text-decoration: underline;
}

.operation {
  margin-bottom: 8px;
  width: 100%;
}
</style>

