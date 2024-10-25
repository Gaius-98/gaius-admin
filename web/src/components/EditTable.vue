<template>
  <a-table
    :columns="tableColumns"
    :data-source="data"
    :pagination="false"
    :rowKey="(record: any, index: number) => index"
    size="small"
    :scroll="{
      y: height
    }"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="inputColumns.includes(column.dataIndex)">
        <a-input v-model:value="record[column.dataIndex]"></a-input>
      </template>
      <template v-if="selectColumns.includes(column.dataIndex)">
        <a-select
          v-model:value="record[column.dataIndex]"
          :options="getColumnOptions(column.dataIndex)"
        ></a-select>
      </template>
      <template v-if="column.dataIndex == '_action_'">
        <div style="display: flex">
          <PlusCircleOutlined class="icon" @click="onAdd()" />
          <MinusCircleOutlined class="icon" @click="onRemove(index)" />
        </div>
      </template>
    </template>
    <template #emptyText>
      <a-button type="text" @click="onAdd" :icon="h(PlusCircleOutlined)"> 新增数据</a-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, computed, watch, h } from 'vue'
import type { ModelRef } from 'vue'

import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
export interface SelectOptionItem {
  value: string
  label: string
}
export interface EditColumn {
  dataIndex: string
  title: string
  type?: 'input' | 'select'
  options?: SelectOptionItem[]
}
interface Props {
  columns: EditColumn[]
  action?: boolean
  height?: number
}
const data: ModelRef<any> = defineModel()

let props = withDefaults(defineProps<Props>(), {
  action: true,
  height: 150
})
const { columns, action } = toRefs(props)
const inputColumns = computed(() => {
  return getFilterColumnByType('input')
})
const selectColumns = computed(() => {
  return getFilterColumnByType('select')
})

const tableColumns = computed(() => {
  if (action.value) {
    return [
      ...columns.value,
      {
        title: '操作',
        dataIndex: '_action_'
      }
    ]
  }
  return columns.value
})

const getColumnOptions = (dataIndex: string) => {
  return columns.value.find((e) => e.dataIndex == dataIndex)?.options || []
}
const getFilterColumnByType = (type: 'input' | 'select') => {
  return columns.value.filter((e) => e.type == type).map((e) => e.dataIndex)
}

const onAdd = () => {
  let obj = {}
  columns.value.map((column) => {
    Reflect.set(obj, column.dataIndex, '')
  })
  console.log(obj)
  data.value.push(obj)
}
const onRemove = (idx: number) => {
  data.value.splice(idx, 1)
}
</script>
<style scoped lang="scss">
.icon + .icon {
  margin-left: 5px;
  cursor: pointer;
}
</style>
