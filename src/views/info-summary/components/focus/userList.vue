<script setup>
import { ref, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { focusUserList, focusDeleteUser } from '@/api/info-summary'
// import { focusUserListMock } from '../../mock'

const props = defineProps({
  show: Boolean,
  tweetId: String
})
const emit = defineEmits(['update:show', 'delete'])
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
    }
  }
)

const tableData = ref([])
const pageInfo = reactive({
  total: 0,
  pageSize: 20,
  pageNum: 1
})
const tableLoading = ref(false)
const onSearch = async () => {
  tableLoading.value = true
  const res = await focusUserList({
    page: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
  })
  tableLoading.value = false
  tableData.value = res.data
  pageInfo.total = res.total
}

const currentChange = (e) => {
  pageInfo.pageNum = e
  onSearch()
}

const selectData = ref([])
const onSelect = (e) => {
  selectData.value = e.map((item) => item.screenName)
}
const onDelete = async () => {
  await focusDeleteUser({
    screenNames: selectData.value.join(',')
  })
  ElMessage.success('操作成功')
  onSearch()
  emit('delete')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="用户列表" width="500">
      <div class="operation">
        <el-button @click="onDelete" type="primary">批量删除</el-button>
      </div>
    <el-table :data="tableData" border v-loading="tableLoading" @selection-change="onSelect">
      <el-table-column type="selection" width="50" fixed="left" />
      <el-table-column prop="nickName" label="昵称" show-overflow-tooltip />
      <el-table-column prop="screenName" label="用户名" show-overflow-tooltip />
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
<style scoped lang="scss">
.operation {
  margin-bottom: 8px;
  width: 100%;
}
</style>
