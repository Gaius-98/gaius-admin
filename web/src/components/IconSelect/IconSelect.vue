<template>
  <a-select v-model:value="value" show-search allowClear>
    <a-select-option v-for="icon in iconList" :key="icon.value">
      <span class="iconfont" :class="`icon-${icon.value}`"></span>
      {{ icon.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, h } from 'vue'
import iconJson from '@/assets/iconfont/iconfont.json'

const iconList = iconJson.glyphs.map((e) => ({
  label: e.name,
  value: e.font_class,
  key: e.icon_id
}))

const value = defineModel()
const emits = defineEmits(['change'])
</script>
<style scoped lang="scss"></style>
