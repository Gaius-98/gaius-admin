<template>
  <div>
    <div class="loading" v-if="loading">
      <a-spin size="large" />
    </div>

    <a-card title="总览" style="margin-bottom: 10px" v-if="!loading">
      <a-row class="content" :gutter="10">
        <a-col :span="3">
          <a-card title="负载状态">
            <a-progress type="circle" :size="170" :percent="infoData.load.currentLoad.toFixed(2)" />
          </a-card>
        </a-col>
        <a-col :span="3">
          <a-card title="CPU使用率">
            <a-progress type="circle" :size="170" :percent="cpu" />
          </a-card>
        </a-col>
        <a-col :span="3">
          <a-card title="内存使用率">
            <a-progress type="circle" :size="170" :percent="mem" />
          </a-card>
        </a-col>
        <a-col :span="15">
          <a-card title="硬盘">
            <a-row style="flex-direction: column">
              <a-col v-for="(item, idx) in infoData.fsSiz" :key="idx" style="margin-top: 10px">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    height: 40px;
                  "
                >
                  <div style="height: 40px; line-height: 40px">
                    {{ item.fs }}
                  </div>
                  <div style="height: 40px; line-height: 40px; margin: 5px 20px">
                    <a-progress
                      style="margin-bottom: 0"
                      :percent="item.use"
                      :steps="10"
                      :size="[40, 40]"
                    />
                  </div>
                  <div style="height: 40px; line-height: 40px">
                    ({{ (item.used / (1024 * 1024 * 1024)).toFixed(2) }}/
                    {{ (item.size / (1024 * 1024 * 1024)).toFixed(2) }})GB
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="服务器信息" v-if="!loading">
      <div class="content">
        <a-descriptions title="CPU" :column="2">
          <a-descriptions-item label="品牌">{{ infoData.cpu.brand }}</a-descriptions-item>
          <a-descriptions-item label="核心数">{{ infoData.cpu.cores }}</a-descriptions-item>
          <a-descriptions-item label="制造商">{{ infoData.cpu.vendor }}</a-descriptions-item>
          <a-descriptions-item label="用户使用率"
            >{{ infoData.load.currentLoadUser.toFixed(2) + '%' }}
          </a-descriptions-item>
          <a-descriptions-item label="系统使用率">
            {{ infoData.load.currentLoadSystem.toFixed(2) + '%' }}
          </a-descriptions-item>

          <a-descriptions-item label="当前空闲率">
            {{ infoData.load.currentLoadIdle.toFixed(2) + '%' }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="内存" :column="2">
          <a-descriptions-item label="总内存"
            >{{ (infoData.mem.total / (1024 * 1024)).toFixed(2) }}MB</a-descriptions-item
          >
          <a-descriptions-item label="已用内存"
            >{{ (infoData.mem.available / (1024 * 1024)).toFixed(2) }}MB</a-descriptions-item
          >
          <a-descriptions-item label="剩余可用内存"
            >{{ (infoData.mem.free / (1024 * 1024)).toFixed(2) }}MB</a-descriptions-item
          >
          <a-descriptions-item label="使用率"
            >{{
              ((infoData.mem.available * 100) / infoData.mem.total).toFixed(2)
            }}%</a-descriptions-item
          >
        </a-descriptions>
        <a-descriptions title="系统信息" :column="2">
          <a-descriptions-item label="操作系统">{{ infoData.osInfo.platform }}</a-descriptions-item>
          <a-descriptions-item label="架构">{{ infoData.osInfo.arch }}</a-descriptions-item>
          <a-descriptions-item label="服务器制造商">{{
            infoData.system.manufacturer
          }}</a-descriptions-item>
          <a-descriptions-item label="服务器类型">{{ infoData.system.model }}</a-descriptions-item>
        </a-descriptions>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted, computed, onBeforeUnmount } from 'vue'
import api from './api/systemInfo'
const infoData = ref<Record<string, any>>({})
const loading = ref(true)
const cpu = computed(() => {
  return (infoData.value.load.currentLoadUser + infoData.value.load.currentLoadSystem).toFixed(2)
})

const mem = computed(() => {
  return ((infoData.value.mem.available * 100) / infoData.value.mem.total).toFixed(2)
})
const getInfo = () => {
  api.getSystemInfo().then((res) => {
    const { code, data, msg } = res
    loading.value = false
    if (code == 200) {
      infoData.value = data
    }
  })
}
const time = ref()
onMounted(() => {
  loading.value = true
  getInfo()
  time.value = setInterval(() => {
    getInfo()
  }, 2000)
})
onBeforeUnmount(() => {
  clearInterval(time.value)
})
</script>
<style scoped lang="scss">
.loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.ant-card-body) {
  padding: $gap;
}
</style>
