<script setup>
import { ref, watch, computed } from 'vue'
import { addCategory, updateCategory, addKeyword, updateKeyword } from '@/api/info-summary'
import { ElMessage } from 'element-plus'
const props = defineProps({
  show: Boolean,
  editData: Object,
  editType: String,
  editField: String,
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
  let fn = null
  let params = null
  switch (props.editField) {
    case 'category':
      if (props.editType === 'add') {
        fn = addCategory
        params = {
          category: formData.value.category
        }
      } else {
        fn = updateCategory
        params = {
          categoryNo: props.editData.categoryNo,
          category: formData.value.category
        }
      }
      break
    case 'keyword':
      if (props.editType === 'add') {
        fn = addKeyword
        params = {
          categoryNo: props.editData.categoryNo,
          keyword: formData.value.keyword
        }
      } else {
        fn = updateKeyword
        params = {
          oldKeyword: props.editData.keyword,
          newKeyword: formData.value.keyword
        }
      }
      break
  }
  await fn(params)
  ElMessage.success('操作成功')
  dialogVisible.value = false
  emit('ok')
}

const fieldText = computed(() => props.editField === 'category' ? '环节' : '关键词')
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="editType === 'add' ? '添加' : '编辑' + fieldText" width="500">
    <el-form :model="formData" label-width="auto">
      <el-form-item label="环节" v-if="editField === 'category'">
        <el-input v-model="formData.category" />
      </el-form-item>
      <el-form-item label="关键词" v-else>
        <el-input v-model="formData.keyword" />
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
