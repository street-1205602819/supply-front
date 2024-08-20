<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
  focusUpdateRemark
} from '@/api/info-summary'
const props = defineProps({
  show: Boolean,
  editRemarkData: Object
})
const emit = defineEmits(['update:show', 'ok'])
const dialogVisible = ref(false)
watch(
  () => props.show,
  (val) => {
    dialogVisible.value = val
    if (val) {
      remark.value = props.editRemarkData.remark
    }
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:show', val)
  }
)

const remark = ref('')

const onOk = async () => {
  await focusUpdateRemark({
    tweetId: props.editRemarkData.tweetId,
    remark: remark.value
  })
  ElMessage.success('操作成功')
  dialogVisible.value = false
  emit('ok')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑备注" width="500">
    <el-form class="form" label-position="top">
      <el-form-item label="备注">
        <el-input v-model="remark" placeholder="请输入" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onOk">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
.operation {
  margin-bottom: 8px;
  width: 100%;
}
</style>
