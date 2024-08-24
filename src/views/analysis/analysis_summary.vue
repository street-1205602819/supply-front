<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  getTradeCountry,
  getTradeWay,
  getDomesticAddress,
  getAnalysisSummary
} from '@/api/analysis'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'

const form = reactive({
  tradeType: 2,
  commodity: '',
  tradeCountry: '美国',
  tradeWayCode: 10,
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
  form.tradeWayCode = 10
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
  pageSize: 10,
  pageNum: 1
})
const onSearch = async (isClickSearch) => {
    if (isClickSearch) {
      pageInfo.pageNum = 1
    }
  const res = await getAnalysisSummary({
    page: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
    ...form
  })
  if (isClickSearch) {
    ElMessage.success('查询成功')
  }
  tableData.value = res.data
  pageInfo.total = res.total
  setTimeout(() => {
    for (let i = 0; i < tableData.value.length; i++) {
      let chartData = tableData.value[i]
      let chartDoms = document.getElementsByClassName('info-chart')
      let myChart = echarts.init(chartDoms[i])
      myChart.setOption({
        title: {
          text: chartData.commodity
        },
        xAxis: {
          data: chartData.details.map((item) => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: chartData.details.map((item) => item.total),
            label: {
              show: true
            }
          }
        ]
      })
    }
  }, 1000)
}
const currentChange = (e) => {
  pageInfo.pageNum = e
  onSearch()
}

const onReset = () => {
  form.commodity = ''
  form.domesticAddressCode = 14
  form.endDate = ''
  form.startDate = ''
  form.tradeCountry = '美国'
  form.tradeType = 2
  form.tradeWayCode = 10
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
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div v-for="(item, index) in tableData.length" class="info-chart" :key="index"></div>
      <el-pagination
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        @current-change="currentChange"
        :page-size="10"
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
