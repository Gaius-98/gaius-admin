<template>
  <div class="resource">
    <a-card class="search-area">
      <a-form ref="searchFormRef" :model="resourceParamsForm" @finish="onSearch">
        <a-row :gutter="24">
          <a-col :span="4">
            <a-form-item label="资源名称" name="keyword">
              <a-input v-model:value="resourceParamsForm.keyword"> </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="4" style="text-align: right">
            <a-button type="primary" html-type="submit">搜索</a-button>
            <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card>
      <div class="tools">
        <a-upload
          name="file"
          accept="image/*"
          :customRequest="onUpload"
          maxCount="1"
          :showUploadList="false"
        >
          <a-button type="primary"> 上传</a-button>
        </a-upload>
      </div>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="tableData"
        :scroll="{ y: 440 }"
        @change="onChangePagination"
        :pagination="{ current: resourceParamsForm.pageNumber, total: total }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'path'">
            <a-image :src="`${basePath}/${record.path}`" height="130px" />
          </template>
          <template v-if="column.key == 'action'">
            <!-- <a-button type="link" @click="onOpenEditresource(record)">编辑</a-button>
            <a-divider type="vertical" /> -->
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleteresource(record)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import api from './api/resource'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { RoleInfo, PageParams } from '@/model'
import type { ImageItem } from './api/resource'
const resourceParamsForm = reactive<PageParams>({
  keyword: '',
  pageNumber: 1,
  pageSize: 10
})
const tableData = ref<ImageItem[]>([])
const columns = ref([
  {
    title: '文件名称',
    key: 'originalname',
    dataIndex: 'originalname'
  },
  {
    title: '文件大小',
    key: 'size',
    dataIndex: 'size'
  },
  {
    title: '文件',
    key: 'path',
    dataIndex: 'path',
    width: '250px'
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action'
  }
])
const loading = ref(false)
const searchFormRef = ref<FormInstance>()
const basePath = import.meta.env.VITE_REQ_BASE_URL
const onClear = () => {
  searchFormRef.value?.resetFields()
  getList()
}
const total = ref(0)
const onSearch = () => {
  resourceParamsForm.pageNumber = 1
  resourceParamsForm.pageSize = 10
  getList()
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  resourceParamsForm.pageNumber = current!
  resourceParamsForm.pageSize = pageSize!
  getList()
}

const onUpload = (data: any) => {
  const form = new FormData()
  form.append('file', data.file, encodeURIComponent(data.file.name))
  api.add(form).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      message.success(msg)
    }
    getList()
  })
}
const getList = () => {
  loading.value = true
  api.getList(resourceParamsForm).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data.data
      total.value = data.total
    }
    loading.value = false
  })
}
onMounted(() => {
  getList()
})

const onDeleteresource = async (record: RoleInfo) => {
  const { code, msg, data } = await api.remove(record.id!)
  if (code == 200) {
    message.success(data)
    getList()
  }
}
</script>
<style scoped lang="scss">
.resource {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .search-area {
    margin-bottom: 20px;
  }
  .tools {
    margin-bottom: 5px;
  }
}
</style>
