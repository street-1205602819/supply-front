<script setup>
import { ref, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { analysisUserList } from '@/api/info-summary'
const props = defineProps({
  show: Boolean,
  tweetId: String,
})
const emit = defineEmits(['update:show', 'ok'])
const dialogVisible = ref(false)
watch(
  () => props.show,
  (val) => {
    dialogVisible.value = val
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:show', val)
    if (val) {
      onSearch()
    } else {
      formData.value.location = ''
    }
  }
)

const formData = ref({
  location: ''
})

const tableData = ref([])
const pageInfo = reactive({
  total: 0,
  pageSize: 20,
  pageNum: 1
})
const tableLoading = ref(false)
const onSearch = async (isClickSearch) => {
  tableLoading.value = true
  const res = await analysisUserList({
    page: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
    tweetId: props.tweetId,
    location: formData.value.location
  })
  if (isClickSearch) {
    ElMessage.success('查询成功')
  }
  tableLoading.value = false
  tableData.value = res.data
  pageInfo.total = res.total
}

const currentChange = (e) => {
  pageInfo.pageNum = e
  onSearch()
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="用户列表" width="500">
    <el-form :model="formData" :inline="true" label-position="top">
      <el-form-item label="地址">
        <el-input v-model="formData.location" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch(true)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border v-loading="tableLoading">
      <el-table-column prop="nickname" label="昵称" show-overflow-tooltip />
      <el-table-column prop="screenName" label="用户名" show-overflow-tooltip />
      <el-table-column prop="location" label="位置" show-overflow-tooltip />
    </el-table>
    <el-pagination
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        @current-change="currentChange"
        :page-size="20"
      />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
