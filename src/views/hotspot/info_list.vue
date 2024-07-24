<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getList, downloadExcel } from '@/api/hotspot'
const form = reactive({
  publishAddress: '',
  title: '',
  sensitiveContent: '',
  publishTime: ''
})

const onLoad = () => {
  if (pageInfo.total > list.value.length) {
    onSearch()
  }
}

const list = ref([])
const pageInfo = reactive({
  page: 1,
  pageSize: 20,
  total: -1,
})
const onSearch = async () => {
  if (loading.value) return
  loading.value = true
  const res = await getList({
    page: pageInfo.page,
    pageSize: pageInfo.pageSize,
    ...form
  })
  list.value = list.value.concat(res.data)
  pageInfo.total = res.total
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
const onDownload = () => {
  const res = downloadExcel({
    ...form
  })
}

const loading = ref(false)

onMounted(() => {
  onSearch()
})
</script>
<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="info-form" label-position="top">
      <el-form-item label="发布点位">
        <el-input v-model="form.publishAddress" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="敏感内容">
        <el-input v-model="form.sensitiveContent" placeholder="请输入" clearable style="width: 192px" />
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker v-model="form.publishTime" type="date" placeholder="请选择" value-format="YYYY-MM-DD"
          style="width: 192px" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onDownload">下载</el-button>
      </el-form-item>
    </el-form>
    <ul v-infinite-scroll="onLoad" class="info-list" :infinite-scroll-distance="200">
      <div class="info-img"></div>
      <li v-for="(item, index) in list" :key="index" class="info-list-item">
        <el-link class="info-title" :href="item.originalLink" target="_blank">{{ item.title }}</el-link>
        <p class="info-time">{{ item.publishAddress }} {{ item.publishTime }}</p>
        <el-popover placement="bottom" title="" :width="200" trigger="click" :content="item.sensitiveContent">
          <template #reference>
            <p class="info-content">{{ item.sensitiveContent }}</p>
          </template>
        </el-popover>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  flex-flow: column;
}

.info-form {
  width: 100%;
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

.first-info {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background-color: #f1f2f5;
  width: calc(50% - 8px);
  padding: 12px;
  height: 200px;
}

.info-list-item {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background-color: #f1f2f5;
  width: calc(50% - 8px);
  padding: 12px;
  list-style: none;
  height: 200px;
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
}

.info-content {
  font-size: 14px;
  height: 112px;
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
