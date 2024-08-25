<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getTradeCountry, getTradeWay, getDomesticAddress, getDependenceList } from '@/api/analysis'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
const form = reactive({
  commodity: '',
  tradeCountry: '美国',
  tradeWayCode: 10,
  domesticAddressCode: '',
  startDate: dayjs().subtract(1, 'year').format('YYYY-MM'),
  endDate: dayjs().format('YYYY-MM')
})

const tradeCountryOptions = ref([])
const tradeWayCodeList = ref([])
const domesticAddressCodeList = ref([])
const getTradeCountryOptions = async (e) => {
  tradeCountryOptions.value = await getTradeCountry({
    tradeCountry: e || '美国'
  })
}
const getTradeWayCodeList = async () => {
  tradeWayCodeList.value = await getTradeWay()
  form.tradeWayCode = 10
}
const getDomesticAddressCodeList = async () => {
  domesticAddressCodeList.value = await getDomesticAddress()
  form.domesticAddressCode = 14
}
const getList = async () => {
  await getTradeCountryOptions()
  await getTradeWayCodeList()
  await getDomesticAddressCodeList()
}

const tableData = ref([])
const pageInfo = reactive({
  total: 0,
  pageSize: 10,
  pageNum: 1
})
const tableLoading = ref(false)
const onSearch = async (isClickSearch) => {
  tableLoading.value = true
  if (isClickSearch) {
    pageInfo.pageNum = 1
  }
  const res = await getDependenceList({
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

const currentChange = (e) => {
  pageInfo.pageNum = e
  onSearch()
}

const onReset = () => {
  form.commodity = ''
  form.tradeCountry = '美国'
  form.tradeWayCode = 10
  form.domesticAddressCode = ''
  form.startDate = dayjs().subtract(1, 'year').format('YYYY-MM')
  form.endDate = dayjs().format('YYYY-MM')
}

onMounted(async () => {
  await getList()
  onSearch()
})
</script>

<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="form" label-position="top">
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
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="commodity" label="商品" show-overflow-tooltip />
        <el-table-column
          prop="percentage"
          label="（时间段）内对（目标国家）的物品进口依赖性"
          show-overflow-tooltip
        />
      </el-table>
      <el-pagination
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        @current-change="currentChange"
        :page-size="20"
        v-model:current-page="pageInfo.pageNum"
      />
    </div>
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

.info-chart {
  height: 200px;
  width: 100%;
}
</style>

