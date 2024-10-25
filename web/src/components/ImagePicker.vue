<template>
  <div class="image-picker">
    <div v-if="!value" class="select-image" @click="showModal">
      <plus-outlined></plus-outlined>
      <div class="select-image-text">选择图片</div>
    </div>
    <div v-else class="preview-image">
      <CloseOutlined
        @click="onChange('')"
        style="position: absolute; top: 5px; right: 5px; color: #999; z-index: 99"
      ></CloseOutlined>
      <a-image :src="value" width="100px" height="100px" />
    </div>
    <a-modal v-model:open="open" title="选择图片" @ok="handleOk" @cancel="onCancel">
      <a-upload
        name="file"
        accept="image/*"
        :customRequest="onUpload"
        maxCount="1"
        :showUploadList="false"
      >
        <a-button type="primary">自定义</a-button>
      </a-upload>
      <div class="image-container">
        <a-button
          type="ghost"
          :icon="h(LeftOutlined)"
          @click="onLastPage"
          :disabled="params.pageNumber == 1"
        >
        </a-button>
        <div class="image-list">
          <div
            v-for="item in currentImages"
            :key="item.id"
            class="image-item"
            :class="{ selected: selected == item.path }"
          >
            <img :src="item.path" @click="onClickItem(item.path)" height="100px" width="100px" />
          </div>
        </div>
        <a-button
          type="ghost"
          :icon="h(RightOutlined)"
          @click="onNextPage"
          :disabled="params.pageSize * (params.pageNumber - 1) + currentImages.length == total"
        >
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { reactive, toRefs, ref, onMounted, h } from 'vue'
import { LeftOutlined, RightOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons-vue'
import resourceApi from './../views/System/api/resource'
import type { ImageItem } from './../views/System/api/resource'

const value = defineModel('value', {
  type: String,
  required: true
})
const currentImages = ref<ImageItem[]>([])
const params = ref({
  pageSize: 3,
  pageNumber: 1,
  keyword: ''
})
const total = ref(0)
const basePath = import.meta.env.VITE_REQ_BASE_URL
const selected = ref('')
const onClickItem = (url: string) => {
  selected.value = url
}
const onNextPage = () => {
  params.value.pageNumber++
  getList()
}
const getList = () => {
  resourceApi.getList(params.value).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      currentImages.value = data.data
      total.value = data.total
    }
  })
}
const onLastPage = () => {
  params.value.pageNumber--
  getList()
}
const onUpload = (data: any) => {
  const form = new FormData()
  form.append('file', data.file, encodeURIComponent(data.file.name))
  resourceApi.add(form).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      onChange(`${basePath}/${data.path}`)
      message.success(msg)
      open.value = false
    }
  })
}

const open = ref(false)
const showModal = () => {
  open.value = true
}
const emits = defineEmits(['change'])
const onChange = (val: string) => {
  value.value = val
  emits('change', val)
}
const handleOk = () => {
  onChange(selected.value)
  onCancel()
}

const onCancel = () => {
  selected.value = ''
  open.value = false
}
onMounted(() => {
  getList()
})
</script>
<style scoped lang="scss">
.image-picker {
  display: flex;
  flex-direction: column;
  .select-image {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px dashed#ccc;
    border-radius: 5px;
    cursor: pointer;
    .select-image-text {
      color: #999;
      margin-top: 5px;
    }
  }
  .preview-image {
    width: 100px;
    height: 100px;
    position: relative;
  }
}
.image-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.image-list {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  .image-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 10px 0;
    cursor: pointer;
  }
  .selected {
    background-color: #1677ff;
  }
}
</style>
