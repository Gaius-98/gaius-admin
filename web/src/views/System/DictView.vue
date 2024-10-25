<template>
  <div class="dict">
    <a-card class="search-area">
      <a-form ref="searchFormRef" layout="inline" :model="dictParamsForm" @finish="onSearch">
        <a-form-item label="字典类型" name="dictType">
          <a-select
            v-model:value="dictParamsForm.dictType"
            :fieldNames="{
              label: 'dictTypeDesc',
              value: 'dictType'
            }"
            optionFilterProp="dictTypeDesc"
            show-search
            allowClear
            :options="dictTypes"
            style="width: 200px"
          >
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <div class="tools">
        <a-button type="primary" @click="onOpenAddDict" v-has-perm="'system:dict:add'"
          >新增</a-button
        >
      </div>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="tableData"
        :pagination="{
          current: dictParamsForm.pageNumber,
          total: total,
          showSizeChanger: true,
          pageSize: dictParamsForm.pageSize
        }"
        v-model:current="dictParamsForm.pageNumber"
        @change="onChangePagination"
        :scroll="{ y: 560 }"
        rowKey="id"
        class="ant-table-striped"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'status'">
            <a-tag color="#87d068" v-if="record.status == '1'">启用</a-tag>
            <a-tag color="#f50" v-else>停用</a-tag>
          </template>
          <template v-if="column.key == 'action'">
            <a-button
              type="link"
              @click="onOpenDictDataModal(record)"
              v-has-perm="'system:dict:add'"
              >新增</a-button
            >
            <a-button
              type="link"
              @click="onOpenEditDictType(record)"
              v-has-perm="'system:dict:update'"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleteDictType(record)"
            >
              <a-button type="link" danger v-has-perm="'system:dict:remove'">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
        <template #expandedRowRender="{ record }">
          <a-card>
            <a-table
              class="ant-table-striped"
              :columns="dictColumns"
              :pagination="false"
              :data-source="record.dictDataList"
              :row-class-name="
                (_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)
              "
              style="margin: 5px"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key == 'status'">
                  <a-tag color="#87d068" v-if="record.status">启用</a-tag>
                  <a-tag color="#f50" v-else>停用</a-tag>
                </template>
                <template v-if="column.key == 'action'">
                  <a-button
                    type="link"
                    @click="onOpenEditdict(record)"
                    v-has-perm="'system:dict:update'"
                    >编辑</a-button
                  >
                  <a-divider type="vertical" />
                  <a-popconfirm
                    title="确定要删除吗?"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="onDeleteDict(record)"
                  >
                    <a-button type="link" danger v-has-perm="'system:dict:remove'">删除</a-button>
                  </a-popconfirm>
                </template>
              </template>
            </a-table>
          </a-card>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:open="modalOpen" @ok="onConfirm" :title="modalTitle" @cancel="resetForm">
      <a-form :model="formData" :label-col="{ span: 8 }" ref="modalFormRef">
        <a-form-item label="字典类型" required prop="dictType">
          <a-input v-model:value="formData.dictType"></a-input>
        </a-form-item>
        <a-form-item label="类型描述" required prop="dictTypeDesc">
          <a-input v-model:value="formData.dictTypeDesc"></a-input>
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
    <a-modal
      v-model:open="dictDataOpen"
      :title="modalDictDataTitle"
      @ok="onDictConfirm"
      @cancel="resetDictForm"
    >
      <a-form :model="formDictData" :label-col="{ span: 8 }" ref="modalDictDataRef">
        <a-form-item label="所属类型" required prop="dictType">
          <a-select
            v-model:value="formDictData.dictType"
            :fieldNames="{
              label: 'dictTypeDesc',
              value: 'dictType'
            }"
            optionFilterProp="dictTypeDesc"
            show-search
            allowClear
            :options="dictTypes"
            disabled
          >
          </a-select>
        </a-form-item>
        <a-form-item label="字典值" required prop="value">
          <a-input v-model:value="formDictData.value"></a-input>
        </a-form-item>
        <a-form-item label="字典翻译" required prop="label">
          <a-input v-model:value="formDictData.label"></a-input>
        </a-form-item>
        <a-form-item label="排序号" required prop="sortNum">
          <a-input-number :min="0" :step="1" v-model:value="formDictData.sortNum"></a-input-number>
        </a-form-item>
        <a-form-item label="状态" required prop="status">
          <a-radio-group v-model:value="formDictData.status" button-style="solid">
            <a-radio-button value="1">启用 </a-radio-button>
            <a-radio-button value="0">停用 </a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed, defineComponent } from 'vue'
import api from './api/dict'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { SystemDictItem, SystemDictTypeItem } from '@/model'
import type { DictPageParams } from './api/dict'
import { PlusOutlined } from '@ant-design/icons-vue'
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true
    }
  },
  render() {
    return this.vnodes
  }
})
const dictParamsForm = reactive<DictPageParams>({
  keyword: '',
  dictType: '',
  pageNumber: 1,
  pageSize: 10
})
const tableData = ref<SystemDictTypeItem[]>([])
const columns = ref([
  {
    title: '字典类型',
    key: 'dictType',
    dataIndex: 'dictType',
    width: '300px'
  },
  {
    title: '类型描述',
    key: 'dictTypeDesc',
    dataIndex: 'dictTypeDesc',
    width: '300px'
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
const dictColumns = ref([
  {
    title: '字典值',
    key: 'value',
    dataIndex: 'value',
    width: '300px'
  },
  {
    title: '翻译值',
    key: 'label',
    dataIndex: 'label',
    width: '300px'
  },
  {
    title: '排序号',
    key: 'sortNum',
    dataIndex: 'sortNum',
    width: '120px'
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
  dictParamsForm.pageNumber = 1
  dictParamsForm.pageSize = 10
  getList()
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  dictParamsForm.pageNumber = current!
  dictParamsForm.pageSize = pageSize!
  getList()
}
const getList = () => {
  loading.value = true
  api.getTypeList(dictParamsForm).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data.data
      total.value = data.total
    }
    loading.value = false
  })
}
const dictTypes = ref<SystemDictTypeItem[]>([])
const getDictTypes = async () => {
  const { code, data, msg } = await api.getDictTypeList()
  if (code == 200) {
    dictTypes.value = data
  }
}
onMounted(() => {
  getList()
  getDictTypes()
})
const modalOpen = ref(false)
const formData = ref<SystemDictTypeItem>({
  dictType: '',
  dictTypeDesc: '',
  remark: '',
  status: '1'
})
const modalType = ref<'add' | 'edit'>('add')
const modalTitle = computed(() => {
  let titleObj = {
    add: '新增字典类型',
    edit: '编辑字典类型'
  }
  return titleObj[modalType.value]
})
const modalDictDataType = ref<'add' | 'edit'>('add')
const modalDictDataTitle = computed(() => {
  let titleObj = {
    add: '新增字典',
    edit: '编辑字典'
  }
  return titleObj[modalDictDataType.value]
})
const modalFormRef = ref<FormInstance>()
const onOpenAddDict = () => {
  modalType.value = 'add'
  modalOpen.value = true
  formData.value = {
    dictType: '',
    dictTypeDesc: '',
    status: '1',
    remark: ''
  }
}

const onOpenEditDictType = async (record: SystemDictItem) => {
  const { code, data } = await api.getTypeDetail(record.id!)
  if (code == 200) {
    formData.value = data
    modalType.value = 'edit'
    modalOpen.value = true
  }
}
const onDeleteDictType = async (record: SystemDictItem) => {
  const { code, msg, data } = await api.removeType(record.id!)
  if (code == 200) {
    message.success(data)
    dictParamsForm.pageNumber = 1
    getList()
  }
}
const onDeleteDict = async (record: SystemDictItem) => {
  const { code, msg, data } = await api.removeData(record.id!)
  if (code == 200) {
    message.success(data)
    getList()
  }
}
const resetForm = () => {
  modalFormRef.value?.resetFields()
}
const resetDictForm = () => {
  modalDictDataRef.value?.resetFields()
}
const onConfirm = () => {
  modalFormRef.value?.validate().then(() => {
    let http
    if (modalType.value == 'add') {
      http = api.addType
    } else {
      http = api.updateType
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
const onDictConfirm = () => {
  modalDictDataRef.value?.validate().then(() => {
    let http
    if (modalType.value == 'add') {
      http = api.addData
    } else {
      http = api.updateData
    }
    http(formDictData.value).then((res) => {
      const { code } = res
      if (code == 200) {
        message.success(modalType.value == 'add' ? '新增成功' : '编辑成功')
        getList()
        getDictTypes()
      }
      resetDictForm()
      dictDataOpen.value = false
    })
  })
}

const dictDataOpen = ref(false)
const onOpenEditdict = async (record: SystemDictItem) => {
  const { code, data } = await api.getDictDetail(record.id!)
  if (code == 200) {
    dictDataOpen.value = true
    modalDictDataType.value = 'edit'
    formDictData.value = data
  }
}
const onOpenDictDataModal = (row: SystemDictTypeItem) => {
  dictDataOpen.value = true
  modalDictDataType.value = 'add'
  formDictData.value = {
    dictType: row.dictType,
    label: '',
    value: '',
    status: '1',
    sortNum: 0
  }
}
const formDictData = ref<SystemDictItem>({
  label: '',
  value: '',
  sortNum: 0,
  status: '1',
  dictType: ''
})
const modalDictDataRef = ref<FormInstance>()
</script>
<style scoped lang="scss">
.dict {
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
