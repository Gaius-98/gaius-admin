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
          <template v-if="column.key == 'status'">
            <a-tag color="#87d068" v-if="record.status == '1'">已读</a-tag>
            <a-tag color="#f50" v-else>未读</a-tag>
          </template>
          <template v-if="column.key == 'title'">
            <div :title="record.notice.title">{{ record.notice.title }}</div>
          </template>
          <template v-if="column.key == 'content'">
            <div>{{ record.notice.content }}</div>
          </template>
          <template v-if="column.key == 'action'">
            <a-button
              type="link"
              @click="onOpenViewnotice(record)"
              v-has-perm="'private:notice:detail'"
              >查看</a-button
            >
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal
      v-model:open="modalOpen"
      title="查看通知"
      :footer="null"
      :width="700"
      @cancel="getList()"
    >
      <a-descriptions :column="2">
        <a-descriptions-item label="标题" style="font-weight: bold">{{
          formData.notice.title
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">
          <a-tag color="#87d068" v-if="formData.status == '1'">已读</a-tag>
          <a-tag color="#f50" v-else>未读</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="发送人">
          {{ formData?.userInfo?.username }}
        </a-descriptions-item>
        <a-descriptions-item label="查看时间">{{ formData.readTime }}</a-descriptions-item>
        <a-descriptions-item label="内容" :span="2">{{
          formData.notice.content
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/notice'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { PageParams } from '@/model'
import type { SystemUserNotice } from '@/model'
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
const tableData = ref<SystemUserNotice[]>([])
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
    width: '500px',
    ellipsis: true
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: '100px'
  },
  {
    title: '消息发送时间',
    key: 'createTime',
    dataIndex: 'createTime'
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
  api.getNoticeList(noticeParams).then((res) => {
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
const formData = ref<SystemUserNotice>({
  id: 0,
  noticeId: 0,
  recevieId: '',
  status: '',
  notice: {
    title: '',
    content: ''
  }
})

const onOpenViewnotice = async (record: SystemUserNotice) => {
  const { code, data } = await api.getNoticeDetail(record.id!)
  if (code == 200) {
    formData.value = data
    modalOpen.value = true
  }
}
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
