<script setup>
import { ref, onMounted, reactive } from 'vue'
import editDialog from './components/editDialog.vue'
import checkDialog from '@/components/checkDialog.vue'
import { getRecordList, deleteRecord } from '@/api/law'
import { ElMessage } from 'element-plus'
const tableData = ref([])
const pageInfo = reactive({
  total: 0,
  pageSize: 10,
  pageNum: 1
})

const selectData = ref([])
const onSelect = (e) => {
  selectData.value = e.map((item) => item.seq)
}

const onSearch = async () => {
  const res = await getRecordList({
    page: pageInfo.pageNum,
    pageSize: pageInfo.pageSize
  })
  tableData.value = res.data
  pageInfo.total = res.total
}

const editDialogVisible = ref(false)
const editRow = ref({})
const editType = ref('add')
const onEdit = e => {
  editDialogVisible.value = true
  editType.value = 'edit'
  editRow.value = JSON.parse(JSON.stringify(e))
}
const onAdd = () => {
  editType.value = 'add'
  editDialogVisible.value = true
  editRow.value = JSON.parse(JSON.stringify({}))
}

const currentChange = (e) => {
  pageInfo.pageNum = e
  onSearch()
}

const onEditOk = () => {
  onSearch()
}
const checkVisible = ref(false)
const onDelete = () => {
  if (!selectData.value.length) {
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
}

onMounted(() => {
  onSearch()
})
</script>

<template>
  <div>
    <el-link class="info-title" type="primary" href="https://flk.npc.gov.cn/" target="_blank">跳转至国家法律法规数据库</el-link>
    <div class="operation">
      <el-button @click="onDelete" type="primary">批量删除</el-button>
      <el-button @click="onAdd" type="primary">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="onSelect">
      <el-table-column type="selection" width="55" fixed />
      <el-table-column prop="seq" label="序号" width="180" show-overflow-tooltip />
      <el-table-column prop="referWork" label="涉及工作" show-overflow-tooltip />
      <el-table-column prop="referLaw" label="参考法律名" show-overflow-tooltip />
      <el-table-column label="操作" width="90" fixed="right">
        <template #default="scope">
          <el-button text @click="onEdit(scope.row)" type="primary">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="pageInfo.total" @current-change="currentChange" />
    <editDialog v-model:show="editDialogVisible" :editData="editRow" @ok="onEditOk" :editType="editType" />
    <checkDialog v-model:show="checkVisible" @ok="onCheckOk" />
  </div>
</template>
<style scoped lang="scss">
.info-title {
  line-height: 20px;
  font-size: 16px;
  margin-bottom: 12px;
}

.operation {
  margin-bottom: 8px;
}
</style>
