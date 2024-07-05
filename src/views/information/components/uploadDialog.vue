<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  'show': Boolean,
})
const emit = defineEmits(['update:show'])
const dialogVisible = ref(false)
watch(() => props.show, val => {
  dialogVisible.value = val
})

watch(() => dialogVisible.value, val => {
  emit('update:show', val)
})


</script>

<template>
  <el-dialog v-model="dialogVisible" title="上传" width="500">
    <span>This is a message</span>
    <!-- <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template> -->
  </el-dialog>
</template>
<style scoped lang="scss"></style>
