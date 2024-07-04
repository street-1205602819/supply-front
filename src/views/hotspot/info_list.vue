<script setup>
import { ref, computed, reactive } from 'vue'
const form = reactive({
  position: '',
  title: '',
  danger: '',
  date: '',
})

const onSearch = () => {

}
// cons
</script>
<template>
  <el-form :inline="true" :model="form" class="demo-form-inline" label-position="top">
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

  <!-- <div>
    123123
  </div> -->
</template>
<style scoped lang="scss"></style>
