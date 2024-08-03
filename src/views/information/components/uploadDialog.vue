<script setup>
import { ref, watch } from 'vue'
import { genFileId } from 'element-plus'
import { ElMessage } from 'element-plus'
const props = defineProps({
  'show': Boolean,
})
const emit = defineEmits(['update:show'])
const dialogVisible = ref(false)
watch(() => props.show, val => {
  dialogVisible.value = val
})

watch(() => dialogVisible.value, val => {
  if (!val) {
    upload.value.clearFiles()
  }
  emit('update:show', val)
})

const upload = ref(null)
const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}

const submitUpload = () => {
  loading.value = true
  upload.value.submit()
}

const onSuccess = () => {
  ElMessage.success('上传数据成功')
  loading.value = false
}

const onError = () => {
  loading.value = false
  ElMessage.error('上传数据失败')
}

const loading = ref(false)

const uploadUrl = import.meta.env.VITE_BASE_URL + '/risk_analysis/hot/consult/upload/excel'

</script>

<template>
  <el-dialog v-model="dialogVisible" title="上传" width="500">
    <el-upload v-loading="loading" ref="upload" :action="uploadUrl" :limit="1" :on-exceed="handleExceed" :auto-upload="false"
      :on-success="onSuccess" :on-error="onError">
      <template #trigger>
        <el-button>选择文件</el-button>
      </template>
      <el-button class="upload-button" type="success" @click="submitUpload">
        上传
      </el-button>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
.upload-button {
  margin-left: 12px;
}
</style>
