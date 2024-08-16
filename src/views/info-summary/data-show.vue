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
  switch (activeName.value) {
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
    <el-link type="primary" href="https://inteltechniques.com/tools/Twitter.html" target="_blank"
      class="tab-link">个人推特精准查询</el-link>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name">
      </el-tab-pane>
      <div class="tab-content">
        <component :is="componentIs" />
      </div>
    </el-tabs>
  </div>
</template>
<style scoped lang="scss">
.tab-link {
  position: absolute;
  right: 30px;
  top: 90px;
  z-index: 123123;
}

.tab-content {
  height: calc(100vh - 155px);
}
</style>

