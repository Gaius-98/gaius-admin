<template>
  <h4>JSONForm组件(将json数据格式转换为对应的form)</h4>
  <code-editor v-model:value="scheamStr" prepend="组件配置"></code-editor>
  <code-editor
    :value="JSON.stringify(formData, null, 4)"
    prepend="表单数据"
    :height="80"
    disabled
  ></code-editor>
  <schema-form
    :layout="schema.layout"
    :properties="schema.properties"
    v-model:formData="formData"
    ref="form"
  ></schema-form>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import SchemaForm from '@/components/SchemaForm/SchemaForm'
import type { Schema } from '@/components/SchemaForm/ISchema'

import CodeEditor from './../../components/CodeEditor.vue'

const validatePass2 = async (_rule: any, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value == '1') {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

const form = ref()
const schema = ref<Schema>({
  layout: {
    labelAlign: 'left',
    layout: 'horizontal',
    labelCol: {
      span: 2
    }
  },
  properties: {
    field: {
      type: 'string',
      label: '字段名'
    },
    test: {
      type: 'string',
      label: '测试',
      tooltip: '字段名等于test时不显示此项',
      show: "'${formData.field}' != 'test'",
      rules: [
        {
          validator: validatePass2,
          trigger: 'change'
        }
      ]
    },
    asyncData: {
      label: '异步加载数据',
      type: 'select',
      component: {
        dataSource: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          }
        ]
      }
    }
  }
})
const scheamStr = ref('')
scheamStr.value = JSON.stringify(schema.value, null, 4)
const errmsg = ref('')
watchEffect(() => {
  try {
    schema.value = JSON.parse(scheamStr.value)
  } catch (error) {
    errmsg.value = JSON.stringify(error)
  }
})
const formData = ref({
  field: '1',
  test: '测试',
  asyncData: 1
})
</script>

<style scoped lang="scss"></style>
