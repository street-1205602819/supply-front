<script setup>
import { ref, watch } from 'vue'
import { addRecord, updateRecord } from '@/api/law'
import { ElMessage } from 'element-plus'
const props = defineProps({
  show: Boolean,
  editData: Object,
  editType: String,
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
  let func = null
  let parmas = null
  if (props.editType === 'add') {
    func = addRecord
    parmas = {
      referWork: formData.value.referWork,
      referLaw: formData.value.referLaw,
    }
  } else {
    func = updateRecord
    parmas = formData.value
  }
  await func(parmas)
  ElMessage.success('操作成功')
  dialogVisible.value = false
  emit('ok')
}

</script>

<template>
  <el-dialog v-model="dialogVisible" :title="editType === 'add' ? '添加' : '编辑'" width="500">
    <el-form :model="formData" label-width="auto">
      <el-form-item label="序号" v-if="editType === 'edit'">
        <el-input v-model="formData.seq" disabled />
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
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
