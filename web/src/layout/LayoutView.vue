<template>
  <a-watermark :content="watermarkText">
    <component :is="LayoutComponent"></component>
    <a-drawer
      :width="300"
      placement="right"
      :open="isConfigVisible"
      @close="onCloseConfigDrawer"
      :closable="false"
      :bodyStyle="{
        padding: '0 12px'
      }"
    >
      <layout-theme-cfg></layout-theme-cfg>
    </a-drawer>
  </a-watermark>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, computed, type Component } from 'vue'
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import LayoutThemeCfg from './components/LayoutThemeCfg.vue'
import type { Obj } from '@/model'
import { isTruth } from '@/utils/tools'
import router from '@/router'
const systemStore = useSystemStore()
const { isConfigVisible, themeCfg, systemSetting, userInfo } = storeToRefs(systemStore)
const { onCloseConfigDrawer, startUp } = systemStore
const LayoutComponent = computed(() => {
  return layout[themeCfg.value.layoutMode]
})
const watermarkText = computed(() => {
  const { projectWatermark } = systemSetting.value
  const { username, name } = userInfo.value
  return isTruth(projectWatermark) ? `${username}(${name})` : ''
})

const layout: Obj<Component> = {
  horizontal: defineAsyncComponent(() => import('@/layout/LayoutType/HorizontalSplitLayout.vue')),
  vertical: defineAsyncComponent(() => import('@/layout/LayoutType/VerticalStackLayout.vue'))
}
startUp()
</script>
<style scoped lang="scss"></style>
