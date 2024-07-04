<script setup>
import { ref, computed, reactive } from 'vue'
const form = reactive({
  position: '',
  title: '',
  danger: '',
  date: ''
})

const onLoad = () => {
  console.log('加载更多数据');
}

const onSearch = () => {}
// cons
</script>
<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="info-form" label-position="top">
      <el-form-item label="发布点位">
        <el-input v-model="form.position" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="敏感内容">
        <el-input v-model="form.danger" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker v-model="form.date" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="-" class="button-label">
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <ul v-infinite-scroll="onLoad" class="info-list">
        <div class="info-img">

    </div>
    <div class="first-info">
              <p class="info-title">这是一个标题</p>
        <p class="info-content">这是一堆文案这是一堆文案
          是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文
          这是一堆文案这是一堆文案这是一堆文案这是一堆
          文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案这是一堆文案</p>
    </div>

      <li v-for="i in 11" :key="i" class="info-list-item">
        <p class="info-title">这是一个标题</p>
        <p class="info-content">这是一堆文案</p>
      </li>
    </ul>
  </div>

  <!-- <div>
    123123
  </div> -->
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
  background-color: #f2f6f9;
  width: calc(50% - 8px);
  padding: 12px;
  height: 200px;
}
.info-list-item {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background-color: #f2f6f9;
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

// .info-list-item:nth-child(1) {
//   height: 300px;
// }

.info-title {
  font-size: 20px;
  font-weight: 500;
  color: #151523;
  margin-bottom: 6px;
}

.info-content {
  height: 100px;
  overflow: auto;
}


</style>
