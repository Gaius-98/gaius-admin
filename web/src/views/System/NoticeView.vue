<template>
  <div class="notice">
    <a-card class="search-area">
      <a-form ref="searchFormRef" :model="noticeParams" layout="inline" @finish="onSearch">
        <a-form-item label="关键字" prop="keyword">
          <a-input v-model:value="noticeParams.keyword"> </a-input>
        </a-form-item>
        <a-form-item label="日期范围">
          <a-range-picker
            v-model:value="date"
            :showTime="true"
            valueFormat="YYYY-MM-DD HH:mm:ss"
            @change="changeTime()"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <div class="tools">
        <a-button type="primary" @click="onOpenAddnotice" v-has-perm="'system:notice:add'"
          >新增</a-button
        >
      </div>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="tableData"
        :scroll="{ y: 560 }"
        @change="onChangePagination"
        :pagination="{
          current: noticeParams.pageNumber,
          total: total,
          showSizeChanger: true,
          pageSize: noticeParams.pageSize
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'action'">
            <a-button
              type="link"
              @click="onOpenEditnotice(record)"
              v-has-perm="'system:notice:update'"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeletenotice(record)"
            >
              <a-button type="link" danger v-has-perm="'system:notice:remove'">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:open="modalOpen" @ok="onConfirm" :title="modalTitle" @cancel="resetForm">
      <a-form :model="formData" :label-col="{ span: 8 }" ref="modalFormRef">
        <a-form-item label="标题" required prop="title">
          <a-input v-model:value="formData.title"></a-input>
        </a-form-item>
        <a-form-item label="内容" required prop="title">
          <a-textarea v-model:value="formData.content" :rows="5"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/notice'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { PageParams } from '@/model'
import type { SystemNotice } from '@/model'
import common, { type DictItem } from '@/api/common'
const noticeParams = reactive<PageParams>({
  keyword: '',
  pageNumber: 1,
  pageSize: 10,
  startTime: '',
  endTime: ''
})
const date = ref('')
const changeTime = () => {
  if (date.value) {
    noticeParams.startTime = date.value[0]
    noticeParams.endTime = date.value[1]
  } else {
    noticeParams.startTime = ''
    noticeParams.endTime = ''
  }
}
const tableData = ref<SystemNotice[]>([])
const columns = ref([
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    width: '150px'
  },
  {
    title: '内容',
    key: 'content',
    dataIndex: 'content',
    width: '400px',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    width: '250px'
  }
])
const loading = ref(false)
const searchFormRef = ref<FormInstance>()
const onClear = () => {
  searchFormRef.value?.resetFields()
  noticeParams.startTime = ''
  noticeParams.endTime = ''
  date.value = ''
  getList()
}
const total = ref(0)
const onSearch = () => {
  noticeParams.pageNumber = 1
  noticeParams.pageSize = 10
  getList()
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  noticeParams.pageNumber = current!
  noticeParams.pageSize = pageSize!
  getList()
}
const getList = () => {
  loading.value = true
  api.getList(noticeParams).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data.data
      total.value = data.total
    }
    loading.value = false
  })
}
const noticeTypeList = ref<DictItem[]>([])
const noticeTypeMap = ref<Record<string, string>>({})
onMounted(() => {
  getList()
  common.getDict(['configType']).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      noticeTypeList.value = data['configType']
      noticeTypeMap.value = noticeTypeList.value.reduce(
        (p, c) => {
          p[c.value] = c.label
          return p
        },
        {} as Record<string, string>
      )
    }
  })
})
const modalOpen = ref(false)
const formData = ref<SystemNotice>({
  title: '',
  content: ''
})
const modalType = ref<'add' | 'edit'>('add')
const modalTitle = computed(() => {
  let titleObj = {
    add: '新增通知',
    edit: '编辑通知'
  }
  return titleObj[modalType.value]
})
const modalFormRef = ref<FormInstance>()
const onOpenAddnotice = () => {
  modalType.value = 'add'
  modalOpen.value = true
  formData.value = {
    title: '',
    content: ''
  }
}

const onOpenEditnotice = async (record: SystemNotice) => {
  const { code, data } = await api.getDetail(record.id!)
  if (code == 200) {
    formData.value = data
    modalType.value = 'edit'
    modalOpen.value = true
  }
}
const onDeletenotice = async (record: SystemNotice) => {
  const { code, msg, data } = await api.remove(record.id!)
  if (code == 200) {
    message.success(data)
    getList()
  }
}
const resetForm = () => {
  modalFormRef.value?.resetFields()
}
const onConfirm = () => {
  modalFormRef.value?.validate().then(() => {
    let http
    if (modalType.value == 'add') {
      http = api.add
    } else {
      http = api.update
    }
    http(formData.value).then((res) => {
      const { code } = res
      if (code == 200) {
        message.success(modalType.value == 'add' ? '新增成功' : '编辑成功')
        getList()
      }
      resetForm()
      modalOpen.value = false
    })
  })
}

onMounted(() => {})
</script>
<style scoped lang="scss">
.notice {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .search-area {
    margin-bottom: $gap;
  }
  .tools {
    margin-bottom: $half-gap;
  }
}
</style>
