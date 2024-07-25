<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import uploadDialog from './components/uploadDialog.vue'
import checkDialog from '@/components/checkDialog.vue'
import { getMenuValue } from '@/assets/utils'
import { getTradeWay, getDomesticAddress, getAnalysisList, deleteRecord } from '@/api/analysis'
import { ElMessage } from 'element-plus'
const form = reactive({
  tradeType: '',
  commodity: '',
  tradeCountry: '',
  tradeWayCode: '',
  domesticAddressCode: '',
  startDate: '',
  endDate: '',
})
const tradeTypeList = [
  {
    label: '进口',
    value: 1,
  },
  {
    label: '出口',
    value: 2,
  }
]

const tradeWayCodeList = ref([])
const domesticAddressCodeList = ref([])
const getTradeWayCodeList = async () => {
  tradeWayCodeList.value = await getTradeWay()
}
const getDomesticAddressCodeList = async () => {
  domesticAddressCodeList.value = await getDomesticAddress()
}
const getList = async () => {
  await getTradeWayCodeList()
  await getDomesticAddressCodeList()
}

const tableData = ref([])
const pageInfo = reactive({
  total: 0,
  pageSize: 10,
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

const onSearch = async () => {
  const res = await getAnalysisList({
    page: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
    ...form
  })
  tableData.value = res.data
  pageInfo.total = res.total
}

const uploadVisible = ref(false)
const onUpload = () => {
  uploadVisible.value = true
}
watch(() => uploadVisible.value, val => {
  if (!val) {
    onSearch()
  }
})

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


onMounted(async () => {
  await getList()
  onSearch()
})
</script>
<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="form" label-position="top">
      <el-form-item label="贸易类型">
        <el-select v-model="form.tradeType" placeholder="请选择" style="width: 192px" fit-input-width filterable>
          <el-option v-for="item in tradeTypeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.commodity" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="贸易国家">
        <el-input v-model="form.tradeCountry" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="贸易方式">
        <el-select v-model="form.tradeWayCode" placeholder="请选择" style="width: 192px" fit-input-width filterable>
          <el-option v-for="item in tradeWayCodeList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="境内地址">
        <el-select v-model="form.domesticAddressCode" placeholder="请选择" style="width: 192px" fit-input-width filterable>
          <el-option v-for="item in domesticAddressCodeList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="form.startDate" type="date" placeholder="请选择" style="width: 192px"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="form.endDate" type="date" placeholder="请选择" style="width: 192px"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onUpload">上传</el-button>
      </el-form-item>
    </el-form>
    <uploadDialog v-model:show="uploadVisible" />
    <div class="table-container">
      <div class="operation">
        <el-button @click="onDelete" type="primary">批量删除</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" @selection-change="onSelect">
        <el-table-column type="selection" width="55" fixed />
        <el-table-column prop="date" label="发布年月" width="180" show-overflow-tooltip />
        <el-table-column label="发布点位" width="90" show-overflow-tooltip>
          <template #default="scope">
            <div>{{ getMenuValue(tradeTypeList, 'label', 'value', scope.row.tradeType) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodity" label="商品名称" min-width="220" show-overflow-tooltip />
        <el-table-column prop="tradeCountry" label="交易国家" width="120" show-overflow-tooltip />
        <el-table-column prop="tradeWay" label="贸易方式" min-width="220" show-overflow-tooltip />
        <el-table-column prop="domesticAddress" label="境内地址" width="120" show-overflow-tooltip />
        <el-table-column prop="kilogram" label="第一计量" width="120" show-overflow-tooltip />
        <el-table-column label="操作" width="90" fixed="right">
          <template #default="scope">
            <el-button text @click="onEdit(scope.row)" type="primary">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="pageInfo.total" @current-change="currentChange" />
    </div>
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
