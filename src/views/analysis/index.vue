<script setup>
import { ref } from 'vue'
import analysisList from './analysis_list.vue'
import analysisSummary from './analysis_summary.vue'
const activeName = ref('analysis')
</script>

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="数据详情" name="analysis">
        <analysisList v-if="activeName == 'analysis'" />
      </el-tab-pane>
      <el-tab-pane label="数据概览" name="analysisSummary">
        <analysisSummary  v-if="activeName == 'analysisSummary'"  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


