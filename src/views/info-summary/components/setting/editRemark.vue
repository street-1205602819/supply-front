<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateAnalysisRemark } from '@/api/info-summary'
const props = defineProps({
  show: Boolean,
  editData: Object,
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
    formData.value = JSON.parse(JSON.stringify(val))
  }
)

const onOk = async () => {
  await updateAnalysisRemark({
    remark: formData.value.remark,
    tweetId: props.editData.tweetId
  })
  ElMessage.success('操作成功')
  dialogVisible.value = false
  emit('ok')
}

</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑备注" width="500">
    <el-form :model="formData" label-width="auto">
      <el-form-item label="备注">
        <el-input v-model="formData.remark" placeholder="请输入" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onOk">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
