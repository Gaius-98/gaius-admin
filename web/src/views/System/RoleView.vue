<template>
  <div class="role">
    <a-card class="search-area">
      <a-form ref="searchFormRef" layout="inline" :model="roleParamsForm" @finish="onSearch">
        <a-form-item label="角色名称" prop="keyword">
          <a-input v-model:value="roleParamsForm.keyword"> </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <div class="tools">
        <a-button type="primary" @click="onOpenAddrole" v-has-perm="'system:role:add'"
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
          current: roleParamsForm.pageNumber,
          total: total,
          showSizeChanger: true,
          pageSize: roleParamsForm.pageSize
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'status'">
            <a-tag color="#87d068" v-if="record.status == '1'">启用</a-tag>
            <a-tag color="#f50" v-else>停用</a-tag>
          </template>
          <template v-if="column.key == 'action'">
            <a-button type="link" v-has-perm="'system:role:update'" @click="onOpenEditrole(record)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleterole(record)"
            >
              <a-button type="link" danger v-has-perm="'system:role:remove'">删除</a-button>
            </a-popconfirm>
          </template>
          <template v-if="column.key == 'roleType'">
            <a-tag color="#2db7f5" v-if="record.roleType == 'app'">菜单</a-tag>
            <a-tag color="#87d068" v-if="record.roleType == 'directory'">目录</a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:open="modalOpen" @ok="onConfirm" :title="modalTitle" @cancel="resetForm">
      <a-form :model="formData" :label-col="{ span: 8 }" ref="modalFormRef">
        <a-form-item label="角色名" required prop="roleName">
          <a-input v-model:value="formData.roleName"></a-input>
        </a-form-item>
        <a-form-item label="角色ID" required prop="roleKey">
          <a-input v-model:value="formData.roleKey"></a-input>
        </a-form-item>
        <a-form-item label="状态" required prop="status">
          <a-radio-group v-model:value="formData.status" button-style="solid">
            <a-radio-button value="1">启用 </a-radio-button>
            <a-radio-button value="0">停用 </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="菜单权限" prop="roleMenus">
          <div style="height: 150px; overflow-y: auto">
            <a-tree
              v-model:checkedKeys="formData.roleMenus"
              :tree-data="menuTree"
              :checkStrictly="true"
              checkable
              :field-names="{
                children: 'children',
                title: 'label',
                key: 'id'
              }"
            >
            </a-tree>
          </div>
        </a-form-item>
        <a-form-item label="数据权限" required prop="dataPerm">
          <a-select v-model:value="formData.dataPerm" :options="dataPermList"> </a-select>
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
import api from './api/role'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { RoleInfo, PageParams } from '@/model'
import apiMenu from './api/menu'
import { TreeSelect } from 'ant-design-vue'
import common, { type DictItem } from '@/api/common'
const roleParamsForm = reactive<PageParams>({
  keyword: '',
  pageNumber: 1,
  pageSize: 10
})
const tableData = ref<RoleInfo[]>([])
const columns = ref([
  {
    title: '角色名',
    key: 'roleName',
    dataIndex: 'roleName',
    width: '200px'
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
    title: '创建时间',
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
  roleParamsForm.pageNumber = 1
  roleParamsForm.pageSize = 10
  getList()
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  roleParamsForm.pageNumber = current!
  roleParamsForm.pageSize = pageSize!
  getList()
}
const getList = () => {
  loading.value = true
  api.getList(roleParamsForm).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data.data
      total.value = data.total
    }
    loading.value = false
  })
}
const dataPermList = ref<DictItem[]>([])
onMounted(() => {
  getList()
  common.getDict(['dataPerm']).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      dataPermList.value = data['dataPerm']
    }
  })
})
const modalOpen = ref(false)
const formData = ref<RoleInfo>({
  roleName: '',
  roleKey: '',
  status: '1',
  remark: '',
  roleMenus: [],
  dataPerm: '1'
})
const modalType = ref<'add' | 'edit'>('add')
const modalTitle = computed(() => {
  let titleObj = {
    add: '新增角色',
    edit: '编辑角色'
  }
  return titleObj[modalType.value]
})
const modalFormRef = ref<FormInstance>()
const onOpenAddrole = () => {
  modalType.value = 'add'
  modalOpen.value = true
  formData.value = {
    roleName: '',
    roleKey: '',
    status: '1',
    remark: '',
    roleMenus: [],
    dataPerm: '1'
  }
}

const onOpenEditrole = async (record: RoleInfo) => {
  const { code, data } = await api.getDetail(record.roleId!)
  if (code == 200) {
    formData.value = data
    modalType.value = 'edit'
    modalOpen.value = true
  }
}
const onDeleterole = async (record: RoleInfo) => {
  const { code, msg, data } = await api.remove(record.roleId!)
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
    if (!(formData.value.roleMenus instanceof Array)) {
      formData.value.roleMenus = formData.value.roleMenus.checked
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
const menuTree = ref<
  {
    id: string
    label: string
    pid?: string
  }[]
>([])
const getMenuTree = () => {
  apiMenu.getAllMenu().then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      menuTree.value = data
    }
  })
}
onMounted(() => {
  getMenuTree()
})
</script>
<style scoped lang="scss">
.role {
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
