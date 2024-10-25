<template>
  <span v-show="prepend">{{ prepend }}</span>
  <codemirror
    :style="{ height: `${height}px` }"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    v-bind="$attrs"
    v-model="value"
  />
  <span v-show="append">{{ append }}</span>
</template>

<script lang="ts" setup name="EvCode">
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { reactive, toRefs, ref } from 'vue'

interface Props {
  height: number
  prepend?: string
  append?: string
}
const props = withDefaults(defineProps<Props>(), {
  height: 400
})
const { height, prepend, append } = toRefs(props)
const value = defineModel<string>('value', { required: true })

const extensions = [javascript()]
</script>
<style scoped lang="scss"></style>
