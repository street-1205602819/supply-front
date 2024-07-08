<script setup>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const menus = computed(() => store.getters.menus)

const isCollapse = ref(false)
const sideBarActive = ref('0')

const onSelect = e => {
  sideBarActive.value = e
  router.push({ name: menus.value[e].children[0].route })
}

</script>

<template>
  <el-container class="app-main">
    <el-aside class="sidebar">
      <el-menu :default-active="sideBarActive" class="sidebar-menu" :collapse="isCollapse" @select="onSelect">
        <el-menu-item v-for="(item, index) in menus" :key="index" :index="String(index)">
          <template #title>{{ item.name }}</template>
        </el-menu-item>
        <el-link class="ai-button" type="primary" href="https://chatglm.cn/applyAndLogin" target="_blank">AI指导</el-link>
      </el-menu>
    </el-aside>
    <el-container>
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
  max-width: 200px;
}

.sidebar-menu {
  height: 100%;
  position: relative;
}

.ai-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 18px;
}
</style>
