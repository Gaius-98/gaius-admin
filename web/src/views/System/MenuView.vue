<template>
  <div class="menu">
    <a-card class="search-area">
      <a-form ref="searchFormRef" :model="menuParamsForm" layout="inline" @finish="getList">
        <a-form-item label="名称" prop="keyword">
          <a-input v-model:value="menuParamsForm.keyword"> </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="onClear"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <div class="tools">
        <a-button type="primary" @click="onOpenAddMenu" v-has-perm="'system:menu:add'"
          >新增</a-button
        >
      </div>
      <a-table
        :rowKey="(record: ResMenuItem) => record.id"
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
            <a-button type="link" @click="onOpenAddMenu(record)" v-has-perm="'system:menu:add'"
              >新增</a-button
            >
            <a-button type="link" @click="onOpenEditMenu(record)" v-has-perm="'system:menu:update'"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleteMenu(record)"
            >
              <a-button type="link" danger v-has-perm="'system:menu:remove'">删除</a-button>
            </a-popconfirm>
          </template>
          <template v-if="column.key == 'menuType'">
            <a-tag color="#2db7f5" v-if="record.menuType == 'app'">菜单</a-tag>
            <a-tag color="#87d068" v-if="record.menuType == 'directory'">目录</a-tag>
            <a-tag color="#f50" v-if="record.menuType == 'permission'">权限点</a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:open="modalOpen" @ok="onConfirm" :title="modalTitle">
      <a-form :model="formData" :label-col="{ span: 8 }" ref="modalFormRef">
        <a-form-item label="名称" prop="label" required>
          <a-input v-model:value="formData.label"></a-input>
        </a-form-item>
        <a-form-item label="类型" prop="menuType" required>
          <a-radio-group v-model:value="formData.menuType" button-style="solid" disabled>
            <a-radio-button v-for="item in menuTypeDict" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="地址" prop="address" v-if="formData.menuType == 'app'" required>
          <a-input v-model:value="formData.address"> </a-input>
        </a-form-item>
        <a-form-item label="状态" prop="status" required>
          <a-radio-group v-model:value="formData.status" button-style="solid">
            <a-radio-button v-for="item in statusDict" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="上级节点" prop="pid">
          <a-tree-select
            v-model:value="formData.pid"
            tree-node-filter-prop="label"
            show-search
            allow-clear
            :treeData="formData.menuType === 'permission' ? tableData : dictList"
            :field-names="{
              children: 'children',
              label: 'label',
              value: 'id'
            }"
            @change="onChangeTreeSelect"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="权限标识"
          prop="permissionId"
          v-if="formData.menuType === 'permission'"
          required
        >
          <a-input v-model:value="formData.permissionId"></a-input>
        </a-form-item>
        <a-form-item label="图标" prop="icon" v-if="!(formData.menuType === 'permission')">
          <icon-select v-model="formData.icon"></icon-select>
        </a-form-item>
        <a-form-item label="排序号" prop="sortNum" required>
          <a-input-number v-model:value="formData.sortNum"></a-input-number>
        </a-form-item>
        <a-form-item label="打开方式" prop="openType" v-if="formData.menuType == 'app'" required>
          <a-radio-group v-model:value="formData.openType" button-style="solid">
            <a-radio-button v-for="item in openTypeDict" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="页面类型"
          prop="type"
          required
          v-if="formData.openType == '_self' && formData.menuType == 'app'"
        >
          <a-select v-model:value="formData.type" :options="pageTypeDict" show-search allowClear>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from './api/menu'
import IconSelect from '@/components/IconSelect/IconSelect.vue'
import type { ResMenuItem } from '@/model'
import { message, type FormInstance } from 'ant-design-vue'
import type { MenuDict } from './api/menu'
import common, { type DictItem } from '@/api/common'
import { useSystemStore } from '@/stores/system'
const systemStore = useSystemStore()
const { startUp } = systemStore
const menuParamsForm = reactive({
  keyword: ''
})
const tableData = ref<ResMenuItem[]>([])
const columns = ref([
  {
    title: '名称',
    key: 'label',
    dataIndex: 'label',
    width: '300px'
  },
  {
    title: '类型',
    key: 'menuType',
    dataIndex: 'menuType',
    width: '180px'
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address'
  },
  {
    title: '权限点',
    key: 'permissionId',
    dataIndex: 'permissionId',
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
const pageTypeDict = ref<DictItem[]>([])
const menuTypeDict = ref<DictItem[]>([])
const openTypeDict = ref<DictItem[]>([])
const statusDict = ref<DictItem[]>([])
const getMenuDict = () => {
  common.getDict(['pageType', 'menuType', 'openType', 'status']).then((res) => {
    const { code, data, msg } = res
    if (code == 200) {
      pageTypeDict.value = data.pageType
      menuTypeDict.value = data.menuType
      openTypeDict.value = data.openType
      statusDict.value = data.status
    }
  })
}
const getList = () => {
  loading.value = true
  api.getList(menuParamsForm.keyword).then((res) => {
    const { code, data } = res
    if (code == 200) {
      tableData.value = data
    }
    loading.value = false
  })
}
onMounted(() => {
  getList()
  getMenuDict()
})
const modalOpen = ref(false)
const formData = ref<ResMenuItem>({
  label: '',
  menuType: 'directory',
  sortNum: 0,
  address: '',
  type: 'front',
  openType: '_self',
  pid: '',
  status: 1,
  permissionId: ''
})
const modalType = ref<'add' | 'edit'>('add')
const modalTitle = computed(() => {
  let titleObj = {
    add: '新增菜单',
    edit: '编辑菜单'
  }
  return titleObj[modalType.value]
})
const modalFormRef = ref<FormInstance>()
const onOpenAddMenu = (data: ResMenuItem) => {
  formData.value = {
    label: '',
    menuType: 'directory',
    sortNum: 0,
    address: '',
    type: 'front',
    openType: '_self',
    pid: '',
    status: 1,
    permissionId: ''
  }
  if (data) {
    formData.value.pid = data.id
    if (data.menuType === 'app') {
      formData.value.menuType = 'permission'
    } else if (data.menuType === 'directory') {
      formData.value.menuType = 'app'
    }
  }

  modalType.value = 'add'
  modalOpen.value = true
  getDict()
}
const getDetailById = async (id: string) => {
  return await api.getDetail(id)
}
const onOpenEditMenu = async (record: ResMenuItem) => {
  const { code, data } = await getDetailById(record.id!)
  if (code == 200) {
    formData.value = data
    modalType.value = 'edit'
    modalOpen.value = true
    getDict()
  }
}
const onDeleteMenu = async (record: ResMenuItem) => {
  const { code, msg } = await api.remove(record.id!)
  if (code == 200) {
    message.success(msg)
    getList()
    startUp()
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
        startUp()
      }
      resetForm()
      modalOpen.value = false
    })
  })
}
const dictList = ref<MenuDict[]>([])
const getDict = () => {
  api.dict().then((res) => {
    const { code, data } = res
    if (code == 200) {
      dictList.value = data
    }
  })
}
const onChangeTreeSelect = (val: string) => {
  let value = val ? val : ''
  formData.value.pid = value
}
</script>
<style scoped lang="scss">
.menu {
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
