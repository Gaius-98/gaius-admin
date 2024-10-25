<template>
  <a-spin
    v-show="loading"
    size="large"
    style="display: flex; align-items: center; justify-content: center; height: 100%"
  />
  <iframe
    :src="decodeURIComponent(id)"
    ref="iframe"
    frameborder="0"
    width="100%"
    height="100%"
    @load="load"
    v-show="!loading"
  ></iframe>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
interface Props {
  id: string
}
const props = defineProps<Props>()
const { id } = toRefs(props)
const loading = ref(true)
const iframe = ref()
const load = () => {
  loading.value = false
}
</script>
<style scoped lang="scss"></style>
