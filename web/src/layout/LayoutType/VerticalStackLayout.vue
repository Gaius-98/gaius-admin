<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <div class="layout-header-left">
        <layout-logo />
        <layout-menu mode="horizontal" style="margin-left: 10px"></layout-menu>
      </div>
      <layout-opt />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import LayoutMenu from '../components/LayoutMenu.vue'
import LayoutLogo from '../components/LayoutLogo.vue'
import LayoutOpt from '../components/LayoutOpt.vue'
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
const systemStore = useSystemStore()
const { themeCfg } = storeToRefs(systemStore)
</script>
<style scoped lang="scss">
@import url('@/styles/layout/common.scss');
.layout-header {
  color: v-bind('themeCfg.headerFontColor');
  background: v-bind('themeCfg.headerBgColor');
  .layout-header-left {
    display: flex;
  }
}
</style>
