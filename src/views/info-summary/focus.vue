<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  focusAddUser,
  focusUserCount,
  focusInfo,
  focusDeleteInfo
} from '@/api/info-summary'
import userList from './components/focus/userList.vue'
import editRemark from './components/focus/editRemark.vue'
import { ElMessage } from 'element-plus'
// import { focusListMock } from './mock'

const userCount = ref(0)
const userListVisible = ref(false)
const getUserData = async () => {
  userCount.value = await focusUserCount()
}
const onUserDelete = () => {
  getUserData()
}

const screenName = ref('')

const onAdd = async () => {
  await focusAddUser({
    screenName: screenName.value
  })
  ElMessage.success('操作成功')
  getUserData()
}

const form = reactive({
  nickName: '',
  screenName: '',
  chinesText: '',
  startDate: '',
  endDate: '',
  remark: ''
})

const onReset = () => {
  form.nickName = ''
  form.screenName = ''
  form.chinesText = ''
  form.startDate = ''
  form.endDate = ''
  form.remark = ''
}

const onLoad = () => {
  if (pageInfo.total > list.value.length) {
    onSearch()
  }
}

const list = ref([])
const pageInfo = reactive({
  page: 1,
  pageSize: 20,
  total: -1
})
const loading = ref(false)
const onSearch = async (isRefresh) => {
  if (loading.value) return
  loading.value = true
  const res = await focusInfo({
    page: pageInfo.page,
    pageSize: pageInfo.pageSize,
    ...form
  })
  // const res = focusListMock
  if (isRefresh) {
    list.value = res.data
  } else {
    list.value = list.value.concat(res.data)
  }
  pageInfo.total = res.total
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const onDelete = async (info) => {
  await focusDeleteInfo({
    tweetId: info.tweetId
  })
  ElMessage.success('操作成功')
  onSearch()
}

const editVisible = ref(false)
const editRemarkData = ref({})
const onEdit = item => {
  editVisible.value = true
  editRemarkData.value = JSON.parse(JSON.stringify(item))
}
const onOk = () => {
  onSearch()
}

onMounted(async () => {
  await getUserData()
  onSearch()
})
</script>

<template>
  <div class="focus-container">
    <div class="user-container">
      正在关注<span class="user-button" @click="userListVisible = true">{{ userCount }}</span
      >对象
    </div>
    <div class="add-user">
      添加账号
      <el-input v-model="screenName" placeholder="请输入" clearable style="width: 192px" />
      <el-button @click="onAdd">添加</el-button>
    </div>
    <div class="info-container">
      <el-form :inline="true" :model="form" class="form" label-position="top">
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" placeholder="请输入" clearable style="width: 192px" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.screenName" placeholder="请输入" clearable style="width: 192px" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.chinesText" placeholder="请输入" clearable style="width: 192px" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="请选择"
            style="width: 192px"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="请选择"
            style="width: 192px"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="请输入" clearable style="width: 192px" />
        </el-form-item>
        <el-form-item label="-" class="button-label">
          <el-button @click="onSearch(true)">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <ul v-infinite-scroll="onLoad" class="info-list" :infinite-scroll-distance="200">
        <div class="info-img"></div>
        <li v-for="(item, index) in list" :key="index" class="info-list-item">
          <div class="info-list-item-header">
            <div>{{ item.nickname }}（{{ item.screenName }}）</div>
            <div class="info-operation">
              <el-button @click="onDelete(item)" text type="primary">删除</el-button>
              <el-button @click="onEdit(item)" text type="primary">编辑备注</el-button>
            </div>
          </div>
          <p class="info-time">{{ item.tweetCreatedAt }} （{{ item.remark }}）</p>
          <el-popover
            placement="bottom"
            title=""
            :width="500"
            trigger="click"
            :content="item.chineseText"
          >
            <template #reference>
              <p class="info-content">{{ item.chineseText }}</p>
            </template>
          </el-popover>
        </li>
      </ul>
    </div>
    <userList v-model:show="userListVisible" @delete="onUserDelete" />
    <editRemark v-model:show="editVisible" :editRemarkData="editRemarkData" @ok="onOk" />
  </div>
</template>
<style scoped lang="scss">
.focus-container {
  height: 100%;
}

.user-container {
  margin-bottom: 12px;
}

.user-button {
  cursor: pointer;
  text-decoration: underline;
  margin: 0 4px;
  color: #409eff;
}

.add-user {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-container {
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
}

.info-list {
  width: 100%;
  max-height: 100%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
}

.info-list-item {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background-color: #f1f2f5;
  width: calc(50% - 8px);
  padding: 12px;
  list-style: none;
  height: 200px;

  &-header {
    display: flex;
    justify-content: space-between;
  }
}

.info-img {
  position: absolute;
  height: 100px;
  width: 100px;
  background: url('https://h5.sinaimg.cn/upload/1005/526/2021/08/23/text.png');
  right: 8px;
  background-position: center;
  background-repeat: no-repeat;
  width: calc(50% - 8px);
  height: 100px;
}

.info-list-item:nth-child(2n + 1) {
  position: relative;
  top: 100px;
}

.info-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 6px;
}

.info-time {
  margin-bottom: 6px;
  color: #939393;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.info-operation {
  display: flex;
  align-items: center;
}

::v-deep .el-button--primary {
  padding: 0;
}
</style>

