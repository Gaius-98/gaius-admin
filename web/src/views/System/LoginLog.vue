<template>
  <div class="loginLog">
    <a-card class="search-area">
      <a-form ref="searchFormRef" :model="loginLogParamsForm" layout="inline" @finish="onSearch">
        <a-form-item label="ip地址" name="keyword">
          <a-input v-model:value="loginLogParamsForm.keyword"> </a-input>
        </a-form-item>
        <a-form-item label="登录日期">
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
          current: loginLogParamsForm.pageNumber,
          total: total,
          showSizeChanger: true,
          pageSize: loginLogParamsForm.pageSize
        }"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/loginLog'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { PageParams, SystemLoginLog } from '@/model'
const loginLogParamsForm = reactive<PageParams>({
  keyword: '',
  startTime: '',
  endTime: '',
  pageNumber: 1,
  pageSize: 20
})
const date = ref('')
const tableData = ref<SystemLoginLog[]>([])
const columns = ref([
  {
    title: '用户名',
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
    key: 'address',
    dataIndex: 'address'
  },
  {
    title: '操作系统',
    key: 'os',
    dataIndex: 'os'
  },
  {
    title: '浏览器',
    key: 'browser',
    dataIndex: 'browser'
  },
  {
    title: '登录时间',
    key: 'createTime',
    dataIndex: 'createTime'
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
  loginLogParamsForm.pageNumber = 1
  loginLogParamsForm.pageSize = 20
  getList()
}
const changeTime = () => {
  if (date.value) {
    loginLogParamsForm.startTime = date.value[0]
    loginLogParamsForm.endTime = date.value[1]
  } else {
    loginLogParamsForm.startTime = ''
    loginLogParamsForm.endTime = ''
  }
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  loginLogParamsForm.pageNumber = current!
  loginLogParamsForm.pageSize = pageSize!
  getList()
}
const getList = () => {
  loading.value = true
  api.getList(loginLogParamsForm).then((res) => {
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
</script>
<style scoped lang="scss">
.loginLog {
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
