<script setup>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()
const menus = computed(() => store.getters.menus)

const isCollapse = ref(false)
const sideBarActive = ref('0')

const onSelect = e => {
  sideBarActive.value = e
  router.push({ name: menus.value[e].children[0].route })
}

const title = computed(() => route.meta.title)

const sidebarWidth = computed(() => isShowBar.value ? 200 : 70)
const isShowBar = ref(false)

const onAi = () => {
  window.open('https://chatglm.cn/applyAndLogin', '_blank')
}
</script>

<template>
  <el-container class="app-main">
    <el-aside class="sidebar" :width="sidebarWidth + 'px'">
      <div class="logo-container">
        <img src="../assets/img/logo.png" alt="" class="app-logo">
        <div class="logo-text" v-if="isShowBar">Supply Chain</div>
      </div>
      <el-menu :default-active="sideBarActive" class="sidebar-menu" :collapse="isCollapse" @select="onSelect">
        <el-menu-item v-for="(item, index) in menus" :key="index" :index="String(index)">
          <template #title>
            <div class="menu-content">
              <i :class="`iconfont icon-${item.route}`"></i>
              <span v-if="isShowBar">
                {{ item.name }}
              </span>
            </div>
          </template>
        </el-menu-item>
        <i class="iconfont icon-ai" v-if="!isShowBar" @click="onAi"></i>
        <el-link v-if="isShowBar" class="ai-button" type="primary" href="https://chatglm.cn/applyAndLogin" target="_blank">AI指导</el-link>
      </el-menu>
    </el-aside>
    <el-container class="app-content">
      <div class="content-title">
        <span>{{ title }}</span>
        <i :class="`iconfont icon-shouqi-01 collapse`" @click="isShowBar = !isShowBar"></i>
        </div>
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
  background-color: #f0f2f8;
  padding: 8px;
}

.sidebar-menu {
  position: relative;
  height: calc(100% - 60px);
}

.ai-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 18px;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 0 10px 10px;
  position: relative;
}

.app-content {
  flex-direction: column;
}

.content-title {
  min-height: 60px;
  display: flex;
  align-items: center;
  padding-left: 26px;
  font-weight: 600;
  color: #374050;
  font-size: 18px;
  border-bottom: 1px solid rgb(238, 239, 243);
  background-color: rgb(249, 249, 251);
  position: relative;
}

.app-logo {
  height: 40px;
  width: 40px;
  margin-right: 8px;
}

.logo-text {
  font-weight: 600;
}

.menu-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.menu-button {
  position: absolute;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  right: -22px;
  z-index: 999;
  background-color: #c5c5c5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: rotate(180deg);
}

.collapse {
  position: absolute;
  left: 8px;
  font-size: 12px;
  cursor: pointer;
}

.icon-ai {
  font-size: 30px;
  position: absolute;
  bottom: 14px;
  left: 10px;
  cursor: pointer;
}
</style>
