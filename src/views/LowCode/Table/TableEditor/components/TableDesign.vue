<template>
  <div class="table-design-container">
    <a-card class="filter-panel" v-if="showFilterForm">
      <low-code-form-id
        :formData="filterData"
        :id="tableCfg.global.filterCfg!.formId"
        style="overflow-y: auto; max-height: 120px; margin-bottom: 10px"
      ></low-code-form-id>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px">重置</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="table-container">
      <div class="tools" style="margin-bottom: 5px">
        <a-space>
          <a-button type="primary" @click="onAddColumn">新增列</a-button>
          <a-button type="primary" @click="interactionShow = true">交互配置</a-button>
        </a-space>
        <a-button
          :icon="h(SyncOutlined)"
          type="link"
          title="刷新数据"
          style="float: right"
          @click="onRefresh"
        ></a-button>
      </div>
      <drag-table-header v-model="tableCfg.columns" @onClick="onClickColumn" @onRemove="onRemove" />
      <a-table
        :showHeader="false"
        :columns="tableCfg.columns"
        :data-source="tableData"
        :scroll="{ y: showFilterForm ? 300 : 500 }"
        :pagination="{
          total: total
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column && column.type == 'image'">
            <a-image :src="`${record[column.dataIndex]}`" height="130px" width="100%" />
          </template>
          <template v-if="column && column.type == 'link'">
            <a :href="`${record[column.dataIndex]}`" target="_blank">
              {{ record[column.dataIndex] }}
            </a>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
  <a-modal v-model:open="interactionShow" :footer="null" title="交互配置">
    <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">
      <a-tab-pane v-for="pane in tableCfg.global.actionCfg" :key="pane.id" :tab="pane.name">
        <div class="action-container">
          <schema-form
            :layout="schema.layout"
            :properties="schema.properties"
            :formData="pane"
          ></schema-form>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts" setup>
import DragTableHeader from '@/components/DragTableHeader.vue'
import { SyncOutlined } from '@ant-design/icons-vue'
import { reactive, toRefs, ref, computed, h } from 'vue'
import { useTableDesignStore } from '@/stores/tableDesign'
import { storeToRefs } from 'pinia'
import type { LCTableColumnCfg } from '@/model'
import LowCodeFormId from '@/components/LowCodeForm/LowCodeFormId.vue'
import type { Schema } from '@/components/SchemaForm/ISchema'
import { v4 as uuid } from 'uuid'
import tableApi from '../../api/table'
import { message } from 'ant-design-vue'
import SchemaForm from '@/components/SchemaForm/SchemaForm'
const tableStore = useTableDesignStore()
const { tableCfg, tableData, columnFields } = storeToRefs(tableStore)
const { onSelectColumn, onRemoveColumn, onAddColumn, onRefreshData } = tableStore

const onClickColumn = (columnData: LCTableColumnCfg) => {
  onSelectColumn(columnData.id, tableCfg.value.columns)
}
const onRemove = (columnData: LCTableColumnCfg) => {
  onRemoveColumn(columnData.id, tableCfg.value.columns)
}
const total = ref(0)
const onRefresh = () => {
  onRefreshData().then((res) => {
    const { data, total: resTotal } = res
    if (data) {
      tableData.value = data
      try {
        columnFields.value = Object.keys(data[0]).map((e) => ({
          value: e,
          label: e
        }))
      } catch (error) {
        message.warning('接口数据解析失败')
      }
    }
    if (resTotal) {
      total.value = resTotal
    }
  })
}
const showFilterForm = computed(() => {
  return tableCfg.value.global.filterCfg?.show && tableCfg.value.global.filterCfg?.formId
})
const filterData = ref({})

const interactionShow = ref(false)
const schema = ref<Schema>({
  layout: {
    layout: 'horizontal',
    labelAlign: 'right',
    labelCol: { style: { width: '100px' } }
  },
  properties: {
    id: {
      type: 'string',
      label: '按钮标识',
      component: {
        disabled: true
      }
    },
    name: {
      type: 'string',
      label: '按钮名称'
    },
    position: {
      type: 'radio',
      label: '按钮位置',
      component: {
        dataSource: [
          {
            value: 'row',
            label: '行内'
          },
          {
            value: 'header',
            label: '表头'
          }
        ],
        buttonStyle: 'solid'
      }
    },
    request: {
      type: 'switch',
      label: '请求接口',
      tooltip: '是否在点击按钮后请求接口获取数据'
    },
    interfaceUrl: {
      show: '${formData.request}',
      type: 'select',
      label: '接口地址',
      component: {
        asyncData: async () => {
          const { code, data, msg } = await tableApi.getApiList()
          if (code == 200) {
            return data.map((e) => ({ value: e.id, label: e.apiName }))
          } else {
            return []
          }
        }
      }
    },
    AfterHandleFunc: {
      show: '${formData.request}',
      type: 'string',
      label: '处理函数',
      tooltip: '处理接口返回的数据,数据用于表单渲染或地址拼接',
      component: {
        name: 'code-editor',
        height: 100,
        prepend: '(res)=>{',
        append: '}'
      }
    },
    event: {
      type: 'radio',
      label: '触发事件',
      component: {
        dataSource: [
          {
            value: 'modal',
            label: '弹窗'
          },
          {
            value: 'link',
            label: '链接'
          }
        ],
        buttonStyle: 'solid'
      }
    },
    linkUrl: {
      show: "'${formData.event}' == 'link'",
      type: 'string',
      label: '链接地址',
      tooltip: '可以通过${name}的方式拼接变量,name为变量名称'
    },
    formId: {
      show: "'${formData.event}' == 'modal'",
      type: 'select',
      label: '表单',
      component: {
        asyncData: async () => {
          return await new Promise((resolve) => {
            setTimeout(() => {
              resolve(formList.value)
            }, 100)
          })
        }
      }
    },
    // 'actionCfg.beforeHandleFunc': {
    //   show: "'${formData.event}' == 'modal'",
    //   type: 'string',
    //   label: '预处理',
    //   component: {
    //     name: 'code-editor',
    //     height: 100,
    //     prepend: '()=>{',
    //     append: '}'
    //   }
    // },
    'actionCfg.interfaceUrl': {
      show: "'${formData.event}' == 'modal'",
      type: 'select',
      label: '接口地址',
      tooltip: '一般用于提交数据,新增后保存当前的表单数据',
      component: {
        asyncData: async () => {
          const { code, data, msg } = await tableApi.getApiList()
          if (code == 200) {
            return data.map((e) => ({ value: e.id, label: e.apiName }))
          } else {
            return []
          }
        }
      }
    }
  }
})

const activeKey = ref('')
const add = () => {
  activeKey.value = uuid()
  tableCfg.value.global.actionCfg!.push({
    name: '按钮',
    id: activeKey.value,
    actionCfg: {
      interfaceUrl: ''
    }
  })
}

const remove = (targetKey: string) => {
  let lastIndex = 0
  tableCfg.value.global.actionCfg!.forEach((pane, i) => {
    if (pane.id === targetKey) {
      lastIndex = i - 1
    }
  })
  tableCfg.value.global.actionCfg = tableCfg.value.global.actionCfg!.filter(
    (pane) => pane.id !== targetKey
  )
  if (tableCfg.value.global.actionCfg.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = tableCfg.value.global.actionCfg[lastIndex].id!
    } else {
      activeKey.value = tableCfg.value.global.actionCfg[0].id!
    }
  }
}
const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'add') {
    add()
  } else {
    remove(targetKey as string)
  }
}
const formList = ref<{ value: string; label: string }[]>([])
tableApi.getFormList().then((res) => {
  const { code, data, msg } = res
  if (code == 200) {
    formList.value = data.map((e) => ({ value: e.id, label: e.name }))
  }
})
</script>
<style scoped lang="scss">
.table-design-container {
  display: flex;
  flex-direction: column;
  .filter-panel {
    max-height: 200px;
    margin-bottom: 20px;
  }
}
.action-container {
  max-height: 650px;
  overflow-y: auto;
}
</style>
