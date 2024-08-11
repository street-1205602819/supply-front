<script setup>
import { computed, ref } from 'vue'
import analysis from './analysis.vue'
import focus from './focus.vue'
import setting from './setting.vue'
const activeName = ref('setting')
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
    <el-tabs v-model="activeName">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name"></el-tab-pane>
      <component :is="componentIs" />
    </el-tabs>
  </div>
</template>
<style scoped lang="scss">

</style>

