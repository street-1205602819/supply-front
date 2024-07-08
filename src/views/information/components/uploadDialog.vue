<script setup>
import { ref, computed, watch } from 'vue'
import { genFileId } from 'element-plus'
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
  upload.value.submit()
}

</script>

<template>
  <el-dialog v-model="dialogVisible" title="上传" width="500">
    <el-upload ref="upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
      :on-exceed="handleExceed" :auto-upload="false">
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
