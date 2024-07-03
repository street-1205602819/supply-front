<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const isCollapse = ref(false)
const sideBarActive = ref('0')

const onSelect = e => {
  sideBarActive.value = e
}

</script>

<template>
  <el-container class="app-main">
    <el-aside class="sidebar">
      <el-menu :default-active="sideBarActive" class="sidebar-menu" :collapse="isCollapse" @select="onSelect">
        <el-menu-item index="0">
          <template #title>每日热点咨询</template>
        </el-menu-item>
        <el-menu-item index="1">
          <template #title>依赖性分析</template>
        </el-menu-item>
        <el-menu-item index="2">
          <template #title>信息汇总</template>
        </el-menu-item>
        <el-menu-item index="3">
          <template #title>法律查询</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped lang="scss">
.app-main {
  height: 100vh;
  width: 100vw;
  display: flex;
}

.sidebar {
  height: 100%;
  flex-shrink: 0;
}

.sidebar-menu {
  height: 100%;
}
</style>
