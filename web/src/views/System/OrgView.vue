<template>
  <div class="org">
    <a-card class="search-area">
      <a-form ref="searchFormRef" :model="orgParamsForm" layout="inline" @finish="getList">
        <a-form-item label="机构名称" prop="keyword">
          <a-input v-model:value="orgParamsForm.keyword"> </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <div class="tools">
        <a-button type="primary" @click="onOpenAddOrg" v-has-perm="'system:org:add'">新增</a-button>
      </div>
      <a-table
        :rowKey="(record: SystemOrgItem) => record.id"
        :loading="loading"
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
        :scroll="{ y: 620 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'status'">
            <a-tag color="#87d068" v-if="record.status == '1'">启用</a-tag>
            <a-tag color="#f50" v-else>停用</a-tag>
          </template>
          <template v-if="column.key == 'action'">
            <a-button type="link" @click="onOpenAddOrg(record)" v-has-perm="'system:org:add'"
              >新增</a-button
            >
            <a-button type="link" @click="onOpenEditOrg(record)" v-has-perm="'system:org:update'"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleteOrg(record)"
            >
              <a-button type="link" danger v-has-perm="'system:org:remove'">删除</a-button>
            </a-popconfirm>
          </template>
          <template v-if="column.key == 'orgType'">
            <a-tag color="#2db7f5" v-if="record.orgType == 'app'">机构</a-tag>
            <a-tag color="#87d068" v-if="record.orgType == 'directory'">目录</a-tag>
            <a-tag color="#f50" v-if="record.orgType == 'permission'">权限点</a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:open="modalOpen" @ok="onConfirm" :title="modalTitle">
      <a-form :model="formData" :label-col="{ span: 8 }" ref="modalFormRef">
        <a-form-item label="机构名称" prop="name" required>
          <a-input v-model:value="formData.name"></a-input>
        </a-form-item>
        <a-form-item label="上级节点" prop="pid">
          <a-tree-select
            v-model:value="formData.pid"
            tree-node-filter-prop="label"
            show-search
            allow-clear
            :treeData="tableData"
            :field-names="{
              children: 'children',
              label: 'name',
              value: 'id'
            }"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item label="状态" prop="status" required>
          <a-radio-group v-model:value="formData.status" button-style="solid">
            <a-radio-button v-for="item in statusDict" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="排序号" prop="sortNum" required>
          <a-input-number v-model:value="formData.sortNum"></a-input-number>
        </a-form-item>

        <a-form-item label="备注" prop="remark">
          <a-textarea v-model:value="formData.remark"> </a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/org'
import type { SystemOrgItem, SystemOrgTree } from '@/model'
import { message, type FormInstance } from 'ant-design-vue'
import common, { type DictItem } from '@/api/common'
const orgParamsForm = reactive({
  keyword: ''
})
const tableData = ref<SystemOrgTree[]>([])
const columns = ref([
  {
    title: '机构名称',
    key: 'name',
    dataIndex: 'name',
    width: '250px'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: '100px'
  },
  {
    title: '排序号',
    key: 'sortNum',
    dataIndex: 'sortNum',
    width: '80px'
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
    ellipsis: true,
    width: '300px'
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    width: '150px'
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

const statusDict = ref<DictItem[]>([])
const getOrgDict = () => {
  common.getDict(['status']).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      statusDict.value = data.status
    }
  })
}
const getList = () => {
  loading.value = true
  api.getList(orgParamsForm.keyword).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data
    }
    loading.value = false
  })
}
onMounted(() => {
  getList()
  getOrgDict()
})
const modalOpen = ref(false)
const formData = ref<SystemOrgItem>({
  name: '',
  sortNum: 0,
  pid: undefined,
  status: '1',
  remark: ''
})
const modalType = ref<'add' | 'edit'>('add')
const modalTitle = computed(() => {
  let titleObj = {
    add: '新增机构',
    edit: '编辑机构'
  }
  return titleObj[modalType.value]
})
const modalFormRef = ref<FormInstance>()
const onOpenAddOrg = (data: SystemOrgItem) => {
  formData.value = {
    name: '',
    sortNum: 0,
    pid: undefined,
    status: '1',
    remark: ''
  }
  if (data) {
    formData.value.pid = data.id
  }

  modalType.value = 'add'
  modalOpen.value = true
}
const getDetailById = async (id: number) => {
  return await api.getDetail(id)
}
const onOpenEditOrg = async (record: SystemOrgItem) => {
  const { code, data } = await getDetailById(record.id!)
  if (code == 200) {
    formData.value = data
    modalType.value = 'edit'
    modalOpen.value = true
  }
}
const onDeleteOrg = async (record: SystemOrgItem) => {
  const { code, msg } = await api.remove(record.id!)
  if (code == 200) {
    message.success(msg)
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
    http(formData.value).then((res: any) => {
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
</script>
<style scoped lang="scss">
.org {
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
