<script setup>
import { ref, reactive, onMounted } from 'vue'
import { focusAddUser, focusUserList } from '@/api/info-summary'
import userList from './components/focus/userList.vue'
import { ElMessage } from 'element-plus'


const userCount = ref(0)
const userListVisible = ref(false)
const getUserData = async () => {
  userCount.value = (await focusUserList({
    page: 1,
    pageSize: 20,
  })).total
}

const screenName = ref('')

const onAdd = async () => {
  await focusAddUser({
    screenName: screenName.value
  })
  ElMessage.success('操作成功')
}

const form = reactive({
  nickName: '',
  screenName: '',
  chinesText: '',
  startDate: '',
  endDate: '',
})

onMounted(async () => {
  await getUserData()
})

</script>

<template>
  <div>
    <div class="user-container">
      正在关注<span class="user-button" @click="userListVisible = true">{{ userCount }}</span>对象
    </div>
    <div class="add-user">
      添加账号
      <el-input v-model="screenName" placeholder="请输入" clearable style="width: 192px" />
      <el-button @click="onAdd">添加</el-button>
    </div>
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
      <!-- <el-form-item label="发布时间">
        <el-date-picker v-model="form.publishTime" type="date" placeholder="请选择" style="width: 192px"
          value-format="YYYY-MM-DD" />
      </el-form-item> -->
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch(true)">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <userList v-model:show="userListVisible" />
  </div>
</template>
<style scoped lang="scss">
.user-container {
  margin-bottom: 12px;
}

.user-button {
  cursor: pointer;
  text-decoration: underline;
  margin: 0 4px;
  color: #409eff;;
}

.add-user {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>

