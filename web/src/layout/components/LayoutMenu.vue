<template>
  <a-menu
    v-bind="$attrs"
    :items="realMenuTree"
    :theme="themeCfg.menuTheme"
    @select="onSelectMenu"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="height: 100%; overflow-y: auto"
    class="gaius-menu"
  >
  </a-menu>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import { h, computed, watch } from 'vue'
import type { VNode, FunctionalComponent } from 'vue'
import type { UIMenuItem, Obj, ResMenuItem } from '@/model'
import { useStorage } from '@vueuse/core'
import jump from '@/utils/jump'
import { useRoute } from 'vue-router'
const route = useRoute()

const systemStore = useSystemStore()
const { menuTree, themeCfg } = storeToRefs(systemStore)

const selectedKeys = useStorage<string[]>('gaius-admin-menu-selected', [], sessionStorage)
const openKeys = useStorage('gaius-admin-menu-open', [], sessionStorage)
const realMenuTree = computed(() => {
  return transformMenuData(menuTree.value)
})
//转换菜单的图标,将字符串转为组件
const transformMenuData = (tree: ResMenuItem[]): UIMenuItem[] => {
  return tree.map((node) => {
    let newNode = { key: node?.id || '', ...node } as UIMenuItem
    if (newNode.icon) {
      newNode.icon = h('span', {
        class: `iconfont icon-${newNode.icon}`
      }) as VNode
    }
    if (node.children) {
      newNode.children = transformMenuData(node.children)
    }
    return newNode
  })
}
const findMenuIdByPath = (path: string, data: ResMenuItem[]): string | undefined => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    if (node.address === path) {
      return node.id
    }
    if (node.children) {
      const id = findMenuIdByPath(path, node.children)
      if (id) {
        return id
      }
    }
  }
}
watch(
  () => route.query,
  () => {
    const { menuId: id } = route.query

    if (id) {
      selectedKeys.value = [id as string]
    }
  },
  {
    immediate: true
  }
)
const onSelectMenu = ({ item }: { item: Obj<ResMenuItem> }) => {
  const { originItemValue } = item
  jump(originItemValue)
}
</script>
<style scoped lang="scss">
.gaius-menu {
  &::-webkit-scrollbar {
    width: 0px;
    /* 宽度 */
  }
}
</style>
