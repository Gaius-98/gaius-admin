<template>
  <div class="layout-opt">
    <!-- <div class="layout-opt-i18n" @click="onToggleLocal">
      <a-button ghost size="small">
        {{ local == 'en' ? '中文' : 'English' }}
      </a-button>
    </div> -->
    <!-- <div class="layout-opt-search">
      <SearchOutlined />
    </div> -->
    <div class="layout-opt-notice" title="通知" v-has-perm="'private:notice:limit'">
      <a-popover title="通知" trigger="click">
        <template #content>
          <div class="content" style="display: flex; flex-direction: column">
            <div
              class="notice-list"
              style="padding: 0 5px"
              v-if="noticeInfo && noticeInfo.list.length > 0"
            >
              <div
                v-for="item in noticeInfo.list"
                :key="item.id"
                style="
                  display: flex;
                  flex-direction: column;
                  justify-items: flex-start;
                  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
                  padding: 5px;
                  width: 200px;
                "
              >
                <div class="title" style="font-size: 14px; font-weight: bold">
                  {{ item.notice.title }}
                </div>
                <div
                  class="content"
                  :title="item.notice.content"
                  style="display: flex; width: 100%"
                >
                  <div
                    style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                  >
                    {{ item.notice.content }}
                  </div>
                  <a style="width: 50px; text-decoration: underline" @click="onGoNotice()">查看 </a>
                </div>
              </div>
            </div>
            <a-empty v-else></a-empty>
          </div>
        </template>
        <a-badge :count="noticeInfo.total" :overflow-count="3" class="badge"> </a-badge>
        <MessageOutlined />
      </a-popover>
    </div>
    <div class="layout-opt-theme" @click="onOpenConfigDrawer" title="主题配置">
      <SettingOutlined />
    </div>
    <div class="layout-opt-github" @click="onOpenGithub" title="github">
      <GithubOutlined />
    </div>
    <div class="layout-opt-userinfo" title="用户信息">
      <a-popover placement="bottomRight">
        <template #content>
          <a-button @click="onLogout" block> 退出 </a-button>
        </template>
        <template #title>
          <a-descriptions title="用户信息" size="small" :column="2" style="width: 400px">
            <a-descriptions-item label="姓名">{{ userInfo.name }}</a-descriptions-item>
            <a-descriptions-item label="用户名">{{ userInfo.username }}</a-descriptions-item>
            <a-descriptions-item label="邮箱">{{ userInfo.email }}</a-descriptions-item>
            <a-descriptions-item label="手机">{{ userInfo.phone }}</a-descriptions-item>
            <a-descriptions-item label="角色">{{ role }}</a-descriptions-item>
            <a-descriptions-item label="所属机构">{{ orgInfo?.name }}</a-descriptions-item>

            <a-descriptions-item label="上次登录IP" :span="2">{{
              userInfo.lastLoginIp
            }}</a-descriptions-item>
            <a-descriptions-item label="登录IP" :span="2">{{
              userInfo.loginIp
            }}</a-descriptions-item>
          </a-descriptions>
        </template>
        <a-avatar>
          <template #icon>
            <img :src="userInfo.avatar || ''" alt="" />
          </template>
        </a-avatar>
        <span class="layout-opt-userinfo-name">{{ userInfo.name }}</span>
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import {
  SearchOutlined,
  SettingOutlined,
  GithubOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
import auth from '@/utils/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import type { SystemUserNotice } from '@/model'
import jump from '@/utils/jump'
const router = useRouter()
const systemStore = useSystemStore()
const role = computed(() => {
  return roleInfo.value.map((e) => e.roleName).join(',')
})
const { local, themeCfg, userInfo, orgInfo, roleInfo, noticeInfo } = storeToRefs(systemStore)
const { onOpenConfigDrawer, onToggleLocal } = systemStore
const onOpenGithub = () => {
  window.open('https://github.com/Gaius-98/gaius-admin', '_blank')
}
const onLogout = () => {
  auth.remove()
  router.push({
    path: '/login'
  })
}
const onGoNotice = () => {
  router.push({
    path: '/system/notice-message'
  })
}
</script>
<style scoped lang="scss">
.layout-opt {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: v-bind('themeCfg.headerFontColor');
  background: v-bind('themeCfg.headerBgColor');
  height: $layout-header-height;
  div {
    margin: 0 5px;
  }
  .layout-opt-notice {
    position: relative;
    .badge {
      position: absolute;
      top: 0;
      right: 0;
    }
    :deep(.ant-list) {
      width: 400px;
      .ant-list-item {
        padding: $gap;
      }
    }
    :deep(.ant-badge) {
      .ant-badge-count {
        width: 15px;
        min-width: 15px;
        height: 15px;
        line-height: 15px;
        box-shadow: none;
        border: none;
      }
    }
  }
  .layout-opt-notice,
  .layout-opt-search,
  .layout-opt-theme,
  .layout-opt-github {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
  .layout-opt-userinfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .layout-opt-userinfo-name {
      max-width: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
