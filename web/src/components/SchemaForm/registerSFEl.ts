import type { App, Component } from 'vue'
export interface SfElObj {
  [key: string]: Component
}
const registerSFEl = {
  install: (app: App<Element>, sfElement: SfElObj) => {
    app.provide('sfProvideEL', sfElement)
  }
}
export default registerSFEl
