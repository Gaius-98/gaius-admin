<template>
  <a-config-provider
    :locale="local == 'en' ? enUS : zhCN"
    :component-size="componentSize"
    :theme="{
      token: {
        colorPrimary: themeCfg.colorPrimary
      }
    }"
  >
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import common from './api/common'
import { message } from 'ant-design-vue'
const componentSize = ref('middle')
common.getSetting('system').then((res) => {
  const { code, data, msg } = res
  if (code == 200) {
    let linkEl = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    linkEl.href = data.projectLogo
    let titleEl = document.querySelector('title') as HTMLTitleElement
    titleEl.innerText = data.projectName
    setSystemSetting(data)
  } else {
    message.error('获取系统配置失败')
  }
})
const systemStore = useSystemStore()
const { setSystemSetting } = systemStore
const { local, themeCfg } = storeToRefs(systemStore)
</script>

<style scoped></style>
