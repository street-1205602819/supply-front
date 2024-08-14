<script setup>
import { computed, ref } from 'vue'
import analysis from './analysis.vue'
import focus from './focus.vue'
import setting from './setting.vue'
const activeName = ref('analysis')
const tabList = [
  {
    label: '舆情梳理',
    name: 'analysis'
  },
  {
    label: '特别关注',
    name: 'focus'
  },
  {
    label: '爬取设置',
    name: 'setting'
  }
]
const componentIs = computed(() => {
  switch(activeName.value) {
    case 'analysis':
      return analysis
    case 'focus':
      return focus
    case 'setting':
      return setting
    default:
      return analysis
  }
})
</script>

<template>
  <div>
    <el-link v-if="activeName === 'analysis'" href="https://inteltechniques.com/tools/Twitter.html" target="_blank" type="primary" class="tabs-link">个人推特精准查询</el-link>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name"></el-tab-pane>
      <component :is="componentIs" />
    </el-tabs>
  </div>
</template>
<style scoped lang="scss">
.tabs {
  position: relative;
}

.tabs-link {
  position: absolute;
  right: 30px;
  top: 90px;
  z-index: 999;
}
</style>

