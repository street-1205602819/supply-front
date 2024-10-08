<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import uploadDialog from './components/uploadDialog.vue'
import checkDialog from '@/components/checkDialog.vue'
import { getMenuValue } from '@/assets/utils'
import {
  getTradeWay,
  getDomesticAddress,
  getAnalysisList,
  deleteRecord,
  getTradeCountry
} from '@/api/analysis'
import { ElMessage } from 'element-plus'
const form = reactive({
  tradeType: 2,
  commodity: '',
  tradeCountry: '美国',
  tradeWayCode: '',
  domesticAddressCode: 14,
  startDate: '',
  endDate: ''
})
const tradeTypeList = [
  {
    label: '进口',
    value: 1
  },
  {
    label: '出口',
    value: 2
  }
]

const tradeCountryOptions = ref([])
const getTradeCountryOptions = async (e) => {
  tradeCountryOptions.value = await getTradeCountry({
    tradeCountry: e || '美国'
  })
}
const tradeWayCodeList = ref([])
const domesticAddressCodeList = ref([])
const getTradeWayCodeList = async () => {
  tradeWayCodeList.value = await getTradeWay()
}
const getDomesticAddressCodeList = async () => {
  domesticAddressCodeList.value = await getDomesticAddress()
  form.domesticAddressCode = 14
}
const getList = async () => {
  await getTradeWayCodeList()
  await getDomesticAddressCodeList()
  await getTradeCountryOptions()
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

const onSearch = async (isClickSearch) => {
  tableLoading.value = true
  if (isClickSearch) {
    pageInfo.pageNum = 1
  }
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

const uploadVisible = ref(false)
const onUpload = () => {
  uploadVisible.value = true
}
watch(
  () => uploadVisible.value,
  (val) => {
    if (!val) {
      onSearch()
    }
  }
)

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

const onReset = () => {
  form.commodity = ''
  form.domesticAddressCode = 14
  form.endDate = ''
  form.startDate = ''
  form.tradeCountry = '美国'
  form.tradeType = 2
  form.tradeWayCode = ''
}

const tableLoading = ref(false)

onMounted(async () => {
  await getList()
  onSearch()
})
</script>
<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="form" label-position="top">
      <el-form-item label="贸易类型">
        <el-select
          v-model="form.tradeType"
          placeholder="请选择"
          style="width: 192px"
          fit-input-width
          filterable
        >
          <el-option
            v-for="item in tradeTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.commodity" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="贸易国家">
        <el-select
          v-model="form.tradeCountry"
          filterable
          remote
          placeholder="请输入"
          :remote-method="getTradeCountryOptions"
          style="width: 192px"
        >
          <el-option v-for="item in tradeCountryOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="贸易方式">
        <el-select
          v-model="form.tradeWayCode"
          placeholder="请选择"
          style="width: 192px"
          fit-input-width
          filterable
        >
          <el-option
            v-for="item in tradeWayCodeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
            <el-tooltip effect="dark" :content="item.name" placement="top-start">
              <span>{{ item.name }}</span>
            </el-tooltip>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="境内地址">
        <el-select
          v-model="form.domesticAddressCode"
          placeholder="请选择"
          style="width: 192px"
          fit-input-width
          filterable
        >
          <el-option
            v-for="item in domesticAddressCodeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.startDate"
          type="month"
          placeholder="请选择"
          style="width: 192px"
          value-format="YYYY-MM"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="form.endDate"
          type="month"
          placeholder="请选择"
          style="width: 192px"
          value-format="YYYY-MM"
        />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch(true)">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" @click="onUpload">上传</el-button>
      </el-form-item>
    </el-form>
    <uploadDialog v-model:show="uploadVisible" />
    <div class="table-container">
      <div class="operation">
        <el-button @click="onDelete" type="primary">批量删除</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="onSelect"
        v-loading="tableLoading"
      >
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
        <el-table-column
          prop="domesticAddress"
          label="境内地址"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column prop="kilogram" label="第一计量" width="120" show-overflow-tooltip />
      </el-table>
      <el-pagination
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        @current-change="currentChange"
        :page-size="20"
        v-model:current-page="pageInfo.pageNum"
      />
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
