<template>
  <a-divider>主题配置</a-divider>
  <schema-form
    :layout="globalSchema.layout"
    :properties="globalSchema.properties"
    :form-data="themeCfg"
  >
  </schema-form>
  <a-divider>顶栏配置</a-divider>
  <schema-form
    :layout="headerSchema.layout"
    :properties="headerSchema.properties"
    :form-data="themeCfg"
  >
  </schema-form>
  <a-divider>菜单配置</a-divider>
  <schema-form
    :layout="menuSchema.layout"
    :properties="menuSchema.properties"
    :form-data="themeCfg"
  >
  </schema-form>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import { LayoutCategory, ThemeCategory } from '@/model'
import SchemaForm from '@/components/SchemaForm/SchemaForm'
import type { Schema } from '@/components/SchemaForm/ISchema'

const globalSchema = ref<Schema>({
  layout: {
    labelAlign: 'left',
    layout: 'horizontal',
    labelCol: {
      style: {
        width: '100px'
      }
    }
  },
  properties: {
    colorPrimary: {
      type: 'string',
      label: '主题色',
      component: {
        name: 'color-picker'
      }
    },
    layoutMode: {
      type: 'radio',
      label: '布局方式',
      component: {
        buttonStyle: 'solid',
        dataSource: Object.entries(LayoutCategory).map(([key, value]) => ({
          value,
          label: key
        }))
      }
    }
  }
})
const headerSchema = ref<Schema>({
  layout: {
    labelAlign: 'left',
    layout: 'horizontal',
    labelCol: {
      style: {
        width: '80px'
      }
    }
  },
  properties: {
    headerBgColor: {
      type: 'string',
      label: '背景色',
      component: {
        name: 'color-picker'
      }
    },
    headerFontColor: {
      type: 'string',
      label: '字体颜色',
      component: {
        name: 'color-picker'
      }
    }
  }
})
const menuSchema = ref<Schema>({
  layout: {
    labelAlign: 'left',
    layout: 'horizontal',
    labelCol: {
      style: {
        width: '80px'
      }
    }
  },
  properties: {
    menuTheme: {
      type: 'radio',
      label: '主题',
      component: {
        buttonStyle: 'solid',
        dataSource: Object.entries(ThemeCategory).map(([key, value]) => ({
          value,
          label: key
        }))
      }
    }
  }
})
const systemStore = useSystemStore()
const { themeCfg } = storeToRefs(systemStore)
</script>
<style scoped lang="scss"></style>
