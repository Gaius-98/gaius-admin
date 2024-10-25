<template>
  <div class="setting">
    <a-card class="search-area">
      <a-form ref="searchFormRef" :model="settingParams" layout="inline" @finish="onSearch">
        <a-form-item label="配置类型" prop="type">
          <a-select
            v-model:value="settingParams.type"
            :options="settingTypeList"
            show-search
            allowClear
            optionFilterProp="label"
            style="width: 200px"
          ></a-select>
        </a-form-item>
        <a-form-item label="配置键名" prop="keyword">
          <a-input v-model:value="settingParams.keyword"> </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <div class="tools">
        <a-button type="primary" @click="onOpenAddsetting" v-has-perm="'system:setting:add'"
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
          current: settingParams.pageNumber,
          total: total,
          showSizeChanger: true,
          pageSize: settingParams.pageSize
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'status'">
            <a-tag color="#87d068" v-if="record.status == '1'">启用</a-tag>
            <a-tag color="#f50" v-else>停用</a-tag>
          </template>
          <template v-if="column.key == 'settingType'">
            <a-tag>{{ settingTypeMap[record.settingType] || '未定义' }}</a-tag>
          </template>
          <template v-if="column.key == 'action'">
            <a-button
              type="link"
              @click="onOpenEditsetting(record)"
              v-has-perm="'system:setting:update'"
              >编辑</a-button
            >
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeletesetting(record)"
            >
              <a-button type="link" danger v-has-perm="'system:setting:remove'">删除</a-button>
            </a-popconfirm>
          </template>
          <template v-if="column.key == 'settingType'">
            <a-tag color="#2db7f5" v-if="record.settingType == 'app'">菜单</a-tag>
            <a-tag color="#87d068" v-if="record.settingType == 'directory'">目录</a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:open="modalOpen" @ok="onConfirm" :title="modalTitle" @cancel="resetForm">
      <a-form :model="formData" :label-col="{ span: 8 }" ref="modalFormRef">
        <a-form-item label="配置键名" required prop="settingKey">
          <a-input v-model:value="formData.settingKey"></a-input>
        </a-form-item>
        <a-form-item label="配置值" required prop="settingValue">
          <a-textarea auto-size v-model:value="formData.settingValue"></a-textarea>
        </a-form-item>
        <a-form-item label="配置类型" required prop="settingType">
          <a-select v-model:value="formData.settingType" :options="settingTypeList"></a-select>
        </a-form-item>
        <a-form-item label="状态" required prop="status">
          <a-radio-group v-model:value="formData.status" button-style="solid">
            <a-radio-button value="1">启用 </a-radio-button>
            <a-radio-button value="0">停用 </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="备注" prop="remark">
          <a-textarea v-model:value="formData.remark" :rows="5"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/setting'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { AuthInfo, PageParams, CreateAuthInfo, RoleDictItem } from '@/model'
import ImagePicker from '@/components/ImagePicker.vue'
import type { SystemSetting } from '@/model'
import common, { type DictItem } from '@/api/common'
const settingParams = reactive<PageParams>({
  keyword: '',
  pageNumber: 1,
  pageSize: 10,
  type: ''
})
const tableData = ref<SystemSetting[]>([])
const columns = ref([
  {
    title: '配置键名',
    key: 'settingKey',
    dataIndex: 'settingKey',
    width: '150px'
  },
  {
    title: '配置值',
    key: 'settingValue',
    dataIndex: 'settingValue',
    width: '400px'
  },
  {
    title: '配置类型',
    key: 'settingType',
    dataIndex: 'settingType',
    width: '100px'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: '100px'
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark'
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
  settingParams.pageNumber = 1
  settingParams.pageSize = 10
  getList()
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  settingParams.pageNumber = current!
  settingParams.pageSize = pageSize!
  getList()
}
const getList = () => {
  loading.value = true
  api.getList(settingParams).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data.data
      total.value = data.total
    }
    loading.value = false
  })
}
const settingTypeList = ref<DictItem[]>([])
const settingTypeMap = ref<Record<string, string>>({})
onMounted(() => {
  getList()
  common.getDict(['configType']).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      settingTypeList.value = data['configType']
      settingTypeMap.value = settingTypeList.value.reduce(
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
const formData = ref<SystemSetting>({
  settingKey: '',
  settingValue: '',
  settingType: '',
  status: '1',
  remark: ''
})
const modalType = ref<'add' | 'edit'>('add')
const modalTitle = computed(() => {
  let titleObj = {
    add: '新增配置',
    edit: '编辑配置'
  }
  return titleObj[modalType.value]
})
const modalFormRef = ref<FormInstance>()
const onOpenAddsetting = () => {
  modalType.value = 'add'
  modalOpen.value = true
  formData.value = {
    settingKey: '',
    settingValue: '',
    settingType: '',
    status: '1',
    remark: ''
  }
}

const onOpenEditsetting = async (record: SystemSetting) => {
  const { code, data } = await api.getDetail(record.id!)
  if (code == 200) {
    formData.value = data
    modalType.value = 'edit'
    modalOpen.value = true
  }
}
const onDeletesetting = async (record: SystemSetting) => {
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
.setting {
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
