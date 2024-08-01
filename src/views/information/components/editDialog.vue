<script setup>
import { ref, watch } from 'vue'
import { updateRecord } from '@/api/information'
import { ElMessage } from 'element-plus'
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

const onOk = async () => {
  await updateRecord(formData.value)
  ElMessage.success('操作成功')
  dialogVisible.value = false
  emit('ok')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="500">
    <el-form :model="formData" label-width="auto">
      <el-form-item label="标题">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="发布点位">
        <el-input v-model="formData.publishAddress" />
      </el-form-item>
      <el-form-item label="敏感内容	">
        <el-input v-model="formData.sensitiveContent" />
      </el-form-item>
      <el-form-item label="原文链接">
        <el-input v-model="formData.originalLink" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker v-model="formData.publishTime" type="date" style="width: 100%" value-format="YYYY-MM-DD" />
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
