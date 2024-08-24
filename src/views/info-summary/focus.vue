<script setup>
import { ref, reactive, onMounted } from 'vue'
import { focusAddUser, focusUserCount, focusInfo, focusDeleteInfo } from '@/api/info-summary'
import userList from './components/focus/userList.vue'
import editRemark from './components/focus/editRemark.vue'
import { ElMessage } from 'element-plus'

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
const onEdit = (item) => {
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
        <li v-for="(item, index) in list" :key="index" class="info-list-item">
          <div class="info-list-item-header">
            <div class="info-list-item-info">
              <div class="info-list-item-name">{{ item.nickname }}</div>
              <div class="info-list-item-user">{{ item.location }}</div>
              <div class="info-list-item-user">{{ item.tweetCreatedAt }}</div>
            </div>
            <div class="info-list-item-operation">
              <el-button @click="onDelete(item)" text type="primary">删除</el-button>
              <el-button @click="onEdit(item)" text type="primary">编辑备注</el-button>
            </div>
          </div>
          <div class="info-list-item-reply" v-if="item.replyTo">{{ item.replyTo }}</div>
          <div class="info-list-item-content">
            {{ item.chineseText }}<el-link type="primary" target="_blank" :href="item.tweetUrl">原链接</el-link>
            <div>
              <el-link type="primary" target="_blank" :href="item.coverImgUrls || item.videoUrl">图片链接/视频链接</el-link>
            </div>
          </div>
          <div class="info-list-item-deatil">
            <el-image
              class="info-list-item-img"
              v-if="item.coverImgUrls"
              :src="item.coverImgUrls"
              fit="contain"
            />
            <video controls v-if="item.videoUrl" width="400">
              <source :src="item.videoUrl" />
            </video>
          </div>
        <div class="info-list-item-num">
          <div class="info-list-item-count">
            <i class="iconfont info-list-item-icon icon-31zhuanfa" />
            {{ item.retweetCount }}
          </div>
          <div class="info-list-item-count">
            <i class="iconfont info-list-item-icon icon-huifu" />
            {{ item.replyCount }}
          </div>
          <div class="info-list-item-count">
            <i class="iconfont info-list-item-icon icon-dianzan" />
            {{ item.retweetCount }}
          </div>
        </div>
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
  margin-bottom: 24px;
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
  width: 100%;
  padding: 12px;
  list-style: none;

  &-header {
    display: flex;
    justify-content: space-between;
  }

  &-info {
    display: flex;
    align-items: center;
  }

  &-name {
    font-size: 20px;
    font-weight: 500;
  }

  &-user {
    margin-left: 8px;
    font-size: 14px;
    color: #939393;
  }

  &-operation {
    display: flex;
    align-items: center;
  }

  &-reply {
    margin-top: 12px;
  }

  &-content {
    margin-top: 12px;
  }

  &-deatil {
    margin-top: 12px;
  }

  &-img, &-video {
    height: 200px;
    width: 400px;
  }

  &-num {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }

  &-count {
    flex: 1;
    display: flex;
    align-items: center;
    color: #939393;
  
    // justify-content: center;
  }

  &-icon {
    margin-right: 4px;
  }
}

::v-deep .el-button--primary {
  padding: 0;
}
</style>

