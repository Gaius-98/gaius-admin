<template>
  <div class="login">
    <div
      class="login-bg"
      :style="{
        background: `url(${systemSetting.projectBgUrl})`,
        backgroundSize: '100% 100%'
      }"
    >
      <div class="login-container">
        <div class="login-form">
          <div class="project-header">
            <img :src="systemSetting.projectLogo" alt="" srcset="" class="project-logo" />
            <div class="project-title">{{ systemSetting.projectName }}</div>
          </div>
          <a-form :model="authForm" aligin="left" hideRequiredMark>
            <a-form-item name="username" :rules="[{ required: true, message: '请输入账号' }]">
              <a-input v-model:value="authForm.username" placeholder="请输入账号">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
              <a-input-password v-model:value="authForm.password" placeholder="请输入密码">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item name="captcha" :rules="[{ required: true, message: '请输入验证码' }]">
              <a-input
                v-model:value="authForm.captcha"
                placeholder="请输入验证码"
                @keyup.enter="onLogin"
              >
                <template #prefix>
                  <SafetyOutlined />
                </template>
                <template #addonAfter>
                  <div v-html="captchaSvg" @click="getCaptcha()" style="height: 100%"></div>
                </template>
              </a-input>
            </a-form-item>
          </a-form>
          <a-button type="primary" html-type="submit" style="width: 100%" @click="onLogin">
            登录
          </a-button>
        </div>
      </div>
      <div class="version">{{ systemSetting.projectVersion }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'
import api from './api'
import auth from '@/utils/auth'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue'
import jump from '@/utils/jump'
const systemStore = useSystemStore()
const { startUp } = systemStore
const { themeCfg, systemSetting, menuTree } = storeToRefs(systemStore)
const authForm = reactive({
  username: 'test',
  password: 'test',
  captcha: ''
})
const onLogin = () => {
  api.login(authForm).then((res) => {
    const { code, data } = res
    if (code == 200) {
      auth.set(data)
      startUp().then(() => {
        jump(menuTree.value[0])
      })
    }
  })
}
const captchaSvg = ref('')
const getCaptcha = async () => {
  const { data } = await api.getCaptcha()
  captchaSvg.value = data
}
onMounted(() => {
  getCaptcha()
})
</script>
<style scoped lang="scss">
.login {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  .login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }
  .login-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    height: 100%;

    .login-form {
      width: 100%;
      padding: 20px;
      border-radius: 10px;
      background-color: #fff;
      .project-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .project-logo {
          width: 30px;
          height: 30px;
        }
        .project-title {
          flex: 1;
          font-size: 25px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: v-bind('themeCfg.colorPrimary');
        }
      }
    }
  }
  .version {
    position: fixed;
    bottom: 20px;
    color: #fff;
  }
}
</style>
