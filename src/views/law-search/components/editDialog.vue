<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  show: Boolean,
  editData: Object
})
const emit = defineEmits(['update:show', 'ok'])
const dialogVisible = ref(false)
watch(
  () => props.show,
  (val) => {
    dialogVisible.value = val
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:show', val)
  }
)

const formData = ref({})
watch(
  () => props.editData,
  (val) => {
    formData.value = val
  }
)

const onOk = () => {
  dialogVisible.value = false
  emit('ok')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="500">
    <el-form :model="formData" label-width="auto">
      <el-form-item label="序号">
        <el-input v-model="formData.seq" />
      </el-form-item>
      <el-form-item label="涉及工作">
        <el-input v-model="formData.referWork" />
      </el-form-item>
      <el-form-item label="参考法律名	">
        <el-input v-model="formData.referLaw" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onOk">
          修改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
