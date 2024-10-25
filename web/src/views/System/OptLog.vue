<template>
  <div class="optLog">
    <a-card class="search-area">
      <a-form ref="searchFormRef" :model="optLogParamsForm" layout="inline" @finish="onSearch">
        <a-form-item label="用户名" name="keyword">
          <a-input v-model:value="optLogParamsForm.keyword"> </a-input>
        </a-form-item>
        <a-form-item label="操作日期">
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
        :scroll="{ y: 600 }"
        @change="onChangePagination"
        :pagination="{
          current: optLogParamsForm.pageNumber,
          total: total,
          showSizeChanger: true,
          pageSize: optLogParamsForm.pageSize
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'optType'">
            <a-tag :color="optTypeMap.get(record.optType)?.color">{{
              optTypeMap.get(record.optType)?.label
            }}</a-tag>
          </template>
          <template v-if="column.key == 'resTime'">
            <a-tag :color="parseInt(record.resTime) < 500 ? '#87d068' : '#f50'">{{
              record.resTime
            }}</a-tag>
          </template>
          <template v-if="column.key == 'resStatus'">
            <a-tag color="#87d068" v-if="record.resStatus == '1'">成功</a-tag>
            <a-tag color="#f50" v-else>失败</a-tag>
          </template>
          <template v-if="column.key == 'action'">
            <a-button type="link" @click="onOpenView(record)">查看</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:open="open" title="查看详情" :footer="null" width="1000px">
      <a-descriptions :column="2">
        <a-descriptions-item label="操作用户">{{ formData.username }}</a-descriptions-item>
        <a-descriptions-item label="操作IP">{{ formData.ip }}</a-descriptions-item>
        <a-descriptions-item label="操作地点">{{ formData.location }}</a-descriptions-item>
        <a-descriptions-item label="操作时间">{{ formData.createTime }}</a-descriptions-item>
        <a-descriptions-item label="请求类型">{{ formData.reqType }}</a-descriptions-item>
        <a-descriptions-item label="请求地址">{{ formData.reqUrl }}</a-descriptions-item>
        <a-descriptions-item label="请求参数">{{ formData.reqParam }}</a-descriptions-item>
        <a-descriptions-item label="模块名称">{{ formData.moduleName }}</a-descriptions-item>
        <a-descriptions-item label="方法名称">{{ formData.funcName }}</a-descriptions-item>
        <a-descriptions-item label="操作模块">{{ formData.optModule }}</a-descriptions-item>
        <a-descriptions-item label="操作类型">
          <a-tag :color="optTypeMap.get(formData.optType!)?.color">{{
            optTypeMap.get(formData.optType!)?.label
          }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="操作结果">
          <a-tag color="#87d068" v-if="formData.resStatus == '1'">成功</a-tag>
          <a-tag color="#f50" v-else>失败</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="响应时间">
          <a-tag :color="parseInt(formData.resTime!) < 500 ? '#87d068' : '#f50'">{{
            formData.resTime
          }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="请求结果" :span="4">{{ formData.res }}</a-descriptions-item>
        <a-descriptions-item label="异常信息" :span="4">{{ formData.errMsg }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/optLog'
import common, { type DictItem } from '@/api/common'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { PageParams, SystemOptLog } from '@/model'
const optLogParamsForm = reactive<PageParams>({
  keyword: '',
  startTime: '',
  endTime: '',
  pageNumber: 1,
  pageSize: 20
})
const date = ref('')
const tableData = ref<SystemOptLog[]>([])
const columns = ref([
  {
    title: '操作用户',
    key: 'username',
    dataIndex: 'username'
  },
  {
    title: 'ip地址',
    key: 'ip',
    dataIndex: 'ip'
  },
  {
    title: '地址',
    key: 'location',
    dataIndex: 'location'
  },
  {
    title: '操作模块',
    key: 'optModule',
    dataIndex: 'optModule'
  },
  {
    title: '操作类型',
    key: 'optType',
    dataIndex: 'optType'
  },
  {
    title: '操作结果',
    key: 'resStatus',
    dataIndex: 'resStatus'
  },
  {
    title: '响应时间',
    key: 'resTime',
    dataIndex: 'resTime'
  },
  {
    title: '操作时间',
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

  getList()
}
const total = ref(0)
const onSearch = () => {
  optLogParamsForm.pageNumber = 1
  optLogParamsForm.pageSize = 20
  getList()
}
const changeTime = () => {
  if (date.value) {
    optLogParamsForm.startTime = date.value[0]
    optLogParamsForm.endTime = date.value[1]
  } else {
    optLogParamsForm.startTime = ''
    optLogParamsForm.endTime = ''
  }
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  optLogParamsForm.pageNumber = current!
  optLogParamsForm.pageSize = pageSize!
  getList()
}
const getList = () => {
  loading.value = true
  api.getList(optLogParamsForm).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data.data
      total.value = data.total
    }
    loading.value = false
  })
}
const formData = ref<Partial<SystemOptLog>>({})
const open = ref(false)
const onOpenView = (record: SystemOptLog) => {
  formData.value = record
  open.value = true
}
const optTypeList = ref<DictItem[]>([])
const optTypeMap = ref<
  Map<
    string,
    {
      label: string
      color: string
    }
  >
>(new Map())
const colorList = ['green', 'cyan', 'red', 'pink', 'orange', 'blue', 'purple']
onMounted(() => {
  getList()
  common.getDict(['optType']).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      optTypeList.value = data['optType']
      optTypeList.value.forEach((item, idx) => {
        optTypeMap.value.set(item.value, {
          label: item.label,
          color: colorList[idx]
        })
      })
    }
  })
})
</script>
<style scoped lang="scss">
.optLog {
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
