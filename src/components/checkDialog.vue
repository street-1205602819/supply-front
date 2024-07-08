<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['update:show', 'ok'])
const dialogVisible = ref(false)
watch(() => props.show, val => {
  dialogVisible.value = val
})

watch(() => dialogVisible.value, val => {
  emit('update:show', val)
})

const onOk = () => {
  dialogVisible.value = false
  emit('ok')
}


</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" width="500">
      <span class="warning">确认批量删除选中数据吗？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onOk">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.warning {
  color: var(--el-color-danger-light-3);
  font-size: 18px;
}
</style>
