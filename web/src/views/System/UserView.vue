<template>
  <div class="container">
    <div class="search-tree">
      <a-input-search
        v-model:value="searchValue"
        style="margin-bottom: 8px"
        placeholder="请输入机构名称"
        @search="getTree"
      />
      <a-tree
        v-model:selectedKeys="selectKeys"
        :tree-data="orgTree"
        selectable
        :fieldNames="{
          title: 'name',
          key: 'id',
          children: 'children'
        }"
        style="height: calc(100% - 30px);overflow-y: auto"
        @select="onSelectTree"
      >
      </a-tree>
    </div>
    <div class="user">
      <a-card class="search-area">
        <a-form ref="searchFormRef" :model="userParamsForm" @finish="onSearch" layout="inline">
          <a-form-item label="用户名" name="keyword">
            <a-input v-model:value="userParamsForm.keyword"> </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">搜索</a-button>
            <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card>
        <div class="tools">
          <a-button type="primary" @click="onOpenAdduser" v-has-perm="'system:user:add'"
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
            current: userParamsForm.pageNumber,
            total: total,
            showSizeChanger: true,
            pageSize: userParamsForm.pageSize
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key == 'status'">
              <a-tag color="#87d068" v-if="record.status == '1'">启用</a-tag>
              <a-tag color="#f50" v-else>停用</a-tag>
            </template>
            <template v-if="column.key == 'avatar'">
              <a-image :src="`${record.avatar}`" height="30px" width="30px" :preview="false" />
            </template>
            <template v-if="column.key == 'org'">
              <a-tag>{{ record.orgInfo?.name }}</a-tag>
            </template>
            <template v-if="column.key == 'action'">
              <a-button
                type="link"
                @click="onOpenEdituser(record)"
                v-has-perm="'system:user:update'"
                >编辑</a-button
              >
              <a-popconfirm
                title="确定要删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onDeleteuser(record)"
              >
                <a-button type="link" danger v-has-perm="'system:user:remove'">删除</a-button>
              </a-popconfirm>
            </template>
            <template v-if="column.key == 'userType'">
              <a-tag color="#2db7f5" v-if="record.userType == 'app'">菜单</a-tag>
              <a-tag color="#87d068" v-if="record.userType == 'directory'">目录</a-tag>
            </template>
          </template>
        </a-table>
      </a-card>
      <a-modal v-model:open="modalOpen" @ok="onConfirm" :title="modalTitle" @cancel="resetForm">
        <a-form :model="formData" :label-col="{ span: 8 }" ref="modalFormRef" :rules="rules">
          <a-form-item label="用户名" prop="username">
            <a-input v-model:value="formData.username"></a-input>
          </a-form-item>
          <a-form-item label="密码" v-if="modalType == 'add'" prop="password">
            <a-input-password v-model:value="formData.password"></a-input-password>
          </a-form-item>
          <a-form-item label="角色" prop="roleIds">
            <a-select
              v-model:value="formData.roleIds"
              :fieldNames="{
                label: 'roleName',
                value: 'roleId'
              }"
              mode="multiple"
              :options="roleDictList"
            ></a-select>
          </a-form-item>
          <a-form-item label="所属机构" prop="orgId">
            <a-tree-select
              v-model:value="formData.orgId"
              tree-node-filter-prop="label"
              show-search
              allow-clear
              :treeData="orgTree"
              :field-names="{
                children: 'children',
                label: 'name',
                value: 'id'
              }"
            >
            </a-tree-select>
          </a-form-item>
          <a-form-item label="头像" prop="avatar">
            <image-picker v-model:value="formData.avatar"></image-picker>
          </a-form-item>
          <a-form-item label="状态" prop="status">
            <a-radio-group v-model:value="formData.status" button-style="solid">
              <a-radio-button value="1">启用 </a-radio-button>
              <a-radio-button value="0">停用 </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="名称" prop="name">
            <a-input v-model:value="formData.name"></a-input>
          </a-form-item>
          <a-form-item label="邮箱" prop="email">
            <a-input v-model:value="formData.email"></a-input>
          </a-form-item>
          <a-form-item label="电话" prop="phone">
            <a-input v-model:value="formData.phone"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/user'
import type { Rule } from 'ant-design-vue/es/form'
import { message, type FormInstance, type PaginationProps } from 'ant-design-vue'
import type { AuthInfo, PageParams, CreateAuthInfo, RoleDictItem, SystemOrgTree } from '@/model'
import ImagePicker from '@/components/ImagePicker.vue'
const userParamsForm = reactive<PageParams>({
  keyword: '',
  pageNumber: 1,
  pageSize: 10,
  orgId: null
})
const selectKeys = ref<number[]>([])
import common from '@/api/common'
const tableData = ref<AuthInfo[]>([])
const columns = ref([
  {
    title: '用户名',
    key: 'username',
    dataIndex: 'username',
    width: '100px'
  },
  {
    title: '头像',
    key: 'avatar',
    dataIndex: 'avatar',
    width: '60px'
  },
  {
    title: '昵称',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '所属机构',
    key: 'org',
    dataIndex: 'org'
  },
  {
    title: '邮箱',
    key: 'email',
    dataIndex: 'email'
  },

  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: '100px'
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
const onSelectTree = (keys: number[]) => {
  userParamsForm.orgId = keys[0]
  onSearch()
}
const onClear = () => {
  searchFormRef.value?.resetFields()
  getList()
}
const total = ref(0)
const onSearch = () => {
  userParamsForm.pageNumber = 1
  userParamsForm.pageSize = 10
  getList()
}
const onChangePagination = (pagination: PaginationProps) => {
  const { current, pageSize } = pagination
  userParamsForm.pageNumber = current!
  userParamsForm.pageSize = pageSize!
  getList()
}
const getList = () => {
  loading.value = true
  api.getList(userParamsForm).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data.data
      total.value = data.total
    }
    loading.value = false
  })
}
const orgTree = ref<SystemOrgTree[]>([])
const searchValue = ref('')
const getTree = () => {
  return common.getOrgTree(searchValue.value).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      orgTree.value = data
    }
  })
}
onMounted(() => {
  getTree().then(() => {
    userParamsForm.orgId = orgTree.value ? orgTree.value[0]?.id : null
    selectKeys.value = [userParamsForm.orgId]
    getList()
  })
})
const modalOpen = ref(false)
const formData = ref<CreateAuthInfo>({
  username: '',
  name: '',
  password: '',
  email: '',
  avatar: '',
  roleIds: [],
  phone: '',
  status: '1'
})
const modalType = ref<'add' | 'edit'>('add')
const modalTitle = computed(() => {
  let titleObj = {
    add: '新增用户',
    edit: '编辑用户'
  }
  return titleObj[modalType.value]
})
const modalFormRef = ref<FormInstance>()
const onOpenAdduser = () => {
  modalType.value = 'add'
  modalOpen.value = true
  formData.value = {
    username: '',
    name: '',
    password: '',
    email: '',
    avatar: '',
    roleIds: [],
    phone: '',
    status: '1',
    orgId: selectKeys.value[0]
  }
}

const onOpenEdituser = async (record: AuthInfo) => {
  const { code, data } = await api.getDetail(record.userId)
  if (code == 200) {
    formData.value = data
    modalType.value = 'edit'
    modalOpen.value = true
  }
}
const onDeleteuser = async (record: AuthInfo) => {
  const { code, msg, data } = await api.remove(record.userId)
  if (code == 200) {
    message.success(data)
    getList()
  }
}
const resetForm = () => {
  modalFormRef.value?.resetFields()
}
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  status: [
    {
      required: true,
      message: '请选择状态'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入联系邮箱'
    }
  ]
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
const roleDictList = ref<RoleDictItem[]>([])
const getRoleDict = () => {
  api.getRoleDict().then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      roleDictList.value = data
    }
  })
}
onMounted(() => {
  getRoleDict()
})
</script>
<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  .search-tree {
    width: 240px;
    height: 100%;
    background-color: #fff;
    margin-right: 10px;
    padding: 10px;
  }
  .user {
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
}
</style>
