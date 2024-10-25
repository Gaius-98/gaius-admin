<template>
  <div class="logo">
    <img :src="systemSetting.projectLogo" alt="" />
    <span class="title" v-show="!collapsed">{{ systemSetting.projectName }}</span>
    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="onToggleCollapsed" />
    <menu-fold-outlined v-else class="trigger" @click="onToggleCollapsed" />
  </div>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
const systemStore = useSystemStore()
const { themeCfg, collapsed, systemSetting } = storeToRefs(systemStore)
const { onToggleCollapsed } = systemStore
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: $layout-header-height;
  color: v-bind('themeCfg.headerFontColor');
  background: v-bind('themeCfg.headerBgColor');
  img {
    width: 40px;
    height: 40px;
  }
  .title {
    font-size: 20px;
  }
  .trigger {
    margin-left: 20px;
  }
}
</style>
